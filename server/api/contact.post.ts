import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { name, email, subject, message } = body || {}

  // Basic validation
  if (!name || !email || !subject || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields (name, email, subject, message) are required.'
    })
  }

  // Log the received message to the server console for debugging and local simulation
  console.log('--- NEW CONTACT MESSAGE RECEIVED ---')
  console.log(`Date: ${new Date().toISOString()}`)
  console.log(`From: ${name} <${email}>`)
  console.log(`Subject: ${subject}`)
  console.log(`Message: ${message}`)
  console.log('------------------------------------')

  return {
    success: true,
    message: 'Message received successfully.'
  }
})
