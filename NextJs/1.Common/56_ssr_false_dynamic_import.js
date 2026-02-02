/* 56_ssr_false_dynamic_import */
/*
Key Points (Interviewer Keywords + Explanation):
1. SSR False Dynamic Import – Using Next.js `dynamic` import with
   `{ ssr: false }` disables server-side rendering for that component.

2. Purpose – Useful for components that rely on browser-only APIs,
   like `window`, `document`, or third-party libraries that break on the server.

3. Implementation – Use `next/dynamic` to import the component dynamically.

4. Use Cases – Charts, maps, sliders, rich text editors, or any component
   that should render only on the client.

5. Benefits – Prevents SSR errors, reduces server load, and improves
   page stability when using client-only libraries.
*/

/*
Definition (Using Specific Terms):
SSR False Dynamic Import in Next.js allows you to load a component
**only on the client side** by dynamically importing it with
`ssr: false`. The server will skip rendering the component,
avoiding errors caused by browser-only APIs.
*/

/*
Code Example:

import dynamic from "next/dynamic";

// Import component without SSR
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* MapComponent will only render on client }
      <MapComponent />
    </div>
  );
}
*/

/*
Important Notes:
- Component will not be rendered on the server.
- Only works for Pages Router and App Router components.
- Ideal for browser-specific or third-party components.
- Can be combined with loading fallback to improve UX.
- Avoid overusing as too many client-only components may affect performance.
*/

/*
Follow-up Questions + Answers:

Q1: What does `{ ssr: false }` mean in Next.js dynamic import?
A1: The component will be rendered only on the client; SSR is disabled.

Q2: When should you use SSR false dynamic imports?
A2: For components relying on browser APIs or third-party libraries incompatible with SSR.

Q3: Can you use it with App Router?
A3: Yes, works with both App Router and Pages Router.

Q4: Does it affect SEO?
A4: Yes, content inside the client-only component won't be present in server-rendered HTML.

Q5: How can you improve UX for such components?
A5: Provide a fallback loading component while the client component loads.
*/
