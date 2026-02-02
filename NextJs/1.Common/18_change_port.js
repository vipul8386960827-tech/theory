/* 18_change_port */
/*
Key Points (Interviewer Keywords + Explanation):
1. Purpose – Change port to avoid conflicts with other local servers or apps.

2. Development Port – Can be set when running the dev server.

3. Methods – Change using CLI flag, environment variable, or package.json script.

4. Common Use Cases – Running multiple Next.js apps simultaneously,
   avoiding port conflicts with other services.

5. Temporary vs Permanent – CLI flag changes port temporarily;
   environment variable or package.json script can make it permanent.
*/

/*
Definition (Using Specific Terms):
Changing the port in Next.js allows the development server
to run on a different port than the default 3000.
This is useful when multiple servers are running locally
or when the default port is occupied.
*/

/*
Code Example (Usage):

// Using CLI flag (temporary)
npm run dev -- -p 4000
// App runs at http://localhost:4000

// Using environment variable (temporary or permanent)
PORT=5000 npm run dev
// App runs at http://localhost:5000

// Using package.json script (permanent)
"scripts": {
  "dev": "next dev -p 4000"
}
*/

/*
Important Notes:
- Changing the port does not affect production deployment.
- Restart dev server after changing port.
- Useful when multiple Next.js projects run simultaneously.
*/

/*
Follow-up Questions + Answers:

Q1: How to change the development port in Next.js?
A1: Use -p flag, PORT environment variable, or modify dev script in package.json.

Q2: Is changing port needed in production?
A2: Usually no, production port is controlled by hosting/server configuration.

Q3: Can you run multiple Next.js apps locally?
A3: Yes, by assigning different ports to each app.

Q4: Does the port change persist across sessions?
A4: Only if set in package.json script or environment variable permanently.

Q5: What is the default port if not changed?
A5: 3000
*/
