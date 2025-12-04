export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware di server side untuk menghindari issues
  if (process.server) return

  // Gunakan useCookie untuk membaca token yang sama dengan useAuth
  const accessToken = useCookie<string | null>('app_accessToken', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
    path: '/',
  })
  
  console.log('Auth middleware - Route:', to.path, 'Token exists:', !!accessToken.value)

  // Routes yang tidak memerlukan authentication
  const publicRoutes = ['/login', '/auth']

  // Cek apakah route adalah public atau processing token dari SSO
  const isPublicRoute = publicRoutes.includes(to.path)
  const isProcessingToken = to.path.startsWith('/login/')

  if (isProcessingToken) {
    console.log('Sedang memproses token dari SSO, skip middleware')
    return
  }

  // Jika tidak ada token dan bukan public route (termasuk homepage), redirect ke homepage
  if (!accessToken.value && !isPublicRoute && to.path !== '/') {
    console.log('Akses protected route tanpa token, redirect ke homepage')
    return navigateTo('/')
  }

  // Jika sudah ada token dan mencoba akses homepage atau login, redirect ke dashboard
  if ((to.path === '/' || to.path === '/login') && accessToken.value) {
    console.log('Sudah login, redirect ke dashboard')
    return navigateTo('/dashboard')
  }
})
