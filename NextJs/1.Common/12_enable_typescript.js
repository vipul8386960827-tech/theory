/* 12_enable_typescript */
/*
Key Points (Interviewer Keywords + Explanation):
1. Built-in Support – Next.js supports TypeScript out of the box
   with zero manual configuration.

2. Enable During Setup – TypeScript can be enabled while creating
   the project using create-next-app.

3. Post-Setup Enablement – TypeScript can also be added later
   to an existing JavaScript project.

4. Auto Configuration – Next.js automatically generates tsconfig.json
   and installs required dependencies.

5. Type Safety – TypeScript provides static typing,
   better tooling, and fewer runtime errors.
*/

/*
Definition (Using Specific Terms):
Enabling TypeScript in Next.js means configuring the project to use
TypeScript for type-safe development.

Next.js provides first-class TypeScript support and automatically
sets up tsconfig.json, installs TypeScript, and applies sensible defaults
without requiring manual configuration.
*/

/*
Code Example (Enable During Project Creation):

npx create-next-app@latest my-app
// Select: TypeScript → Yes
*/

/*
Code Example (Enable in Existing Project):

npm install --save-dev typescript @types/react @types/node

// Rename any file from .js to .ts or .tsx
// Next.js will auto-generate tsconfig.json on next run

npm run dev
*/

/*
What Next.js Does Automatically:
- Creates tsconfig.json
- Enables strict mode defaults
- Adds type checking to build process
- Shows type errors in development
*/

/*
Follow-up Questions + Answers:

Q1: Does Next.js support TypeScript by default?
A1: Yes, TypeScript is officially supported and requires minimal setup.

Q2: Can TypeScript be added after project creation?
A2: Yes, by installing TypeScript and renaming files to .ts or .tsx.

Q3: Does enabling TypeScript affect runtime performance?
A3: No, TypeScript is removed at build time.

Q4: Is tsconfig.json mandatory?
A4: Yes, Next.js creates and uses tsconfig.json automatically.

Q5: Is TypeScript recommended for large applications?
A5: Yes, it improves maintainability and reduces bugs.
*/
