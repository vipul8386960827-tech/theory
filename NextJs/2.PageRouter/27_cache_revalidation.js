/*
========================================
27_cache_revalidation (Next.js Pages Router vs App Router)
========================================

Definition:
Cache revalidation is the process of updating cached data or pages after a certain period
to keep content fresh while still benefiting from caching for performance.

--------------------------------
1) Pages Router Cache Revalidation:
--------------------------------
- **Incremental Static Regeneration (ISR)**:
  - Use getStaticProps with `revalidate` key
  - Example:
    export async function getStaticProps() {
      const data = await fetchData()
      return { props: { data }, revalidate: 60 } // Revalidate every 60 seconds
    }
  - After 60 seconds, the next request triggers regeneration of the page
- **API route caching**:
  - Can manually expire cached API responses using memory store or Redis TTL
- **Limitations**:
  - Revalidation is page-level (cannot revalidate individual components)
  - Full page regeneration needed

--------------------------------
2) App Router Cache Revalidation:
--------------------------------
- **Server Component & fetch caching**:
  - Each server component can define its own revalidation
  - Example:
    const data = await fetch('https://api.example.com/data', {
      next: { revalidate: 60 } // cache for 60s
    }).then(res => res.json())
  - Only this component's data is cached; other components can have different revalidation
- **Streaming + Suspense**:
  - Cached components stream immediately; fresh content loads asynchronously if revalidated
- **Fine-grained control**:
  - Revalidate per fetch, per component, or even per route segment
  - Supports edge caching and server cache policies automatically

--------------------------------
Comparison:

| Feature                  | Pages Router                 | App Router                                   |
|---------------------------|-----------------------------|---------------------------------------------|
| Cache granularity         | Page-level only             | Component-level / per fetch                 |
| Revalidation              | ISR with revalidate in getStaticProps | next.revalidate per fetch/component         |
| Streaming & Suspense      | ❌                           | ✅                                           |
| Edge caching integration  | Limited / manual            | Automatic with fetch caching and RSC        |
| Control over cache policy | Moderate                    | Fine-grained                                |

--------------------------------
Key Takeaways:
- Pages Router: Use ISR for page-level revalidation; full page regeneration needed
- App Router: Fine-grained cache revalidation per component/fetch; supports streaming and Suspense
- App Router provides better performance and flexibility for modern apps

--------------------------------
Interview-ready one-liner:
"App Router enables fine-grained cache revalidation per server component or fetch call, supporting
 streaming and Suspense, whereas Pages Router only supports page-level ISR with full page regeneration."
*/
