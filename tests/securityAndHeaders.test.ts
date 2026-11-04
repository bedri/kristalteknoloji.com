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
    assert.ok(headers['Content-Security-Policy']?.includes("frame-ancestors 'self'"))
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
})
