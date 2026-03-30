 /*
 Improved page speed using CLS optimization, Lazy Loading, and Intersection Observer

 1. CLS Optimization (Cumulative Layout Shift)
 - Prevent layout shifts by reserving space for images/components
 - Done by adding width/height or aspect-ratio
 - Skeleton loaders can also be used until content loads

 Example:
 <img src="image.jpg" width="300" height="200" />
 OR use CSS aspect-ratio to maintain layout stability


 2. Lazy Loading
 - Load images/components only when needed instead of initial load
 - Reduces initial bundle size and speeds up page load

 Example:
 <img src="image.jpg" loading="lazy" />

 React lazy loading:
 const Component = React.lazy(() => import('./Component'));


 3. Intersection Observer
 - Detects when an element enters the viewport
 - Used to trigger loading of images or components dynamically

 Example:
 const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
        Load content when visible
     }
   });
 });


 4. Combined Approach
 - Reserve space (CLS fix)
 - Delay loading (Lazy loading)
 - Load only when visible (Intersection Observer)
 - Reduces unnecessary network requests and improves rendering speed


 5. Result
 - Faster initial load time
 - Better user experience (no layout shifts)
 - Improved Core Web Vitals (CLS, LCP)
 - Performance improvement can be significant depending on app size
 */