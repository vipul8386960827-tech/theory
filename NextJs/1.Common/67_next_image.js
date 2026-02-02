/* 67_next_image */
/*
Key Points (Interviewer Keywords + Explanation):
1. Next/Image – Built-in Next.js component for optimized image rendering.

2. Purpose – Automatically handles resizing, lazy loading, optimization,
   and modern formats (WebP/AVIF) for better performance.

3. Implementation – Import Image from "next/image" and provide
   src, width, height, and alt attributes.

4. Features –
   - Lazy loading by default
   - Automatic resizing and optimization
   - Supports placeholders (blur)
   - Can define priority for important images
   - Works with both local and remote images (next.config.js required for remote)

5. Benefits – Faster page loads, improved Core Web Vitals, responsive images,
   and better SEO.
*/

/*
Definition (Using Specific Terms):
Next/Image is a Next.js component that optimizes images automatically,
supports responsive sizes, lazy loading, placeholders, and priority loading.
*/

/*
Code Example (Basic Usage):

import Image from "next/image";
import sampleImg from "../public/sample.jpg";

export default function Home() {
  return (
    <div>
      <h1>Next.js Image Example</h1>
      <Image
        src={sampleImg}
        alt="Sample Image"
        width={600}
        height={400}
      />
    </div>
  );
}

/*
Code Example (With Remote Image and Placeholder):

// next.config.js
module.exports = {
  images: {
    domains: ["example.com"], // allow remote domain
  },
};

// Component
<Image
  src="https://example.com/photo.jpg"
  alt="Remote Image"
  width={800}
  height={500}
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANS..."
  priority
/>
*/

/*
Important Notes:
- width & height are required for layout optimization.
- placeholder="blur" shows a blurry placeholder until image loads.
- priority prop ensures above-the-fold images load faster.
- Remote images require domain whitelisting in next.config.js.
- Works in Pages Router and App Router.
*/

/*
Follow-up Questions + Answers:

Q1: What is Next/Image?
A1: A Next.js component for automatic image optimization and responsive loading.

Q2: How to load remote images?
A2: Add their domain in next.config.js under images.domains.

Q3: What does placeholder="blur" do?
A3: Shows a low-quality blurry image while the main image loads.

Q4: What is priority in Image?
A4: Marks images as high-priority for faster above-the-fold loading.

Q5: Do you need width & height?
A5: Yes, for layout optimization and preventing CLS (Cumulative Layout Shift).
*/
