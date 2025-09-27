import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('user');
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register');

    if (!isAuthenticated && !isAuthPage) {
        // Redirect to login if trying to access protected route while not authenticated
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthenticated && isAuthPage) {
        // Redirect to dashboard if trying to access auth pages while authenticated
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}