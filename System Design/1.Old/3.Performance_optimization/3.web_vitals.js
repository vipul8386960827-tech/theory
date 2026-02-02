/*  
===============================================================================
FRONTEND SYSTEM DESIGN — WEB VITALS (LCP, FID, CLS)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Web Vitals are a set of metrics by Google to measure **real-world user experience**.
- Focus on **loading, interactivity, and visual stability**.

##########################################
# CORE WEB VITALS
##########################################
1. **LCP (Largest Contentful Paint)**
   - Measures **loading performance**.
   - Time taken for the **largest visible content** (image, text block) to appear.
   - Good LCP: ≤ 2.5 seconds.
   - Optimization:
     - Optimize images and videos.
     - Use lazy loading.
     - Minimize render-blocking resources.

2. **FID (First Input Delay)**
   - Measures **interactivity**.
   - Time from **user’s first interaction** (click, tap, keypress) to browser response.
   - Good FID: ≤ 100ms.
   - Optimization:
     - Minimize main thread work.
     - Avoid heavy JavaScript during page load.
     - Use web workers for heavy tasks.

3. **CLS (Cumulative Layout Shift)**
   - Measures **visual stability**.
   - Sum of all unexpected layout shifts during page load.
   - Good CLS: ≤ 0.1.
   - Optimization:
     - Reserve space for images, ads, and embeds.
     - Avoid inserting content above existing content dynamically.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “Web Vitals measure loading (LCP), interactivity (FID), and visual stability (CLS). 
  Optimizing these improves user experience and Google Page Experience score.”

##########################################
# INTERVIEW TIPS
##########################################
- Mention **tools to measure**: Chrome DevTools, Lighthouse, Web Vitals library.
- Explain **how each metric impacts UX**.
- Optional: Discuss **Next.js / React performance strategies** to improve these metrics.

===============================================================================
END
===============================================================================
*/
