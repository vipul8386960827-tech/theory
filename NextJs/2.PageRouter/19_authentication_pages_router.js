/*
========================================
Pages Router Unique Features in Next.js
========================================

Definition:
The Pages Router is the traditional routing system in Next.js using the /pages
folder. While it has some limitations compared to the App Router, it also has
specific features and lifecycle methods that only Pages Router supports.

--------------------------------
1) Page-Level Data Fetching Methods (Lifecycle Methods):
--------------------------------
- getServerSideProps(context)
  - Runs on the server for every request
  - Can fetch data securely before rendering
  - Ideal for auth checks and dynamic data

- getStaticProps(context)
  - Runs at build time to generate static pages
  - Can fetch data once, suitable for blogs, docs
  - Cannot access request-specific info (like cookies)

- getStaticPaths()
  - Works with getStaticProps for dynamic static pages
  - Generates routes at build time

- getInitialProps (Legacy)
  - Runs on server AND client during page transitions
  - Mainly used in older apps
  - Mostly replaced by getServerSideProps or getStaticProps

--------------------------------
2) API Routes Integration:
--------------------------------
- /pages/api/* routes are unique to Pages Router
- Each file automatically becomes an endpoint
- Supports Express-style handlers: (req, res)
- Can be used for:
  - Auth endpoints
  - Token issuance
  - Server-side logic
- Can be fully server-side (never exposed to client)
- Edge Runtime is experimental, only available for API routes

--------------------------------
3) Authentication Patterns:
--------------------------------
- Server-side auth using getServerSideProps
- Cookie-based sessions:
  - HttpOnly cookies
  - Secure cookies
  - Checked in getServerSideProps before rendering page
- API route auth:
  - Token verification
  - Login/logout endpoints
- OAuth integration using API routes (Pages Router handles the server-side flow)
- Can use NextAuth.js fully with Pages Router
- Patterns rely on page-level data fetching; cannot colocate auth logic with components

--------------------------------
4) Full Server-Side Rendering (SSR):
--------------------------------
- Pages Router supports page-level SSR by default using getServerSideProps
- Can fetch per-request data before sending HTML
- Can protect routes using server-side checks
- App Router can do SSR too, but Pages Router’s SSR is fully page-level, simpler

--------------------------------
5) Static Site Generation (SSG):
--------------------------------
- Pages Router supports getStaticProps + getStaticPaths
- Can generate pages at build time
- Supports Incremental Static Regeneration (ISR) with revalidate key
- Useful for partially dynamic content

--------------------------------
6) Legacy Support:
--------------------------------
- getInitialProps is only supported in Pages Router
- Works with older Next.js apps
- Useful for migrating older projects

--------------------------------
7) Simplicity and Stability:
--------------------------------
- Works with all Next.js versions
- Stable and predictable
- File-based routing is simple and intuitive

--------------------------------
8) Summary Table (Pages Router Exclusive Features):
--------------------------------
| Feature                     | Pages Router Only | Notes |
|-------------------------------|----------------|-------|
| getServerSideProps            | ✅             | Page-level SSR |
| getStaticProps                | ✅             | Page-level SSG |
| getStaticPaths                | ✅             | For dynamic SSG |
| getInitialProps               | ✅             | Legacy method |
| /pages/api/* API routes       | ✅             | Server-side endpoints |
| Cookie-based auth patterns    | ✅             | Checked in getServerSideProps |
| ISR (revalidate)              | ✅             | Incremental static regeneration |

--------------------------------
Interview-ready one-liner:
"Pages Router uniquely supports page-level lifecycles like getServerSideProps,
getStaticProps, getStaticPaths, legacy getInitialProps, API routes, cookie-based
authentication patterns, and ISR, making it stable and reliable for SSR/SSG apps."
*/
