/* 17_default_port */
/*
Key Points (Interviewer Keywords + Explanation):
1. Default Port – Next.js development server runs on port 3000 by default.

2. Access URL – After starting the dev server, the app is accessible at
   http://localhost:3000

3. Custom Port – You can change the port using the -p flag or environment variables.

4. Production Port – In production, the port depends on deployment platform
   or server configuration.

5. Common Use Cases – Avoid port conflicts with other local servers or apps.
*/

/*
Definition (Using Specific Terms):
Next.js by default starts the development server on port 3000.
This is the address developers use to preview the application
during development. The port can be customized when starting the server.
*/

/*
Code Example (Usage):

// Start dev server on default port
npm run dev
// App runs at http://localhost:3000

// Start dev server on custom port
npm run dev -- -p 4000
// App runs at http://localhost:4000

// OR using environment variable
PORT=5000 npm run dev
// App runs at http://localhost:5000
*/

/*
Important Notes:
- Default port is 3000, but conflicts may require changing it.
- The port does not affect production deployment.
- Using a custom port is common when multiple apps run locally.
*/

/*
Follow-up Questions + Answers:

Q1: What is the default port of Next.js?
A1: 3000

Q2: How to change the port in development?
A2: Use -p flag or set PORT environment variable.

Q3: Does the port affect production deployment?
A3: No, production port is determined by the hosting environment.

Q4: What URL is used to access the app locally?
A4: http://localhost:PORT (default 3000)

Q5: Why might you need to change the default port?
A5: To avoid conflicts with other local servers or apps.
*/
