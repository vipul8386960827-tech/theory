/*
====================================================================
📦 NEXT.JS ROUTING & NAVIGATION — FULL DEEP DIVE (COMMENTED FILE)
For 5 years experience — Interview Ready — Paste Directly in .js
====================================================================


====================================================================
1️⃣ WHAT IS ROUTING IN NEXT.JS?
====================================================================
Next.js uses a **file-system based routing** mechanism.
Meaning:
- The folder & file structure = your routes
- No need to manually configure route tables
- Works in both `/pages` and `/app` routers

Two routing systems:
1. **Pages Router (Next.js ≤ 12)** → pages/
2. **App Router (Next.js 13+)** → app/

We focus on **App Router** (latest, used in interviews).


====================================================================
2️⃣ APP ROUTER: HOW ROUTES ARE CREATED
====================================================================
📁 app/
   ├── page.js        → route: /
   ├── dashboard/
   │      ├── page.js → route: /dashboard
   │      ├── settings/
   │      │      └── page.js → /dashboard/settings
   │      └── analytics/
   │             └── page.js → /dashboard/analytics

🔹 Every folder is a route segment.  
🔹 Every `page.js` is the actual route content.  
🔹 Every `layout.js` wraps all routes inside that folder.


====================================================================
3️⃣ WHAT IS layout.js AND WHY IT IS IMPORTANT?
====================================================================
layout.js = shared wrapper for nested routes.

Example:
app/dashboard/layout.js
-----------------------
export default function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

What this means?
✔ Sidebar stays persistent  
✔ Only page content changes  
✔ Perfect for dashboards, admin panels, settings pages


====================================================================
4️⃣ ROUTE SEGMENTS & TYPES
====================================================================

Next.js has multiple route segment types:

1️⃣ **Static route**  
app/about/page.js → /about

2️⃣ **Dynamic route**  
app/blog/[id]/page.js → /blog/123

3️⃣ **Catch-all route**  
app/docs/[...slug]/page.js → /docs/anything/here

4️⃣ **Optional catch-all**  
app/docs/[[...slug]]/page.js → /docs OR /docs/a/b/c

5️⃣ **Parallel routes**  
Useful for tab layouts.

6️⃣ **Intercepting routes**  
Helps override specific routes within modals.


====================================================================
5️⃣ NAVIGATION IN NEXT.JS
====================================================================

There are two types of navigation:

=====================
A) SERVER NAVIGATION
=====================
Triggered by:

<Link href="/dashboard">Dashboard</Link>

✔ Fast  
✔ Partial rendering  
✔ No full reload  
✔ SEO friendly  
✔ Mostly used by server components  

=====================
B) CLIENT NAVIGATION
=====================
Used inside `"use client"` components.

"use client";
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/dashboard");
router.replace("/login");
router.back();

✔ SPA-like navigation  
✔ Needed for buttons, dropdowns, actions  
✔ Good for dashboards, transitions  


====================================================================
6️⃣ SERVER COMPONENTS VS CLIENT COMPONENTS
====================================================================

Next.js defaults to **Server Components**.

---------------------------------------
✔ Server Components CAN:
---------------------------------------
- Fetch data directly in the component
- Render on server
- Reduce bundle size
- Improve performance

---------------------------------------
❌ Server Components CANNOT:
---------------------------------------
- useState / useEffect
- useRef
- Event listeners (onClick, onChange)
- router.push()

---------------------------------------
✔ Client Components MUST BE USED FOR:
---------------------------------------
- Interactive UI
- Event-driven navigation
- Modals, forms, buttons
- Charts, animations

Declare with:

"use client";


====================================================================
7️⃣ NESTED ROUTING (VERY IMPORTANT)
====================================================================

Structure:

app/
 └── dashboard/
       ├── layout.js          → shared sidebar/header
       ├── page.js            → /dashboard
       ├── settings/
       │      └── page.js     → /dashboard/settings
       └── analytics/
              └── page.js     → /dashboard/analytics

Nested routing automatically applies:
✔ Layout inheritance  
✔ SSR  
✔ Code splitting  
✔ URL structure  


====================================================================
8️⃣ PROTECTED ROUTES (MIDDLEWARE AUTH GUARD)
====================================================================

middleware.js
-----------------------------------------------
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

✔ Blocks user before reaching route  
✔ Secures nested routes automatically  
✔ Works for SSR and static routes  


====================================================================
9️⃣ DEEP LINKING — IMPORTANT FOR DASHBOARDS
====================================================================

Deep link example:
https://app.com/dashboard/settings/profile

Next.js handles it by:
✔ Restoring correct nested layout  
✔ Rendering related server components  
✔ Running middleware first  
✔ Loading client components after  

Deep linking requires:
- Correct folder structure  
- layout.js wrapping  
- middleware (if protected)  


====================================================================
🔟 BACK NAVIGATION
====================================================================

"use client";
import { useRouter } from "next/navigation";
const router = useRouter();

router.back();

This uses browser history:
✔ Works like normal browser back  
✔ SPA fast navigation  
✔ Does NOT full reload  


====================================================================
1️⃣1️⃣ LOADING STATES + ERROR BOUNDARIES
====================================================================

loading.js → Triggered while fetching

error.js → Triggered on component error

Next.js automatically:
✔ Splits routes  
✔ Shows loading screen  
✔ Shows error screen  
✔ Recovers without reload  


====================================================================
1️⃣2️⃣ CODE SPLITTING IN ROUTES (AUTOMATIC)
====================================================================
Next.js splits every route into chunks:

/ → home.js  
/dashboard → dashboard.js  
/dashboard/settings → settings.js  

Benefits:
✔ Faster first load  
✔ Only load required components  
✔ Great for large dashboards  


====================================================================
1️⃣3️⃣ INTERVIEW ANSWER: “Explain Next.js Routing”
====================================================================

(PASTE THIS VERBATIM)

"Next.js uses a file-based routing system where every folder is a route segment and every page.js becomes a route. The App Router adds layouts, loading states, error boundaries, nested routes, and server/client components. Navigation happens through server navigation with <Link> or client navigation using router.push(). Protected routes are handled through middleware. This gives scalable routing with automatic code splitting, deep linking support, and nested UI via layout.js."

====================================================================
📌 END OF FILE — PART 1 COMPLETE
====================================================================
*/
