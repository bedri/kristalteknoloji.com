export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactValidationResult {
  valid: boolean
  isBot?: boolean
  error?: string
  data?: ContactFormData
}

export const MAX_CONTACT_BODY_BYTES = 16 * 1024

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const ALLOWED_FETCH_SITES = new Set(['same-origin', 'same-site', 'none'])

/**
 * Validates the Sec-Fetch-Site header to block cross-site CSRF/mutation requests.
 */
export function isAllowedFetchSite(secFetchSite?: string | null): boolean {
  if (!secFetchSite) return true
  return ALLOWED_FETCH_SITES.has(secFetchSite.toLowerCase().trim())
}

/**
 * Enforces JSON Content-Type headers for API mutation payloads.
 */
export function isAllowedContentType(contentType?: string | null): boolean {
  if (!contentType) return false
  const mediaType = (contentType.split(';', 1)[0] ?? '').trim().toLowerCase()
  return mediaType === 'application/json' || mediaType.endsWith('+json')
}

/**
 * Validates an HTTP(S) Origin header against the expected request Host header.
 */
export function isAllowedOrigin(origin?: string | null, host?: string | null): boolean {
  if (!origin) return true
  if (!host) return false
  try {
    const parsed = new URL(origin)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false
    }
    return parsed.host.toLowerCase() === host.trim().toLowerCase()
  } catch {
    return false
  }
}

/**
 * Validates Content-Length headers against the configured byte limit.
 */
export function isWithinBodySizeLimit(
  contentLength?: string | null,
  maxBytes = MAX_CONTACT_BODY_BYTES
): boolean {
  if (!contentLength) return true
  const trimmed = contentLength.trim()
  if (!/^\d+$/.test(trimmed)) return false
  const bytes = Number.parseInt(trimmed, 10)
  return Number.isFinite(bytes) && bytes >= 0 && bytes <= maxBytes
}

/**
 * Strips ASCII control characters and optionally CR/LF to prevent log injection.
 */
export function sanitizeControlChars(input: string, allowNewlines = false): string {
  const withoutControls = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  if (allowNewlines) {
    return withoutControls.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  }
  return withoutControls.replace(/[\r\n]+/g, ' ')
}

/**
 * Masks an email address for privacy-safe server logging (PII scrubbing).
 */
export function maskEmail(email: string): string {
  const clean = sanitizeControlChars(String(email || '').trim(), false)
  const atIndex = clean.indexOf('@')
  if (atIndex <= 0 || atIndex === clean.length - 1) {
    return '***'
  }
  const local = clean.slice(0, atIndex)
  const domain = clean.slice(atIndex + 1)
  if (local.length === 1) {
    return `*@${domain}`
  }
  if (local.length === 2) {
    return `${local[0]}*@${domain}`
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`
}

/**
 * Masks a person's name for privacy-safe server logging.
 */
export function maskName(name: string): string {
  const clean = sanitizeControlChars(String(name || '').trim(), false)
  if (!clean) return '***'
  if (clean.length <= 2) return `${clean[0]}*`
  return `${clean.slice(0, 2)}***`
}

/**
 * Strictly validates and sanitizes the incoming contact form payload.
 */
export function validateContactPayload(payload: unknown): ContactValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { valid: false, error: 'Invalid request payload.' }
  }

  const record = payload as Record<string, unknown>

  // Honeypot check: if a hidden bot field is populated, silently flag as bot
  if (typeof record.website === 'string' && record.website.trim().length > 0) {
    return { valid: true, isBot: true }
  }

  const rawName = record.name
  const rawEmail = record.email
  const rawSubject = record.subject
  const rawMessage = record.message

  if (
    typeof rawName !== 'string' ||
    typeof rawEmail !== 'string' ||
    typeof rawSubject !== 'string' ||
    typeof rawMessage !== 'string'
  ) {
    return { valid: false, error: 'All fields (name, email, subject, message) must be valid strings.' }
  }

  const name = sanitizeControlChars(rawName, false).trim()
  const email = sanitizeControlChars(rawEmail, false).trim()
  const subject = sanitizeControlChars(rawSubject, false).trim()
  const message = sanitizeControlChars(rawMessage, true).trim()

  if (!name || !email || !subject || !message) {
    return { valid: false, error: 'All fields (name, email, subject, message) are required.' }
  }

  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters.' }
  }

  if (email.length < 5 || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' }
  }

  if (subject.length < 3 || subject.length > 160) {
    return { valid: false, error: 'Subject must be between 3 and 160 characters.' }
  }

  if (message.length < 10 || message.length > 4000) {
    return { valid: false, error: 'Message must be between 10 and 4000 characters.' }
  }

  return {
    valid: true,
    isBot: false,
    data: { name, email, subject, message }
  }
}

interface RateLimitBucket {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitBucket>()

export const RATE_LIMIT_MAX_REQUESTS = 5
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
export const RATE_LIMIT_MAX_BUCKETS = 5000

/**
 * Simple in-memory per-IP rate limiter with automatic expiry cleanup and bounded FIFO eviction.
 */
export function checkRateLimit(
  ip: string,
  now = Date.now(),
  maxRequests = RATE_LIMIT_MAX_REQUESTS,
  windowMs = RATE_LIMIT_WINDOW_MS,
  maxBuckets = RATE_LIMIT_MAX_BUCKETS
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const key = (ip || 'unknown').trim().slice(0, 64) || 'unknown'

  // Opportunistic cleanup of expired buckets before considering eviction
  if (rateLimitStore.size > 500 || rateLimitStore.size >= maxBuckets) {
    for (const [k, bucket] of rateLimitStore.entries()) {
      if (bucket.resetAt <= now) {
        rateLimitStore.delete(k)
      }
    }
  }

  const existing = rateLimitStore.get(key)
  if (!existing || existing.resetAt <= now) {
    if (existing) {
      rateLimitStore.delete(key)
    }

    while (rateLimitStore.size >= maxBuckets) {
      const oldestKey = rateLimitStore.keys().next().value
      if (oldestKey === undefined) break
      rateLimitStore.delete(oldestKey)
    }

    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs
    })
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: 0
    }
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    }
  }

  existing.count += 1
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    retryAfterSeconds: 0
  }
}

export function getRateLimitStoreSize(): number {
  return rateLimitStore.size
}

export function resetRateLimitStore(): void {
  rateLimitStore.clear()
}
