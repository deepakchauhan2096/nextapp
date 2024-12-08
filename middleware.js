// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/dashboard') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware only for /dashboard routes
};


