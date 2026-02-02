/* 40_next_env_dts */
/*
Key Points (Interviewer Keywords + Explanation):
1. next-env.d.ts – TypeScript declaration file automatically created
   in a Next.js project with TypeScript.

2. Purpose – Ensures TypeScript recognizes Next.js types like
   NextPage, AppProps, API route types, etc.

3. Automatic Creation – Generated when you first create a TypeScript
   Next.js project or run `npm run dev` with TypeScript enabled.

4. Never Delete – Deleting this file can break type checking for
   Next.js-specific types.

5. Custom Types – You can augment global types by creating additional
   .d.ts files alongside next-env.d.ts.
*/

/*
Definition (Using Specific Terms):
next-env.d.ts is an auto-generated TypeScript declaration file that
includes references to Next.js types, ensuring proper type support
throughout the project. It is essential for type checking and IntelliSense.
*/

/*
Code Example (Default Content of next-env.d.ts):

/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited manually.
// Its purpose is to include Next.js types for TypeScript.
*/

/*
Important Notes:
- Always keep this file in the project root.
- It is required for TypeScript projects to work correctly with Next.js.
- Do not manually edit; instead, add your custom type declarations
  in separate *.d.ts files.
- Supports global Next.js types for pages, API routes, images, etc.
*/

/*
Follow-up Questions + Answers:

Q1: What is next-env.d.ts?
A1: An auto-generated TypeScript declaration file for Next.js types.

Q2: Do you need to manually create it?
A2: No, Next.js creates it automatically when TypeScript is enabled.

Q3: Can you delete it?
A3: No, deleting breaks type checking and IntelliSense for Next.js types.

Q4: Can you add custom types here?
A4: No, use separate *.d.ts files for custom type declarations.

Q5: Which types does it include?
A5: NextPage, AppProps, API route types, image types, and other Next.js globals.
*/
