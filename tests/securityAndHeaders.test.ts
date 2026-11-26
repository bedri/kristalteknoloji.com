import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { SECURITY_HEADERS, getSecurityHeaders } from '../server/utils/securityHeaders.ts'

const ROOT_DIR = path.resolve(import.meta.dirname, '..')
const APP_DIR = path.join(ROOT_DIR, 'app')

function collectFiles(dir: string, ext: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, ext))
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      results.push(fullPath)
    }
  }
  return results
}

describe('Security Headers & Codebase Security Audit', () => {
  it('provides defensive HTTP security and privacy headers', () => {
    const headers = getSecurityHeaders()
    assert.equal(headers['X-Content-Type-Options'], 'nosniff')
    assert.equal(headers['X-Frame-Options'], 'SAMEORIGIN')
    assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin')
    assert.ok(headers['Permissions-Policy']?.includes('camera=()'))
    assert.ok(headers['Permissions-Policy']?.includes('geolocation=()'))
    assert.ok(headers['Permissions-Policy']?.includes('microphone=()'))
    assert.equal(headers['Cross-Origin-Opener-Policy'], 'same-origin-allow-popups')
    assert.equal(headers['Cross-Origin-Resource-Policy'], 'same-origin')
    assert.ok(headers['Strict-Transport-Security']?.includes('max-age=31536000'))
    const csp = headers['Content-Security-Policy'] || ''
    assert.ok(csp.includes("default-src 'self'"))
    assert.ok(csp.includes("object-src 'none'"))
    assert.ok(csp.includes("base-uri 'self'"))
    assert.ok(csp.includes("form-action 'self'"))
    assert.ok(csp.includes("frame-ancestors 'self'"))
    assert.ok(csp.includes("connect-src 'self' https://api.iconify.design"))
    assert.equal(csp.includes('upgrade-insecure-requests'), false)
    assert.ok(Object.isFrozen(SECURITY_HEADERS))
  })

  it('contains zero dangerous DOM XSS sinks (v-html, innerHTML, outerHTML, document.write, eval) across all Vue components', () => {
    const vueFiles = collectFiles(APP_DIR, '.vue')
    assert.ok(vueFiles.length >= 10, 'Expected at least 10 Vue files in app/')

    const dangerousPatterns = [
      /\bv-html\s*=/,
      /\.innerHTML\s*=/,
      /\.outerHTML\s*=/,
      /\bdocument\.write\s*\(/,
      /\beval\s*\(/
    ]

    for (const file of vueFiles) {
      const content = fs.readFileSync(file, 'utf-8')
      const rel = path.relative(ROOT_DIR, file)
      for (const pattern of dangerousPatterns) {
        assert.equal(
          pattern.test(content),
          false,
          `Dangerous sink matching ${pattern} found in ${rel}`
        )
      }
    }
  })

  it('ensures all external target="_blank" links include rel="noopener noreferrer"', () => {
    const vueFiles = collectFiles(APP_DIR, '.vue')
    for (const file of vueFiles) {
      const content = fs.readFileSync(file, 'utf-8')
      const rel = path.relative(ROOT_DIR, file)
      const anchorMatches = content.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []
      for (const anchorTag of anchorMatches) {
        assert.ok(
          anchorTag.includes('rel="noopener noreferrer"'),
          `Missing rel="noopener noreferrer" on target="_blank" link in ${rel}: ${anchorTag}`
        )
      }
    }
  })

  it('keeps quickybet.net commented out and inactive in app/pages/projeler.vue', () => {
    const projelerContent = fs.readFileSync(path.join(APP_DIR, 'pages/projeler.vue'), 'utf-8')
    // Strip block comments and line comments, then verify quickybet is not active
    const uncommented = projelerContent
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
    assert.equal(
      uncommented.includes('quickybet'),
      false,
      'quickybet must remain commented out in app/pages/projeler.vue'
    )
  })

  it('adheres strictly to the Kristal Teknoloji corporate color palette with no off-brand rainbow classes', () => {
    const vueFiles = collectFiles(APP_DIR, '.vue')
    const offBrandPattern = /\b(?:bg|text|border|from|to|via)-(?:violet|pink|amber|rose|purple|fuchsia|orange)-\d+/

    for (const file of vueFiles) {
      const content = fs.readFileSync(file, 'utf-8')
      const rel = path.relative(ROOT_DIR, file)
      assert.equal(
        offBrandPattern.test(content),
        false,
        `Off-brand color utility found in ${rel}`
      )
    }
  })

  it('uses adaptive CSS custom properties (--header-scroll-bg) for scroll-driven header theming in AppHeader.vue', () => {
    const headerContent = fs.readFileSync(path.join(APP_DIR, 'components/AppHeader.vue'), 'utf-8')
    const mainCssContent = fs.readFileSync(path.join(APP_DIR, 'assets/css/main.css'), 'utf-8')

    assert.ok(headerContent.includes('var(--header-scroll-bg)'), 'AppHeader @keyframes must use var(--header-scroll-bg)')
    assert.equal(headerContent.includes('shrink-header-dark'), false, 'AppHeader must not default to dark keyframe in light mode')
    assert.ok(mainCssContent.includes('--header-scroll-bg:'), 'main.css must define adaptive --header-scroll-bg token')
  })

  it('enforces hardened runtime security configuration across config, locale cookie, and contact API', () => {
    const nuxtConfig = fs.readFileSync(path.join(ROOT_DIR, 'nuxt.config.ts'), 'utf-8')
    const localeComposable = fs.readFileSync(path.join(APP_DIR, 'composables/useLocale.ts'), 'utf-8')
    const contactEndpoint = fs.readFileSync(path.join(ROOT_DIR, 'server/api/contact.post.ts'), 'utf-8')

    assert.ok(
      nuxtConfig.includes("process.env.NUXT_DEVTOOLS === 'true'"),
      'nuxt.config.ts must gate DevTools behind NUXT_DEVTOOLS === true'
    )
    assert.equal(
      nuxtConfig.includes('devtools: { enabled: true }'),
      false,
      'nuxt.config.ts must not unconditionally enable DevTools'
    )

    assert.ok(localeComposable.includes("sameSite: 'lax'"), 'Locale cookie must enforce SameSite=Lax')
    assert.ok(
      localeComposable.includes('secure: import.meta.env.PROD'),
      'Locale cookie must enforce Secure attribute in production'
    )

    assert.ok(contactEndpoint.includes('TRUST_PROXY'), 'Contact endpoint must gate forwarded headers behind TRUST_PROXY')
    assert.ok(contactEndpoint.includes('isAllowedOrigin'), 'Contact endpoint must validate Origin against Host')
    assert.ok(contactEndpoint.includes('isAllowedContentType'), 'Contact endpoint must enforce JSON Content-Type')
    assert.ok(contactEndpoint.includes('isWithinBodySizeLimit'), 'Contact endpoint must enforce request body size limits')
  })
})
