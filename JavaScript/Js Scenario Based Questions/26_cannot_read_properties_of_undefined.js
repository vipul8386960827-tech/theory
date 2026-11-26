/* 26_cannot_read_properties_of_undefined.js

=====================================================
Scenario: Production crash "Cannot read properties of undefined (reading 'name')"
=====================================================

The Question (how the interviewer asks it):
- "Our error monitoring shows a crash in production: TypeError: Cannot read
  properties of undefined (reading 'name'). It works on your machine. How do
  you find the cause and fix it properly?"

What the interviewer is checking:
- Can I debug production errors: stack traces, source maps, monitoring tools.
- Do I understand WHY the data is undefined (API shape, timing, edge case).
- Do I use optional chaining and defaults correctly.
- Do I avoid hiding real bugs by putting ?. everywhere.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I read the error carefully: the object BEFORE .name is undefined. For
   user.profile.name, it means user.profile is undefined, not name.
2. I use the stack trace from the monitoring tool (Sentry, Datadog). With
   source maps uploaded, the minified line becomes the real file and line.
   I also check breadcrumbs: which page, which user action, which API call.
3. I find out why the value is undefined. Common reasons: the API returns a
   different shape for some users (field missing, null, empty array), the
   component renders before data has loaded, a typo in the property name,
   or an old cached API version.
4. I decide what is correct for the business: is the field truly optional?
   If yes, handle it with ?. and a default. If it must exist, it is a bug in
   the data and I should fail loudly and early, not show empty text.
5. I validate data at the boundary (where the API response enters the app),
   using a small check or a schema library like Zod, so the rest of the code
   can trust the shape.
6. I add a test with the bad data shape and an error boundary in the UI so
   one bad record does not crash the whole page.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: assumes every order has a customer
function renderOrder(order) {
  return `Order ${order.id} for ${order.customer.name}`;   // crash if no customer
}

// BAD FIX: hides the problem, shows "for undefined" and nobody notices
// return `Order ${order?.id} for ${order?.customer?.name}`;

// FIXED: decide what is optional, validate at the boundary
function parseOrder(raw) {
  if (!raw || typeof raw.id !== "number") {
    throw new Error(`Invalid order from API: ${JSON.stringify(raw)}`);
  }
  return {
    id: raw.id,
    // customer is optional by business rule (guest checkout)
    customerName: raw.customer?.name ?? "Guest",
    items: raw.items ?? [],
  };
}

async function loadOrders() {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.orders.map(parseOrder);   // the rest of the app trusts the shape
}

function renderOrderFixed(order) {
  return `Order ${order.id} for ${order.customerName}`;
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The error means the object before .name is undefined. I use the stack
  trace with source maps and the monitoring breadcrumbs to find the exact
  line and the data that caused it. Then I find why the data is missing:
  a different API shape, a loading state, or a typo. If the field is truly
  optional, I use optional chaining with a default. If it is required, I
  validate at the API boundary and fail clearly, instead of hiding the bug
  with ?. everywhere."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Adding ?. to every property access. The crash goes away, but the UI shows
  wrong or empty data and the real bug is hidden.
- Wrapping everything in try/catch and ignoring the error.
- Not uploading source maps, so production stack traces are unreadable.
- Not checking res.ok before res.json(); an error response has another shape.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between "x is not defined" and "Cannot read
    properties of undefined"?
A1: "x is not defined" is a ReferenceError: the variable does not exist at
    all. "Cannot read properties of undefined" is a TypeError: the variable
    exists but its value is undefined, and we tried to read a property on it.

Q2: Should source maps be public in production?
A2: Usually not. Upload them privately to the monitoring tool (Sentry) or
    serve them only internally, so the original source is not exposed.

Q3: The component crashes on first render but works after data loads. Fix?
A3: Handle the loading state explicitly: start with null and render a
    loading UI until data arrives, or start with a correct empty value like
    [] for lists. Do not render fields of data that is not loaded yet.
*/
