export const useAuth = () => {
  const accessToken = useCookie<string | null>('app_accessToken', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  const profile = useState<any>('profile', () => null)

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
    accessToken.value = access
  }

  const clearTokens = () => {
    accessToken.value = null
    profile.value = null
  }

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
    } catch (error) {
      console.error('Failed to get profile:', error)
      clearTokens()
      throw error
    }
  }

  const logout = async () => {
    try {
      // Logout dari SSO AirNav
      if (accessToken.value) {
        await $fetch('https://auth.airnavindonesia.co.id/user/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearTokens()
      navigateTo('/')
    }
  }

  return {
    accessToken,
    profile,
    verifyToken,
    setTokens,
    clearTokens,
    getProfile,
    logout,
  }
}
