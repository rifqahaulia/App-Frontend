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
    
    console.log('📤 [OM API] Request:', config.method?.toUpperCase(), config.url, config.params || config.data)
    return config
  },
  (error) => {
    console.error('❌ [OM API] Request Error:', error)
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
    
    console.log('📤 [PA API] Request:', config.method?.toUpperCase(), config.url, config.params || config.data)
    return config
  },
  (error) => {
    console.error('❌ [PA API] Request Error:', error)
    return Promise.reject(error)
  }
)

// OM Service Response Interceptor
apiOm.interceptors.response.use(
  (response) => {
    console.log('📥 [OM API] Response:', response.config.url, response.data)
    return response
  },
  (error) => {
    console.error('❌ [OM API] Response Error:', error.response?.status, error.response?.data)
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('⚠️ [OM API] Unauthorized - clearing session')
      
      if (import.meta.client) {
        const tokenCookie = useCookie('app_accessToken')
        tokenCookie.value = null
        window.location.href = '/'
      }
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.warn('⚠️ [OM API] Resource not found')
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('⚠️ [OM API] Forbidden - insufficient permissions')
    }
    
    return Promise.reject(error)
  }
)

// PA Service Response Interceptor
apiPa.interceptors.response.use(
  (response) => {
    console.log('📥 [PA API] Response:', response.config.url, response.data)
    return response
  },
  (error) => {
    console.error('❌ [PA API] Response Error:', error.response?.status, error.response?.data)
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('⚠️ [PA API] Unauthorized - clearing session')
      
      if (import.meta.client) {
        const tokenCookie = useCookie('app_accessToken')
        tokenCookie.value = null
        window.location.href = '/'
      }
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.warn('⚠️ [PA API] Resource not found')
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('⚠️ [PA API] Forbidden - insufficient permissions')
    }
    
    return Promise.reject(error)
  }
)

export { apiOm, apiPa }