/*
========================================
24_seo_pages_router (Next.js)
========================================

Definition:
SEO (Search Engine Optimization) in Next.js Pages Router involves ensuring
that pages are crawlable, indexable, and provide metadata for better ranking.
Pages Router provides server-side rendering and static generation which helps SEO.

--------------------------------
Key Points:

1) Server-side Rendering (SSR):
- getServerSideProps allows content to be rendered on the server
- Ensures crawlers receive full HTML with content
- Improves indexing for dynamic pages

2) Static Site Generation (SSG):
- getStaticProps + getStaticPaths pre-renders pages at build time
- Ideal for blogs, marketing pages, documentation
- Provides fast load times and fully crawlable HTML

3) Meta Tags & Head Management:
- Use next/head to set meta tags, title, description
- Example:
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description for SEO" />
      </Head>
      <h1>Content</h1>
    </>
  )
}

4) Open Graph & Social Media:
- Include OG tags, Twitter card tags for social sharing
- Also managed via next/head

5) Sitemap & robots.txt:
- Generate sitemap.xml for search engines
- Configure robots.txt to control crawling

6) URL Structure:
- Pages Router automatically uses file-based routes
- Clean URLs improve SEO (e.g., /blog/my-post)

7) Canonical URLs:
- Set rel="canonical" in Head to prevent duplicate content issues

--------------------------------
Best Practices:

- Pre-render pages whenever possible (SSR or SSG)
- Include meta description and title tags for each page
- Use semantic HTML (h1, h2, p)
- Optimize images using next/image with alt attributes
- Generate sitemap and configure robots.txt
- Avoid duplicate content with canonical tags

--------------------------------
Interview-ready one-liner:
"Pages Router supports SEO through server-side rendering, static generation, meta tags with next/head, clean URLs, and sitemap generation, ensuring content is crawlable and indexable by search engines."
*/
