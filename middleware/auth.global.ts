export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie<string | null>('app_accessToken')
  console.log('Auth middleware - Route:', to.path, 'Token exists:', !!accessToken.value)

  // Routes yang tidak memerlukan authentication
  const publicRoutes = ['/', '/login', '/auth']

  // Cek apakah route adalah public atau processing token dari SSO
  const isPublicRoute = publicRoutes.includes(to.path)
  const isProcessingToken = to.path.startsWith('/login/')

  if (isProcessingToken) {
    console.log('Sedang memproses token dari SSO, skip middleware')
    return
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
