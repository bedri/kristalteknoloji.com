import { defineEventHandler, readBody, createError, getRequestHeader, getRequestIP, setResponseHeader } from 'h3'
import {
  isAllowedFetchSite,
  checkRateLimit,
  validateContactPayload,
  maskEmail,
  maskName
} from '../utils/contactSecurity'

export default defineEventHandler(async (event) => {
  // Prevent CDN/proxy cache poisoning across Fetch Metadata contexts
  setResponseHeader(event, 'Vary', 'Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site')

  // 1. Fetch Metadata cross-site request protection
  const secFetchSite = getRequestHeader(event, 'sec-fetch-site')
  if (!isAllowedFetchSite(secFetchSite)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Cross-site request blocked.'
    })
  }

  // 2. Per-IP Rate Limiting
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const rateLimit = checkRateLimit(clientIp)
  if (!rateLimit.allowed) {
    setResponseHeader(event, 'Retry-After', String(rateLimit.retryAfterSeconds))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  // 3. Parse & strictly validate body
  const body = await readBody(event)
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
