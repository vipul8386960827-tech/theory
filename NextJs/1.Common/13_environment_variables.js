/* 13_environment_variables */
/*
Key Points (Interviewer Keywords + Explanation):
1. Environment Variables – Used to store configuration values
   like API URLs, keys, and environment-specific settings.

2. .env Files – Next.js supports .env, .env.local,
   .env.development, and .env.production files.

3. Server vs Client – By default, environment variables
   are available only on the server.

4. NEXT_PUBLIC Prefix – Variables prefixed with NEXT_PUBLIC_
   are exposed to the browser.

5. Build-Time Injection – Environment variables are injected
   at build time, not runtime.
*/

/*
Definition (Using Specific Terms):
Environment variables in Next.js are configuration values
defined in .env files or the hosting platform environment.

They are used to manage sensitive data and environment-specific
configuration. Variables are server-only by default, and only
those prefixed with NEXT_PUBLIC_ are accessible on the client.
*/

/*
Code Example (.env.local):

DATABASE_URL=postgres://user:pass@localhost:5432/db
API_SECRET=super_secret_key
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
*/

/*
Usage Example:

// Server-side usage
const secret = process.env.API_SECRET;

// Client-side usage
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
*/

/*
Important Rules:
- Never expose secrets to the client.
- Use NEXT_PUBLIC_ only for safe values.
- Restart dev server after changing .env files.
*/

/*
Follow-up Questions + Answers:

Q1: Where do we define environment variables in Next.js?
A1: In .env files or in the hosting platform environment settings.

Q2: Are environment variables available on the client by default?
A2: No, only variables prefixed with NEXT_PUBLIC_ are exposed.

Q3: When are environment variables injected?
A3: At build time.

Q4: Is .env.local committed to git?
A4: No, it should be ignored for security reasons.

Q5: Can we access process.env directly in components?
A5: Yes, but only NEXT_PUBLIC_ variables work in client components.
*/
