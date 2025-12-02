export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie<string | null>('accessToken')
  console.log('Auth middleware - Route:', to.path, 'Token exists:', !!accessToken.value)

  // Routes yang tidak memerlukan authentication
  const publicRoutes = ['/', '/login', '/auth']

  // Cek apakah route adalah public atau processing token dari SSO
  const isPublicRoute = publicRoutes.includes(to.path)
  const isProcessingToken = to.path.startsWith('/login/') && to.path.length > 20

  if (isProcessingToken) {
    console.log('Sedang memproses token dari SSO, skip middleware')
    return
  }

  // Jika ada token, verifikasi validitasnya untuk route protected
  if (accessToken.value && !isPublicRoute) {
    try {
      const { verifyToken } = useAuth()
      const isValid = await verifyToken(accessToken.value)

      if (!isValid) {
        console.log('Token tidak valid, hapus dan redirect ke login')
        accessToken.value = null
        return navigateTo('/login?error=invalid_token')
      }
    } catch (error) {
      console.error('Error verifying token:', error)
      accessToken.value = null
      return navigateTo('/login?error=server_error')
    }
  }

  // Jika tidak ada token dan bukan public route, redirect ke login
  if (!accessToken.value && !isPublicRoute) {
    console.log('Akses protected route tanpa token, redirect ke login')
    return navigateTo('/login')
  }

  // Jika sudah ada token dan mencoba akses login, redirect ke dashboard
  if (to.path === '/login' && accessToken.value) {
    console.log('Sudah login, redirect dari login ke dashboard')
    return navigateTo('/dashboard')
  }

  // Homepage (/) tetap bisa diakses meskipun sudah login
  // User bisa memilih untuk klik "Start" lagi atau langsung ke dashboard
})
