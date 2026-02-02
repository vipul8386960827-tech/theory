/* 60_cors */
/*
Key Points (Interviewer Keywords + Explanation):
1. CORS (Cross-Origin Resource Sharing) – Security feature
   that restricts browser requests from different origins.

2. Purpose – Prevents unauthorized access to resources
   from another domain while allowing legitimate cross-origin requests.

3. Implementation – In Next.js API routes, configure headers
   like `Access-Control-Allow-Origin`.

4. Use Cases – Fetching data from external APIs,
   connecting frontend (Next.js) to a backend on another domain.

5. Benefits – Enables secure cross-origin requests,
   avoids browser errors, and allows controlled sharing of resources.
*/

/*
Definition (Using Specific Terms):
CORS in Next.js controls which origins can access your API routes.
By setting HTTP headers such as `Access-Control-Allow-Origin`,
you define permitted domains, methods, and headers for cross-origin requests.
*/

/*
Code Example (Pages Router: pages/api/data.js):

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET") {
    res.status(200).json({ message: "Data fetched successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

/*
Code Example (App Router: app/api/data/route.js):

import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ message: "Data fetched successfully" });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
*/

/*
Important Notes:
- Use "*" to allow all origins or specify trusted domains.
- Can also control allowed methods and headers.
- Essential when frontend and backend are on different domains.
- Works with both Pages Router and App Router.
- Avoid using "*" in production for sensitive APIs.
*/

/*
Follow-up Questions + Answers:

Q1: What is CORS?
A1: Cross-Origin Resource Sharing, a mechanism that allows or restricts
   requests from other domains.

Q2: How do you enable CORS in Next.js API routes?
A2: Set headers like Access-Control-Allow-Origin, Methods, and Headers.

Q3: Difference between Pages Router and App Router for CORS?
A3: Pages Router uses res.setHeader; App Router uses response.headers.set.

Q4: Can you allow only specific domains?
A4: Yes, replace "*" with the allowed domain(s).

Q5: Why is CORS important?
A5: Prevents unauthorized cross-origin access while allowing legitimate requests.
*/
