/*
========================================
26_cache_working (Next.js App Router vs Pages Router)
========================================

Definition:
Caching in Next.js improves performance by storing frequently accessed data or pages.
Both Pages Router and App Router support caching, but App Router provides **more fine-grained
and integrated caching mechanisms**, especially for server components.

--------------------------------
1) Pages Router Caching:
--------------------------------
- Page-level caching using getStaticProps (SSG)
  - Pages generated at build time are served from cache
- Incremental Static Regeneration (ISR)
  - Pages revalidate after a specified time (revalidate key)
- API route caching
  - Server-side caches (memory, Redis) for API responses
- Browser/CDN caching
  - Static assets from /public or next/image cached using Cache-Control headers

Limitations:
- Caching is mostly **page-level or API-level**
- No built-in caching for individual components
- Cannot cache partial content; full page must be regenerated

--------------------------------
2) App Router Caching:
--------------------------------
- **Component-level caching** using React Server Components
  - Individual server components can be cached independently
  - Uses fetch caching: `fetch('/api/data', { next: { revalidate: 60 }})`
- **Streaming + Suspense**
  - Cached server components can stream content to client faster
  - Uncached components still load asynchronously
- **Automatic caching integration**
  - Next.js handles caching headers for server components and fetch calls
  - Supports both ISR-like revalidation and edge caching
- **Colocated data fetching**
  - Each component can define its own cache strategy
  - Improves bundle size and performance since only necessary parts re-render

Example:

// app/dashboard/page.js (Server Component)
export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // cache this fetch for 60 seconds
  }).then(res => res.json())

  return <div>{data.title}</div>
}

Advantages over Pages Router:
- Fine-grained caching per component, not just per page
- Supports streaming and Suspense for faster perceived load
- Easier to integrate cache policies with server components and fetch
- Reduces redundant fetches and improves LCP and FID

--------------------------------
Key Takeaways:
- Pages Router: Page-level or API route caching (SSG, ISR, server-side cache)
- App Router: Component-level caching, fetch caching, streaming, Suspense integration
- App Router caching is more modern, fine-grained, and efficient

--------------------------------
Interview-ready one-liner:
"App Router supports component-level caching with fetch revalidation and streaming, making caching more fine-grained and efficient than Pages Router's page-level SSG/ISR caching."
*/
