export const useAuth = () => {
  const accessToken = useCookie<string | null>('app_accessToken', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: false,
    path: '/',
  })
  const profile = useState<any>('profile', () => null)

  const validateSession = async (): Promise<boolean> => {
    if (!accessToken.value) {
      return false
    }

    try {
      const res: any = await $fetch(
        'https://auth.airnavindonesia.co.id/user/verify-token',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken.value}` },
        }
      )
      
      const isValid = res?.validToken === true || res?.status === 'success'
      
      if (!isValid) {
        console.log('Token invalid, clearing session')
        clearTokens()
      }
      
      return isValid
    } catch (error) {
      console.error('Session validation failed:', error)
      clearTokens()
      return false
    }
  }

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const res: any = await $fetch(
        'https://auth.airnavindonesia.co.id/user/verify-token',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      return res?.validToken === true || res?.status === 'success'
    } catch (error) {
      console.error('Token verification failed:', error)
      return false
    }
  }

  const setTokens = (access: string) => {
    console.log('Setting token, length:', access?.length)
    accessToken.value = access
    console.log('Token set, cookie value exists:', !!accessToken.value)
  }

  const clearTokens = () => {
    accessToken.value = null
    profile.value = null
  }

  // ✅ FIX: Tambah error handling yang lebih baik
  const getProfile = async () => {
    if (!accessToken.value) {
      throw new Error('No access token')
    }

    try {
      const response = await $fetch(
        'https://auth.airnavindonesia.co.id/user/profile',
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      )
      profile.value = response
      return response
    } catch (error: any) {
      console.error('Failed to get profile:', error)
      
      // ✅ PENTING: Jika 404/401/403, token sudah ga valid
      if (error?.statusCode === 404 || error?.statusCode === 401 || error?.statusCode === 403) {
        console.log('Token expired or invalid, clearing session')
        clearTokens()
      }
      
      throw error
    }
  }

  const logout = async () => {
    console.log('Logging out...')
    try {
      if (accessToken.value) {
        await $fetch('https://auth.airnavindonesia.co.id/user/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        })
        console.log('SSO logout successful')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearTokens()
      console.log('Tokens cleared, redirecting to home')
      
      if (import.meta.client) {
        window.location.href = '/'
      } else {
        await navigateTo('/', { replace: true, external: true })
      }
    }
  }

  return {
    accessToken,
    profile,
    validateSession, 
    verifyToken,
    setTokens,
    clearTokens,
    getProfile,
    logout,
  }
}