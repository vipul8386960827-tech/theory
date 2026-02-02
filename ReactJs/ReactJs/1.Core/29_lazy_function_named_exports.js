/* 29_lazy_function_named_exports.js */
/*
React Lazy Function with Named Export – Interview-Ready Answer:

"In React, the `React.lazy()` function allows you to lazily load components, meaning the 
component is only loaded when it is rendered. By default, `React.lazy` works with default 
exports, but you can also use it with named exports by wrapping the import in a function 
that maps the named export to a default export."

Key Points:

1️⃣ React.lazy Basics:
- Syntax for default export: const Component = React.lazy(() => import('./Component'));
- Reduces initial bundle size.
- Must be used with `<Suspense>` to handle loading states.

2️⃣ Using Named Export with React.lazy:
- Named exports cannot be directly used with React.lazy.
- Wrap the import in a `then` to map the named export as default:
  React.lazy(() => import('./module').then(module => ({ default: module.NamedComponent })))

3️⃣ Real-life Analogies:

- Global Analogy: Ordering a specific book online – you receive it only when you request it.
- India-specific Analogy: Ordering dosa at a restaurant – it’s made fresh when you order, not pre-cooked.
- Web Analogy: A dashboard component loads only when the user navigates to that section, not during initial page load.

4️⃣ Coding Example:

// Named export in module
// File: components/MyComponent.js
export function MyComponent() {
    return <div>Lazy Loaded Named Component</div>;
}

// Lazy load the named export
import React, { Suspense } from 'react';

const LazyMyComponent = React.lazy(() =>
    import('./components/MyComponent').then(module => ({ default: module.MyComponent }))
);

function App() {
    return (
        <div>
            <h1>Main App</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyMyComponent />
            </Suspense>
        </div>
    );
}

// Explanation:
// - `MyComponent` is a named export.
// - React.lazy wraps a dynamic import and maps the named export to default.
// - Suspense shows a fallback UI while the component is loading.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can multiple named exports be lazy loaded at once?  
A1: No, each named export must be wrapped individually with React.lazy.

Q2: Why is Suspense necessary?  
A2: Suspense provides a fallback UI until the lazy component finishes loading.

Q3: Can lazy-loaded components be server-side rendered?  
A3: No, React.lazy works only in client-side rendering; for SSR, use framework-specific solutions like Next.js `dynamic()`.

Q4: Can lazy load improve performance?  
A4: Yes, by reducing initial bundle size and loading components only when needed.

Q5: What happens if lazy import fails?  
A5: You can catch errors using error boundaries around the Suspense component.
*/
