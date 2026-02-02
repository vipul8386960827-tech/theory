/* 5_key_features */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Server-side Rendering (SSR) - Pages are rendered on the **server** per request for dynamic content.
2. Static Site Generation (SSG) - Pages are **pre-rendered at build time** for performance and SEO.
3. Hybrid Rendering - Next.js supports **mixing SSR, SSG, and Client-side Rendering (CSR)** in one app.
4. API Routes - Built-in **serverless endpoints** to handle CRUD operations, auth, or backend logic.
5. File-based Routing - Routes are automatically generated from **file/folder structure**.
6. App Router - Modern routing system with **Server Components, nested layouts, and Server Actions**.
7. Middleware - Pre-process requests for **auth, redirects, and rewrites**.
8. Image Optimization - Built-in **next/image** component for automatic image optimization.
9. Internationalization (i18n) - Supports **multi-language routing** and locale detection.
10. TypeScript Support - Full **TypeScript integration** with type safety.

Definition (Using Specific Terms):
Next.js is a **React framework** offering **SSR, SSG, and hybrid rendering** for performance and SEO. 
It includes **API routes** for backend logic, **file-based routing**, **middleware**, **image optimization**, 
and **i18n** support. The **App Router** introduces **Server Components, nested layouts, and Server Actions**, 
enhancing flexibility and maintainability. Full **TypeScript support** ensures type safety across the app.

Code Example:

// pages/index.js (SSR example)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return { props: { data } }
}

export default function Home({ data }) {
  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

// API Route example
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello Next.js' })
}

// Image Optimization example
import Image from 'next/image'
export default function ImgExample() {
  return <Image src="/logo.png" alt="Logo" width={200} height={200} />
}

Follow-up Questions + Answers:

Q1: What are the key rendering methods in Next.js?
A1: **SSR (Server-side Rendering), SSG (Static Site Generation), and CSR (Client-side Rendering)**.

Q2: What are API routes used for?
A2: To handle **serverless backend logic**, like CRUD operations or authentication.

Q3: What benefits does the App Router provide over Pages Router?
A3: Supports **Server Components, nested layouts, Server Actions, and streaming**.

Q4: How does Next.js handle images?
A4: Using the **next/image** component, which optimizes images automatically.

Q5: Does Next.js support TypeScript?
A5: Yes, fully integrated for type-safe development.
*/
