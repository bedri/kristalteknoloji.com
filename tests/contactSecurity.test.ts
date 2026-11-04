import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import {
  isAllowedFetchSite,
  sanitizeControlChars,
  maskEmail,
  maskName,
  validateContactPayload,
  checkRateLimit,
  resetRateLimitStore
} from '../server/utils/contactSecurity.ts'

describe('server/utils/contactSecurity', () => {
  beforeEach(() => {
    resetRateLimitStore()
  })

  describe('isAllowedFetchSite (Fetch Metadata defense)', () => {
    it('allows same-origin, same-site, none, and missing headers', () => {
      assert.equal(isAllowedFetchSite('same-origin'), true)
      assert.equal(isAllowedFetchSite('SAME-SITE'), true)
      assert.equal(isAllowedFetchSite('none'), true)
      assert.equal(isAllowedFetchSite(undefined), true)
      assert.equal(isAllowedFetchSite(null), true)
      assert.equal(isAllowedFetchSite(''), true)
    })

    it('rejects cross-site and arbitrary values', () => {
      assert.equal(isAllowedFetchSite('cross-site'), false)
      assert.equal(isAllowedFetchSite('Cross-Site'), false)
      assert.equal(isAllowedFetchSite('evil-origin'), false)
    })
  })

  describe('sanitizeControlChars (Log Injection / CRLF defense)', () => {
    it('removes ASCII control characters and collapses CR/LF when allowNewlines is false', () => {
      const malicious = 'Alice\r\nBcc: victim@example.com\x00\x07'
      const cleaned = sanitizeControlChars(malicious, false)
      assert.equal(cleaned, 'Alice Bcc: victim@example.com')
      assert.equal(cleaned.includes('\r'), false)
      assert.equal(cleaned.includes('\n'), false)
    })

    it('preserves normalized LF newlines when allowNewlines is true', () => {
      const multiline = 'Line 1\r\nLine 2\rLine 3\x00'
      const cleaned = sanitizeControlChars(multiline, true)
      assert.equal(cleaned, 'Line 1\nLine 2\nLine 3')
    })
  })

  describe('maskEmail and maskName (PII scrubbing)', () => {
    it('masks standard and short emails without leaking full local-part', () => {
      assert.equal(maskEmail('contact@kristalteknoloji.com'), 'c***t@kristalteknoloji.com')
      assert.equal(maskEmail('ab@kristalteknoloji.com'), 'a*@kristalteknoloji.com')
      assert.equal(maskEmail('a@kristalteknoloji.com'), '*@kristalteknoloji.com')
      assert.equal(maskEmail('invalid-email'), '***')
    })

    it('masks names for log privacy', () => {
      assert.equal(maskName('Bedri'), 'Be***')
      assert.equal(maskName('Al'), 'A*')
      assert.equal(maskName(''), '***')
    })
  })

  describe('validateContactPayload', () => {
    it('accepts a valid corporate contact submission and trims fields', () => {
      const res = validateContactPayload({
        name: '  Ahmet Yılmaz  ',
        email: 'ahmet@kristalteknoloji.com',
        subject: 'Kurumsal İş Birliği',
        message: 'KRISTA L1 ağında doğrulayıcı düğüm kurulumu hakkında bilgi almak istiyoruz.'
      })

      assert.equal(res.valid, true)
      assert.equal(res.isBot, false)
      assert.deepEqual(res.data, {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@kristalteknoloji.com',
        subject: 'Kurumsal İş Birliği',
        message: 'KRISTA L1 ağında doğrulayıcı düğüm kurulumu hakkında bilgi almak istiyoruz.'
      })
    })

    it('detects honeypot field filled by automated bots', () => {
      const res = validateContactPayload({
        name: 'Spam Bot',
        email: 'bot@spam.example',
        subject: 'Cheap SEO',
        message: 'Visit our spam website right now!',
        website: 'https://spam.example'
      })

      assert.equal(res.valid, true)
      assert.equal(res.isBot, true)
      assert.equal(res.data, undefined)
    })

    it('rejects non-object payloads and NoSQL / prototype object injection attempts', () => {
      assert.equal(validateContactPayload(null).valid, false)
      assert.equal(validateContactPayload(['array']).valid, false)
      assert.equal(
        validateContactPayload({
          name: { $gt: '' },
          email: 'user@example.com',
          subject: 'Valid Subject',
          message: 'Valid message content here.'
        }).valid,
        false
      )
    })

    it('rejects invalid email addresses and out-of-range field lengths', () => {
      // Short name
      assert.equal(
        validateContactPayload({
          name: 'A',
          email: 'user@example.com',
          subject: 'Konu Başlığı',
          message: 'En az on karakterlik geçerli bir mesaj.'
        }).valid,
        false
      )

      // Invalid email
      assert.equal(
        validateContactPayload({
          name: 'Ahmet',
          email: 'not-an-email@',
          subject: 'Konu Başlığı',
          message: 'En az on karakterlik geçerli bir mesaj.'
        }).valid,
        false
      )

      // Short message (< 10 chars)
      assert.equal(
        validateContactPayload({
          name: 'Ahmet',
          email: 'ahmet@example.com',
          subject: 'Konu Başlığı',
          message: 'Kısa'
        }).valid,
        false
      )
    })
  })

  describe('checkRateLimit', () => {
    it('enforces per-IP request limits and resets after window expiration', () => {
      const ip = '203.0.113.42'
      const t0 = 1_700_000_000_000
      const windowMs = 60_000

      for (let i = 1; i <= 3; i++) {
        const res = checkRateLimit(ip, t0 + i * 100, 3, windowMs)
        assert.equal(res.allowed, true)
        assert.equal(res.remaining, 3 - i)
      }

      // 4th request within window must be blocked
      const blocked = checkRateLimit(ip, t0 + 500, 3, windowMs)
      assert.equal(blocked.allowed, false)
      assert.equal(blocked.remaining, 0)
      assert.ok(blocked.retryAfterSeconds > 0)

      // Request after window expires is allowed again
      const afterExpiry = checkRateLimit(ip, t0 + windowMs + 1000, 3, windowMs)
      assert.equal(afterExpiry.allowed, true)
      assert.equal(afterExpiry.remaining, 2)
    })
  })
})
