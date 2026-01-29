import axios from 'axios'

// OM Service API (Organization Management)
const apiOm = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// PA Service API (Personnel Administration)
const apiPa = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// OM Service Interceptor
apiOm.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const tokenCookie = useCookie('app_accessToken')
    const token = tokenCookie.value
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log('[OM API] Request:', config.method?.toUpperCase(), config.url, config.params || config.data)
    return config
  },
  (error) => {
    console.error('[OM API] Request Error:', error)
    return Promise.reject(error)
  }
)

// PA Service Interceptor
apiPa.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const tokenCookie = useCookie('app_accessToken')
    const token = tokenCookie.value
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Automatically convert camelCase to snake_case for POST/PUT/PATCH requests
    if (config.data && !(config.data instanceof FormData)) {
      config.data = convertToSnakeCase(config.data)
    }

    console.log('[PA API] Request:', config.method?.toUpperCase(), config.url, config.params || config.data)
    return config
  },
  (error) => {
    console.error('[PA API] Request Error:', error)
    return Promise.reject(error)
  }
)

// Helper to convert camelCase to snake_case
function convertToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => convertToSnakeCase(v))
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key.replace(/([A-Z])/g, '_$1').toLowerCase()]: convertToSnakeCase(obj[key]),
      }),
      {},
    )
  }
  return obj
}

// Helper to convert snake_case to camelCase
function convertToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => convertToCamelCase(v))
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key.replace(/(_\w)/g, (m) => m[1].toUpperCase())]: convertToCamelCase(obj[key]),
      }),
      {},
    )
  }
  return obj
}

// OM Service Response Interceptor
apiOm.interceptors.response.use(
  (response) => {
    console.log('📥 [OM API] Response:', response.config.url, response.data)
    return response
  },
  (error) => {
    console.error('[OM API] Response Error:', error.response?.status, error.response?.data)
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn(' [OM API] Unauthorized - clearing session')
      
      if (import.meta.client) {
        const tokenCookie = useCookie('app_accessToken')
        tokenCookie.value = null
        window.location.href = '/'
      }
    }
    
    return Promise.reject(error)
  }
)

// PA Service Response Interceptor
apiPa.interceptors.response.use(
  (response) => {
    console.log(' [PA API] Response:', response.config.url, response.data)
    
    // Always try to convert to camelCase
    let rawData = response.data
    
    // If it's wrapped in { data: ... }, unwrap it first
    if (rawData && rawData.data !== undefined) {
      rawData = rawData.data
    }
    
    if (rawData) {
      return {
        ...response,
        data: convertToCamelCase(rawData)
      }
    }
    
    return response
  },
  (error) => {
    const errorData = error.response?.data
    console.error(' [PA API] Response Error:', error.response?.status, errorData)
    
    // Format Zod/Validation errors if present
    if (error.response?.status === 400 && errorData?.errors) {
      console.warn(' [PA API] Validation Error:', errorData.message)
      // We keep the original error but can attach formatted messages if needed
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn(' [PA API] Unauthorized - clearing session')
      
      if (import.meta.client) {
        const tokenCookie = useCookie('app_accessToken')
        tokenCookie.value = null
        window.location.href = '/'
      }
    }
    
    return Promise.reject(error)
  }
)

export { apiOm, apiPa }
