/* 20_middleware_pages_router */
/*
========================================
20_middleware_pages_router (Next.js)
========================================

Definition:
Middleware in Next.js Pages Router is code that runs **before a request is completed**.
It allows you to inspect requests, rewrite, redirect, or modify headers. Middleware is 
global and not tied to a specific page component.

--------------------------------
Key Points:

1) Location:
- Must be placed at the root or inside /pages directory as middleware.js
- Runs **before any page or API route**

2) Usage:
- Commonly used for authentication, redirects, A/B testing, or logging
- Can read request headers, cookies, URL, and rewrite or redirect
- Runs **on every matching request**

Example:

// /pages/_middleware.js
import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('auth_token')
  if (!token) {
    return NextResponse.redirect('/login')
  }
  return NextResponse.next()
}

--------------------------------
3) Limitations in Pages Router:
- Middleware is **global**, cannot be scoped to a single page easily
- Only runs at the edge if configured, otherwise runs on Node server
- Cannot access React components or page-level props
- Cannot handle server component logic (Pages Router does not have RSC)
- Cannot modify response body, only headers, redirects, or rewrites

--------------------------------
4) Comparison with App Router:
- App Router has more granular middleware integration
- Can colocate middleware-like logic closer to routes
- Better integration with server components

--------------------------------
Interview-ready one-liner:
"In Pages Router, middleware runs before requests globally, allowing redirects, auth checks, 
and header modifications, but cannot access page-level props or server components; it is less flexible than App Router middleware."
*/
