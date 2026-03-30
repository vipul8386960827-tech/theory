/*
================================================================================
CLOUDINARY IMAGE OPTIMIZATION — COMPLETE EXPLANATION (INTERVIEW + IMPLEMENTATION)
================================================================================

🔹 WHAT THIS MEANS
We used Cloudinary URL-based transformations to optimize images dynamically.
Instead of manually editing images (resize, compress, convert format),
we modify the image URL and Cloudinary handles everything on the fly.

--------------------------------------------------------------------------------
🔹 BASIC CLOUDINARY URL STRUCTURE

Original Image URL:
https://res.cloudinary.com/<cloud_name>/image/upload/<image_path>

Example:
https://res.cloudinary.com/demo/image/upload/sample.jpg

--------------------------------------------------------------------------------
🔹 ADDING TRANSFORMATIONS

We inject transformations inside the URL:

https://res.cloudinary.com/demo/image/upload/w_500,q_auto,f_auto/sample.jpg

Breakdown:
- w_500     → resize width to 500px
- q_auto    → automatic quality optimization (reduces size without visible loss)
- f_auto    → automatically serve best format (WebP, AVIF, JPEG depending on browser)

--------------------------------------------------------------------------------
🔹 WHY THIS IS POWERFUL

1. No need to store multiple image versions
2. Optimization happens on CDN level (fast delivery)
3. Images are cached globally
4. Works dynamically for any device/screen size

--------------------------------------------------------------------------------
🔹 BEFORE vs AFTER

❌ BEFORE (UNOPTIMIZED IMAGE)
- Large size (1MB+)
- Same image for all devices
- Slower page load

<img src="/images/banner.jpg" />

✅ AFTER (OPTIMIZED WITH CLOUDINARY)
- Smaller size (~200–300KB)
- Responsive
- Faster load

<img 
  src="https://res.cloudinary.com/demo/image/upload/w_800,q_auto,f_auto/banner.jpg" 
  alt="banner" 
/>

--------------------------------------------------------------------------------
🔹 DYNAMIC IMAGE OPTIMIZATION FUNCTION

Instead of hardcoding URLs, we create a reusable helper:

*/

const getOptimizedImage = (url, { width = 500, quality = "auto" } = {}) => {
  return url.replace("/upload/", `/upload/w_${width},q_${quality},f_auto/`);
};

/*
Usage:

const imageUrl = getOptimizedImage(
  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  { width: 400 }
);

--------------------------------------------------------------------------------
🔹 RESPONSIVE IMAGES (IMPORTANT FOR PERFORMANCE)

Serve different sizes based on screen width:

<img
  src=".../w_400/..."
  srcSet="
    .../w_400/... 400w,
    .../w_800/... 800w,
    .../w_1200/... 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="responsive"
/>

➡️ Mobile users download smaller images
➡️ Desktop users get higher quality

--------------------------------------------------------------------------------
🔹 LAZY LOADING (BOOST PERFORMANCE FURTHER)

<img 
  src=".../w_800,q_auto,f_auto/..." 
  loading="lazy" 
  alt="lazy image" 
/>

➡️ Images load only when they enter viewport
➡️ Reduces initial page load time

--------------------------------------------------------------------------------
🔹 REAL IMPACT (WHY YOU WROTE THIS POINT)

🚀 25% FASTER LOAD TIME:
- Reduced image size
- Faster CDN delivery
- Less network payload

📈 20% INCREASE IN ENGAGEMENT:
- Faster pages → users stay longer
- Lower bounce rate
- Better UX → more clicks/interactions

--------------------------------------------------------------------------------
🔹 WHERE THIS IS USED

- E-commerce product images
- Landing pages
- Blogs / content platforms
- Dashboards with media

--------------------------------------------------------------------------------
🔹 INTERVIEW ONE-LINER

"We used Cloudinary URL transformations to dynamically resize, compress,
and serve images in modern formats like WebP/AVIF. This reduced payload size,
improved load time by ~25%, and increased user engagement due to better UX."

--------------------------------------------------------------------------------
🔹 BONUS (NEXT.JS INTEGRATION IDEA)

If using Next.js:

import Image from "next/image";

<Image
  src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
  width={500}
  height={300}
  alt="optimized"
/>

➡️ Next.js + Cloudinary together = even better optimization

--------------------------------------------------------------------------------
END
--------------------------------------------------------------------------------
*/
