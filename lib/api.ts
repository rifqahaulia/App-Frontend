// lib/api.ts
import axios from 'axios'

// Base URL backend - sesuaikan dengan URL backend Anda
const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api'

// Create axios instance untuk Organization Management
export const apiOm = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor - untuk menambahkan token autentikasi
apiOm.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage atau cookie (hanya di client-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - untuk handle response dan error
apiOm.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message)
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      console.warn('⚠️ Unauthorized - Please login')
      // window.location.href = '/login'
    }
    
    if (error.response?.status === 404) {
      console.warn('⚠️ Resource not found')
    }
    
    return Promise.reject(error)
  }
)

export default apiOm
