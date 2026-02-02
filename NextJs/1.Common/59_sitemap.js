/* 59_sitemap */
/*
Key Points (Interviewer Keywords + Explanation):
1. Sitemap – An XML file that lists all the URLs of a website for search engines.

2. Purpose – Helps search engines crawl and index pages efficiently.

3. Implementation – Generate a sitemap in Next.js using libraries like `next-sitemap`
   or manually by creating an API route or script.

4. Features – Supports dynamic URLs, multiple languages, priorities, change frequencies.

5. Benefits – Improves SEO, ensures all pages are discoverable, supports multi-lingual sites.
*/

/*
Definition (Using Specific Terms):
A sitemap in Next.js is an XML document that informs search engines about
the structure of your website, including static and dynamic pages.
It can be generated at build time (SSG) or via an API route.
*/

/*
Code Example (Using next-sitemap):

// 1. Install
// npm install next-sitemap --save-dev

// 2. next-sitemap.config.js
module.exports = {
  siteUrl: "https://www.example.com",
  generateRobotsTxt: true, // optional
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
};

// 3. Add script to package.json
// "scripts": { "postbuild": "next-sitemap" }

// 4. Run build & generate sitemap
// npm run build
// npm run postbuild
*/

/*
Manual Sitemap Generation (API Route):

// pages/api/sitemap.xml.js
export default function handler(req, res) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
*/

/*
Important Notes:
- Can include static and dynamic pages.
- Supports multi-language sites using locale paths.
- Can specify changefreq and priority per URL.
- Works with Pages Router and App Router.
- Automated generation preferred for large projects.
*/

/*
Follow-up Questions + Answers:

Q1: What is a sitemap in Next.js?
A1: An XML file listing website URLs to help search engines crawl pages.

Q2: How can you generate a sitemap?
A2: Using libraries like next-sitemap or creating an API route/script manually.

Q3: Can sitemaps include dynamic routes?
A3: Yes, dynamically generate URLs in sitemap generation logic.

Q4: Does it affect SEO?
A4: Yes, helps search engines discover all pages, improving SEO.

Q5: Can it support multi-language sites?
A5: Yes, by including locale-specific URLs in the sitemap.
*/
