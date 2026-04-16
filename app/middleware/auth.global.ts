export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  // 1. Define Public Routes (Accessible by Everyone including Guests)
  const publicRoutes = ['/', '/pia', '/about', '/login']
  if (publicRoutes.includes(to.path)) return

  // 2. Auth Check: If not logged in, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }

  // 3. Role Retrieval - with fallback to 'peserta' if profile fetch fails
  let role = 'peserta' // Default to peserta for logged-in users
  try {
    const { data: profile, error } = await client
      .from('profiles')
      .select('role')
      .eq('id', user.value.id)
      .single()

    if (!error && profile?.role) {
      role = profile.role
    }
  } catch (e) {
    // If profile fetch fails, keep default 'peserta' for logged-in users
    console.warn('Profile fetch failed in middleware, defaulting to peserta role')
  }

  // 4. Role Hierarchy & Permission Mapping

  // Superadmin: Full access
  if (role === 'superadmin') return

  // Admin: Access all EXCEPT /pia/submit
  if (role === 'admin') {
    if (to.path === '/pia/submit') {
      return navigateTo('/pia?error=type_not_allowed')
    }
    return
  }

  // Peserta: Access to innovation workflow pages
  if (role === 'peserta') {
    const allowedPesertaRoutes = [
      '/', '/pia', '/pia/submit', '/about',
      '/user-settings', '/idea-repository', '/innovations'
    ]
    const isAllowed = allowedPesertaRoutes.some(route => to.path.startsWith(route))
    if (!isAllowed) {
      return navigateTo('/')
    }
    return
  }

  // Fallback: Logged in but no valid role, redirect to home
  return navigateTo('/')
})

