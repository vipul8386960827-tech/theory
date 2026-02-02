/*  
===============================================================================
FRONTEND SYSTEM DESIGN — CODE SPLITTING (DYNAMIC IMPORT)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Code splitting is a technique to **split your bundle into smaller chunks** 
  which are loaded on demand.
- Reduces initial bundle size and improves page load performance.
- Dynamic import in React (`import()`) enables **lazy loading** of components or modules.

##########################################
# WHY USE CODE SPLITTING
##########################################
1. **Performance Optimization**
   - Large bundles increase initial load time.
   - Load only necessary code for the current route/page.

2. **Improves User Experience**
   - Faster first paint.
   - Less blocking of UI thread.

3. **Scalable Architecture**
   - Easier to manage large applications by breaking code into logical chunks.

##########################################
# HOW IT WORKS
##########################################
- During build, webpack/other bundlers **split code into separate files**.
- `import()` is asynchronous and returns a promise.
- React.lazy + Suspense allows loading components lazily:
  - Shows fallback UI while loading.
  - Automatically loads chunk only when component is rendered.

##########################################
# EXAMPLE WITH React.lazy
##########################################
import React, { Suspense } from 'react';

// Dynamic import of component
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “Code splitting reduces initial bundle size by splitting code into chunks. 
  React.lazy and dynamic import load components only when needed, improving 
  performance and user experience.”

##########################################
# INTERVIEW TIPS
##########################################
- Mention **route-based vs component-based splitting**.
- Explain **fallback UI using Suspense**.
- Highlight **how webpack generates separate chunks**.
- Optional: Mention **preloading or prefetching chunks** for performance.

===============================================================================
END
===============================================================================
*/
