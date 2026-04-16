export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // 1. Define Public Routes (Accessible by Everyone including Guests)
  const publicRoutes = ['/', '/pia', '/about', '/login']
  if (publicRoutes.includes(to.path)) return

  // 2. Auth Check: If not logged in and trying to access private route, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }

  // 3. Role Retrieval from Supabase Profiles
  const { data: profile } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single()

  const role = profile?.role || 'guest'

  // 4. Role Hierarchy & Permission Mapping
  // Superadmin: God mode
  if (role === 'superadmin') return

  // Admin: Access all EXCEPT User Management (conceptual)
  if (role === 'admin') {
    // Specifically block /pia/submit as requested earlier (Type not allowed)
    if (to.path === '/pia/submit') {
      return navigateTo('/pia?error=type_not_allowed')
    }
    // Admin can access everything else
    return
  }

  // Peserta: Limited to the list below
  if (role === 'peserta') {
    const allowedPesertaRoutes = [
      '/', '/pia', '/pia/submit', '/about', 
      '/user-settings', '/idea-repository', '/innovations'
    ]
    // Check if path is in allowed list or starts with it (for nested pages)
    const isAllowed = allowedPesertaRoutes.some(route => to.path.startsWith(route))
    if (!isAllowed) {
      return navigateTo('/')
    }
    return
  }

  // Guest (Logged in but no specific role): Fallback to home
  if (role === 'guest') {
    if (!publicRoutes.includes(to.path)) {
      return navigateTo('/')
    }
  }
})
