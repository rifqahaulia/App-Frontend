export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const accessToken = useCookie<string | null>('app_accessToken', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
    path: '/',
  })
  
  console.log('Auth middleware - Route:', to.path, 'Token exists:', !!accessToken.value)

  const publicRoutes = ['/', '/login', '/auth']

  const isPublicRoute = publicRoutes.some(route => to.path.startsWith(route))
  const isProcessingToken = to.path.startsWith('/login/') || to.path.startsWith('/auth/')

  if (isProcessingToken) {
    console.log('Sedang memproses token dari SSO, skip middleware')
    return
  }

  if (accessToken.value && !isPublicRoute) {
    const { validateSession } = useAuth()
    
    try {
      const isValid = await validateSession()
      
      if (!isValid) {
        console.log('Token invalid, redirect ke homepage')
        return navigateTo('/', { replace: true })
      }
      
      console.log('Token valid, akses diberikan')
    } catch (error) {
      console.error('Validation error:', error)
      return navigateTo('/', { replace: true })
    }
  }

  if (!accessToken.value && !isPublicRoute) {
    console.log('Tidak ada token, redirect ke homepage')
    return navigateTo('/', { replace: true })
  }

  if (to.path === '/' && accessToken.value) {
    console.log('Sudah login, redirect ke dashboard')
    return navigateTo('/dashboard', { replace: true })
  }
})