/* 25_ssg */
/*
Key Points (Interviewer Keywords + Explanation):
1. SSG (Static Site Generation) – Next.js pre-renders pages at build time,
   generating static HTML files for faster performance.

2. Performance – Fast page loads because HTML is ready before request,
   and served via CDN.

3. Data Fetching – Use getStaticProps (Pages Router) or fetch in server components
   (App Router) for build-time data.

4. Use Cases – Blogs, marketing pages, documentation, product catalogs.

5. Trade-offs – Not suitable for frequently changing data unless using
   Incremental Static Regeneration (ISR).
*/

/*
Definition (Using Specific Terms):
SSG in Next.js is a rendering strategy where pages are generated
once at build time, producing static HTML. These pages can be
served directly from a CDN, improving load speed and reducing server load.
*/

/*
Code Example (Pages Router):

// pages/blog.js
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return { props: { posts } };
}

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
    </div>
  );
}
*/

/*
Code Example (App Router – Server Component):

// app/blog/page.js
async function fetchPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function BlogPage() {
  const posts = await fetchPosts();
  return (
    <div>
      {posts.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
    </div>
  );
}
*/

/*
Important Notes:
- SSG pages are generated at build time, not per request.
- Improves performance and SEO for static content.
- Combine with ISR to update static pages after build.
- Ideal for pages that do not change often.
*/

/*
Follow-up Questions + Answers:

Q1: What is SSG in Next.js?
A1: Pre-rendering pages at build time, generating static HTML.

Q2: How do you fetch data for SSG?
A2: Use getStaticProps in Pages Router or fetch in server components in App Router.

Q3: When should you use SSG?
A3: For static content like blogs, marketing pages, or documentation.

Q4: Can SSG pages be updated after build?
A4: Yes, using Incremental Static Regeneration (ISR).

Q5: Advantages of SSG?
A5: Faster load times, reduced server load, better SEO.
*/
