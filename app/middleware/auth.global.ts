export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // Public routes
  if (to.path === '/' || to.path === '/login') return

  // If not logged in, only allow home
  if (!user.value) {
    return navigateTo('/login')
  }

  // Fetch user role from profile
  const { data: profile } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single()

  const role = profile?.role || 'guest'

  // Admin specific rule for /pia/submit
  if (to.path === '/pia/submit' && role === 'admin') {
    // We'll handle the toast in the component, but redirect for safety
    return navigateTo('/pia?error=type_not_allowed')
  }

  // Superadmin can access everything
  if (role === 'superadmin') return

  // Role-based restrictions
  const restrictions: Record<string, string[]> = {
    '/pia/submit': ['peserta', 'penilai', 'superadmin'],
    '/repository': ['peserta', 'penilai', 'superadmin'],
    '/innovations': ['peserta', 'penilai', 'superadmin'],
    '/admin': ['admin', 'superadmin']
  }

  const restrictedPaths = Object.keys(restrictions)
  const matchedPath = restrictedPaths.find(p => to.path.startsWith(p))

  if (matchedPath) {
    const allowedRoles = restrictions[matchedPath]
    if (!allowedRoles.includes(role)) {
      return navigateTo('/')
    }
  }
})
