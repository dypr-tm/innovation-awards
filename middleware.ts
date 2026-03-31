import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Ensure the supabase client operates in the Edge runtime
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // 1. Definition of Route Access
  const isPublicRoute = path === '/' || path.startsWith('/about') || path.startsWith('/contact') || (path.startsWith('/pia') && !path.startsWith('/pia/submit'));
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register');
  
  // 2. Redirect Unauthenticated Users trying to access protected features
  if (!isPublicRoute && !isAuthRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. Redirect Authenticated Users away from auth pages
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 4. Role-Based Access Control (RBAC) Logic
  if (session) {
    // We should fetch the user's role here, but `session.user.user_metadata.role` might be available if we injected it
    // Alternatively, verify against `profiles` table via API if strictly needed, but `user_metadata` is faster in Edge.
    // For MVP, we'll assume `role` is stored in user_metadata from our Seeding script.
    const userRole = session.user.user_metadata?.role || 'peserta';

    // A. Peserta Access Restrictions
    if (userRole === 'peserta') {
      // Cannot access CMS dashboard or Penilai portals
      if (path.startsWith('/dashboard') || path.startsWith('/review')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // B. Penilai Access Restrictions
    if (userRole === 'penilai') {
      // Cannot submit innovations or access CMS
      if (path.startsWith('/pia/submit') || path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/repository', req.url)); // Redirect to gallery
      }
    }

    // C. Admin Restrictions
    if (userRole === 'admin') {
      // Could potentially block them from changing System Settings or Users (Superadmin only)
      if (path.startsWith('/dashboard/users')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }

  return res;
}

export const config = {
  // Apply middleware to all routes except api, static files, images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
