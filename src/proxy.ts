import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

// Routes that require authentication
const protectedRoutes = ['/admin/dashboard', '/admin/blogs', '/admin/resumes', '/admin/clients', '/admin/contact', '/admin/careers', '/admin/users', '/admin/profile']

// API routes that require authentication
const protectedApiRoutes = ['/api/admin', '/api/users']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isProtectedApi = protectedApiRoutes.some(route => pathname.startsWith(route))

  // Allow login page without auth
  if (pathname === '/admin/login') {
    if (token) {
      const payload = await verifyToken(token)
      if (payload) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    }
    return NextResponse.next()
  }

  if (isProtectedRoute || isProtectedApi) {
    if (!token) {
      // Redirect to login for page routes
      if (isProtectedRoute) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
      // Return 401 for API routes
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      if (isProtectedRoute) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Role-based access for page routes
    if (isProtectedRoute) {
      const role = payload.role

      // Role permissions map
      const rolePermissions: Record<string, string[]> = {
        ADMIN: ['*'],
        BLOG_MANAGER: ['/admin/dashboard', '/admin/blogs', '/admin/profile'],
        CV_CHECKER: ['/admin/dashboard', '/admin/resumes', '/admin/careers', '/admin/profile'],
        CLIENT_CHECKER: ['/admin/dashboard', '/admin/clients', '/admin/contact', '/admin/profile'],
      }

      const allowedRoutes = rolePermissions[role] || []
      const hasAccess = allowedRoutes.includes('*') || allowedRoutes.some(r => pathname.startsWith(r))

      if (!hasAccess) {
        // Redirect to dashboard with access denied
        return NextResponse.redirect(new URL('/admin/dashboard?accessDenied=true', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config: { matcher: string[] } = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/users/:path*',
  ],
}
