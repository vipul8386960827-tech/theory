/*
===========================================================
📌 WHAT ARE MICRO FRONTENDS? — SIMPLE & INTERVIEW READY
===========================================================

Micro Frontends is an architectural style where a large frontend 
application is divided into smaller, independent, and self-contained 
frontend apps — just like microservices in backend.

Each micro frontend:
✔ Can be developed independently  
✔ Has its own codebase  
✔ Has its own deployment pipeline  
✔ Can use its own tech stack (React, Vue, Angular, etc.)  
✔ Is owned by a specific team  
✔ Can be shipped without affecting the entire app  

The shell/container app stitches them together at runtime.

It solves the problem of scaling huge frontend applications.

===========================================================
🎯 WHY MICRO FRONTENDS?
===========================================================

1️⃣ **Independent Development**
Each team owns one feature: dashboard, cart, payments, admin, etc.

2️⃣ **Independent Deployment**
Deploy one micro frontend → entire app doesn’t rebuild.

3️⃣ **Different Tech Stacks**
One team can use Next.js, another can use Vue, etc.

4️⃣ **Faster Builds**
Teams build & ship small sections, not a monolith.

5️⃣ **Better Maintainability**
Clear separation of concerns, less code coupling.

===========================================================
🎯 HOW MICRO FRONTENDS WORK?
===========================================================

There are 3 common ways:

--------------------------------------------
1️⃣ **Iframe-based**
Easy but old. Less communication, less flexible.

--------------------------------------------
2️⃣ **Module Federation (Webpack 5) — Most Popular**
Load other apps at runtime:

- app-shell loads MFEs
- each MFE exposes components via webpack module federation
- shared modules reduce duplication

--------------------------------------------
3️⃣ **Build-Time Integration**
All MFEs compile together → not truly independent.

===========================================================
🧩 HOW DO MICRO FRONTENDS COMMUNICATE?
===========================================================

They can communicate using:
- Custom events (window.dispatchEvent)
- URL params / query params
- Global store (Zustand, Redux) shared via module federation
- Cross-app context providers
- Message bus (RxJS, EventEmitter)

===========================================================
🚀 REAL-WORLD EXAMPLES
===========================================================

Amazon: 
- Cart, product description, recommendations → separate MFEs

Netflix:
- Home page tiles come from different MFEs

Zalando:
- Vendor dashboard is micro frontend based

===========================================================
🗣 INTERVIEW ANSWER TO SAY VERBATIM
===========================================================

"Micro frontends is an architecture where a large frontend app is split
into smaller, independently developed and deployed applications.
Teams own individual features that can use different tech stacks and can 
be shipped without rebuilding the entire app. They are integrated using 
techniques like Webpack Module Federation, iframes, or runtime composition.
This improves scalability, deployment, and maintainability."

===========================================================
📌 END OF FILE
===========================================================
*/
