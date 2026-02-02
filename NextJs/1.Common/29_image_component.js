/* 29_image_component */
/*
Key Points (Interviewer Keywords + Explanation):
1. Next/Image – Next.js provides the <Image> component
   for optimized image rendering.

2. Automatic Optimization – Handles resizing, lazy loading,
   and modern formats like WebP automatically.

3. Responsive Images – Can set width, height, or layout="responsive"
   for images that adapt to different screen sizes.

4. Performance Benefits – Reduces page load, improves LCP
   (Largest Contentful Paint), and supports CDN caching.

5. Supported Features – Placeholder (blur), priority loading,
   unoptimized for external sources, and custom loader support.
*/

/*
Definition (Using Specific Terms):
The Next.js <Image> component optimizes images automatically
by resizing, lazy loading, and serving modern formats.
It enhances performance, SEO, and user experience compared
to using standard <img> tags.
*/

/*
Code Example (Usage):

import Image from "next/image";

// Static image from public folder
export default function Avatar() {
  return (
    <Image
      src="/avatar.png"
      alt="User Avatar"
      width={150}
      height={150}
      priority
      placeholder="blur"
      blurDataURL="/avatar-blur.png"
    />
  );
}

// External image
export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External Image"
      width={500}
      height={300}
    />
  );
}
*/

/*
Important Notes:
- Always provide width, height, or layout for responsive sizing.
- Lazy loading is automatic for off-screen images.
- Use placeholder="blur" for better UX during loading.
- External domains must be added in next.config.js under images.domains.
*/

/*
Follow-up Questions + Answers:

Q1: Why use Next.js <Image> instead of <img>?
A1: Automatic optimization, resizing, lazy loading, and better performance.

Q2: Can <Image> handle external URLs?
A2: Yes, but the domain must be whitelisted in next.config.js.

Q3: What is the placeholder option?
A3: Provides a blur effect while the image is loading.

Q4: How does Next.js <Image> improve SEO?
A4: Faster page load and optimized images improve Core Web Vitals.

Q5: Do we need to manually handle responsive images?
A5: No, <Image> supports responsive layouts automatically.
*/
