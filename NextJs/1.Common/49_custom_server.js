/* 49_custom_server */
/*
Key Points (Interviewer Keywords + Explanation):
1. Custom Server – In Next.js, you can replace the default server
   with your own Node.js/Express/Koa server for more control.

2. Purpose – Enables custom routing, middleware, authentication,
   or integration with other frameworks outside Next.js defaults.

3. Implementation – Create a server file (e.g., server.js) and use
   Next.js’s `next()` to handle requests.

4. Use Cases – Advanced routing, custom API handling, server-side logic
   that Next.js cannot handle natively.

5. Limitations – Using a custom server disables some Next.js features,
   like automatic static optimization, Vercel serverless deployment.
*/

/*
Definition (Using Specific Terms):
A Custom Server in Next.js allows developers to fully control
the Node.js server that handles requests. You can add custom routes,
middleware, or integrate with existing server-side logic while still
using Next.js for rendering pages and components.
*/

/*
Code Example (server.js with Express):

const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom route example
  server.get("/custom-route", (req, res) => {
    return app.render(req, res, "/about");
  });

  // Handle all other requests with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Custom server running on http://localhost:3000");
  });
});
*/

/*
Important Notes:
- Only needed for advanced use cases; default Next.js server is sufficient
  for most apps.
- Custom server disables automatic static optimization.
- Not recommended if deploying to Vercel serverless functions.
- Use middleware or API routes for most custom logic instead.
- Works with Pages Router; App Router encourages built-in APIs and edge functions.
*/

/*
Follow-up Questions + Answers:

Q1: What is a custom server in Next.js?
A1: A Node.js/Express/Koa server that replaces the default Next.js server
   for custom routing or middleware.

Q2: When should you use a custom server?
A2: Only for advanced routing, custom integrations, or server-side logic
   not supported by Next.js defaults.

Q3: What are the downsides?
A3: Disables automatic static optimization and Vercel serverless deployment.

Q4: Can you use API routes instead of a custom server?
A4: Yes, most custom logic can be handled via Next.js API routes or middleware.

Q5: Does it work with App Router?
A5: App Router encourages built-in features; custom server is mainly Pages Router.
*/
