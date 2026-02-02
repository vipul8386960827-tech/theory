/* 
Key Points (Interviewer Keywords + Explanation):
1. Project Setup - Next.js projects can be created using **create-next-app** or manually.
2. CLI Command - `npx create-next-app@latest my-app` initializes a new Next.js project.
3. App Router vs Pages Router - During setup, you can choose **App Router (app/)** or **Pages Router (pages/)**.
4. TypeScript Support - Option to include **TypeScript** during setup.
5. ESLint & Tailwind - Can optionally enable **linting and styling frameworks** during project creation.
6. Folder Structure - Next.js automatically creates **app or pages folder**, **public**, **styles**, and **package.json**.

Definition (Using Specific Terms):
Creating a Next.js project involves using **create-next-app**, which scaffolds the project 
with the chosen router type (App or Pages), optional **TypeScript**, and other tools like **ESLint**. 
It generates a **default folder structure** with routing, public assets, and styling support.

Code Example (CLI commands):

// Create a new Next.js project (latest version)
npx create-next-app@latest my-next-app

// Choose options during setup:
// - App Router (default)
// - TypeScript (optional)
// - ESLint (optional)
// - Tailwind (optional)

// Navigate into project
cd my-next-app

// Start development server
npm run dev

Follow-up Questions + Answers:

Q1: How do you create a Next.js project?
A1: Use `npx create-next-app@latest my-app` and follow the setup prompts.

Q2: Can you choose between App Router and Pages Router during setup?
A2: Yes, the CLI allows selecting either router type.

Q3: Does Next.js support TypeScript out of the box?
A3: Yes, you can enable TypeScript during project creation; it will generate necessary config files.

Q4: What folder structure is created automatically?
A4: **app or pages folder**, **public**, **styles**, **package.json**, **node_modules**, and config files.

Q5: How do you start the development server?
A5: Navigate to the project folder and run `npm run dev`.
*/
