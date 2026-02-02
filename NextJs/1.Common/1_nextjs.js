/* 
Key Points (Interviewer Keywords + Explanation):
1. Next.js - A **React framework** for building **server-side rendered (SSR)**, **static**, 
   and **hybrid applications**.
2. SSR & SSG - Supports **Server-Side Rendering** (dynamic pages) and **Static Site Generation** 
   (pre-rendered pages at build time).
3. App Router & Pages Router - Two routing systems; **App Router (app/)** is modern and supports 
   **Server Components**, nested layouts, and Server Actions. **Pages Router (pages/)** is legacy, 
   widely supported, and uses getServerSideProps/getStaticProps.
4. API Routes - Built-in serverless **backend endpoints** in Next.js for handling CRUD, auth, etc.
5. Middleware - Functions that run **before requests reach routes** to handle auth, redirects, or rewrites.
6. File-based Routing - Route structure based on **folder and file names**, simplifying routing.
7. Edge Runtime / Serverless Deployment - Supports deployment to **serverless platforms** (Vercel, AWS Lambda) 
   or **Edge environments** for faster response.

Definition (Using Specific Terms):
Next.js is a **React framework** that enables building **full-stack applications** with SSR, SSG, and hybrid 
rendering. It supports both **App Router** and **Pages Router**, providing **file-based routing**, **API routes**, 
and **middleware**. Applications can be deployed on **serverless** or **Edge environments**, leveraging 
Server Components for performance and security.

Code Example:

// pages/index.js (Pages Router example)
export default function Home() {
  return <h1>Welcome to Next.js</h1>
}

// app/page.js (App Router example)
export default function Home() {
  return <h1>Welcome to Next.js App Router</h1>
}

// API Route example
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API Route' })
}

Follow-up Questions + Answers:

Q1: What is Next.js?
A1: A **React framework** for building SSR, SSG, and hybrid full-stack applications.

Q2: What is the difference between App Router and Pages Router?
A2: **App Router** supports Server Components, nested layouts, and Server Actions. **Pages Router** 
    uses getServerSideProps/getStaticProps and is more mature.

Q3: What are API Routes in Next.js?
A3: Built-in serverless endpoints for backend logic like CRUD operations, authentication, and data fetching.

Q4: What is middleware in Next.js?
A4: Functions that run **before route handling**, commonly used for authentication, redirects, and rewrites.

Q5: Where can Next.js apps be deployed?
A5: **Serverless platforms** like Vercel, AWS Lambda, or **Edge environments** for low-latency responses.
*/
