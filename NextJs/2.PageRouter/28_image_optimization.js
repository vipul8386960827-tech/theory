/*
========================================
28_image_optimization (Next.js)
========================================

Definition:
Next.js provides built-in image optimization to improve performance, reduce
bandwidth, and enhance page load speed. The <Image> component automatically
handles resizing, lazy loading, and modern formats.

--------------------------------
Key Features:

1) Automatic Optimization:
- <Image> resizes images based on viewport
- Converts to modern formats like WebP and AVIF
- Reduces image weight without losing quality

2) Lazy Loading:
- Images outside the viewport are loaded only when needed
- Improves Largest Contentful Paint (LCP) and initial page load

3) Responsive Images:
- Automatically generates multiple sizes
- Uses srcset for different screen resolutions
- Ensures best quality on all devices

4) Placeholder & Blur-up:
- Supports placeholder="blur"
- Shows low-quality blurred image while loading high-res image

5) Remote Images:
- Configure remote patterns in next.config.js
- Allows optimization of external image URLs

Example:

import Image from 'next/image'

export default function Example() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={200}
      placeholder="blur"
      blurDataURL="/logo-blur.png"
    />
  )
}

--------------------------------
Best Practices:

- Always provide width and height to prevent layout shifts
- Use next/image instead of <img> for automatic optimization
- Configure next.config.js for remote images
- Avoid very large images; optimize source files

--------------------------------
Interview-ready one-liner:
"Next.js <Image> component optimizes images automatically with resizing, lazy loading, modern formats, responsive support, and placeholders to improve performance and Core Web Vitals."
*/
