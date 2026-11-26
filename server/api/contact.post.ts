import { defineEventHandler, readBody, createError, getRequestHeader, getRequestIP, setResponseHeader } from 'h3'
import {
  isAllowedFetchSite,
  isAllowedOrigin,
  isAllowedContentType,
  isWithinBodySizeLimit,
  checkRateLimit,
  validateContactPayload,
  maskEmail,
  maskName,
  MAX_CONTACT_BODY_BYTES
} from '../utils/contactSecurity'

export default defineEventHandler(async (event) => {
  // Prevent CDN/proxy cache poisoning across Fetch Metadata and Origin contexts
  setResponseHeader(event, 'Vary', 'Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, Origin')

  const trustProxy = process.env.TRUST_PROXY === 'true'

  // 1. Fetch Metadata & Origin cross-site request protection
  const secFetchSite = getRequestHeader(event, 'sec-fetch-site')
  if (!isAllowedFetchSite(secFetchSite)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Cross-site request blocked.'
    })
  }

  const origin = getRequestHeader(event, 'origin')
  const rawForwardedHost = trustProxy ? getRequestHeader(event, 'x-forwarded-host') : undefined
  const host = rawForwardedHost?.split(',', 1)[0]?.trim() || getRequestHeader(event, 'host')
  if (!isAllowedOrigin(origin, host)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Invalid request origin.'
    })
  }

  // 2. Enforce strict JSON Content-Type and pre-read payload size limit
  if (!isAllowedContentType(getRequestHeader(event, 'content-type'))) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Unsupported Media Type: application/json required.'
    })
  }

  if (!isWithinBodySizeLimit(getRequestHeader(event, 'content-length'))) {
    throw createError({
      statusCode: 413,
      statusMessage: 'Payload Too Large.'
    })
  }

  // 3. Per-IP Rate Limiting
  const clientIp = getRequestIP(event, { xForwardedFor: trustProxy }) || 'unknown'
  const rateLimit = checkRateLimit(clientIp)
  if (!rateLimit.allowed) {
    setResponseHeader(event, 'Retry-After', String(rateLimit.retryAfterSeconds))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  // 4. Parse & strictly validate body (with post-read size enforcement)
  const body = await readBody(event)
  const serializedSize = Buffer.byteLength(JSON.stringify(body ?? ''), 'utf8')
  if (serializedSize > MAX_CONTACT_BODY_BYTES) {
    throw createError({
      statusCode: 413,
      statusMessage: 'Payload Too Large.'
    })
  }

  const validation = validateContactPayload(body)

  if (!validation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error || 'Invalid contact form submission.'
    })
  }

  // Silently accept honeypot bot submissions without logging or processing
  if (validation.isBot || !validation.data) {
    return {
      success: true,
      message: 'Message received successfully.'
    }
  }

  const { name, email, subject, message } = validation.data

  // 4. Privacy-preserving server log (PII scrubbed & CRLF sanitized)
  console.info(
    JSON.stringify({
      event: 'contact_message_received',
      timestamp: new Date().toISOString(),
      sender: `${maskName(name)} <${maskEmail(email)}>`,
      subjectLength: subject.length,
      messageLength: message.length
    })
  )

  return {
    success: true,
    message: 'Message received successfully.'
  }
})
