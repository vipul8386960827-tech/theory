/* 181_code_splitting.js

=================================================
Code Splitting in React
=================================================

📌 Definition:
- Code splitting is a technique to split large bundles into smaller chunks.  
- It improves performance by **loading code only when it’s needed**, instead of all at once.  
- React supports it via **dynamic import()**, `React.lazy()`, and libraries like `Loadable Components`.

-------------------------------------------------
✅ Why Code Splitting?
-------------------------------------------------
1. Reduces initial load time (faster page load).  
2. Loads only required code on demand (lazy loading).  
3. Improves user experience, especially in large apps.  
4. Optimizes bundle size for different routes/components.  

-------------------------------------------------
✅ Ways to Do Code Splitting in React:
-------------------------------------------------

1. **Dynamic Import**
   Example:
   const module = await import('./MyModule');

2. **React.lazy() with Suspense**
   Example:
   const OtherComponent = React.lazy(() => import('./OtherComponent'));

   function App() {
     return (
       <React.Suspense fallback={<div>Loading...</div>}>
         <OtherComponent />
       </React.Suspense>
     );
   }

3. **React Router with Lazy Loading**
   Example:
   const About = React.lazy(() => import('./About'));
   <Route path="/about" element={
     <Suspense fallback={<div>Loading...</div>}>
       <About />
     </Suspense>
   } />

4. **Third-Party Libraries**
   - `loadable-components`
   - `react-loadable`

-------------------------------------------------
⚠️ Important Notes:
-------------------------------------------------
- Code splitting works best with **route-based splitting** (load code per page).  
- Always wrap `React.lazy()` components in `<Suspense>`.  
- Too much splitting can cause extra requests → balance is needed.  

-------------------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------------------
Q1: What is the main benefit of code splitting?  
A1: It reduces the initial bundle size and improves performance.  

Q2: What’s the difference between `React.lazy` and dynamic `import()`?  
A2: `React.lazy` is specifically for React components, while `import()` works for any module.  

Q3: Why do we need `Suspense` with `React.lazy`?  
A3: To show a fallback UI while the lazy-loaded component is being fetched.  

Q4: Can code splitting ever hurt performance?  
A4: Yes, if overused, it may increase network requests and slow down rendering.  

*/
