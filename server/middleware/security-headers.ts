import { defineEventHandler, setResponseHeaders } from 'h3'
import { SECURITY_HEADERS } from '../utils/securityHeaders'

export default defineEventHandler((event) => {
  setResponseHeaders(event, SECURITY_HEADERS)
})
