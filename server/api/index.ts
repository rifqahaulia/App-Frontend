

// server/api/index.ts
// This file should contain server-side API routes
// Client-side API configuration has been moved to /lib/api.ts

export default defineEventHandler(() => {
  return {
    message: 'Server API endpoint - use /lib/api.ts for client-side API calls'
  }
})
