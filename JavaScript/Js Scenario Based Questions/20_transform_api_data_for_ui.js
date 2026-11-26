/* 20_transform_api_data_for_ui.js

=====================================================
Scenario: Transform flat API data into grouped UI data
=====================================================

The Question (how the interviewer asks it):
- "Our API returns a flat list of orders: { id, status, amount }. The UI needs
  them grouped by status (pending, shipped, cancelled), with a count and a
  total amount for each group. How would you write this transformation?"

What the interviewer is checking:
- Can I use reduce / Object.groupBy correctly, not just copy a one-liner.
- Do I keep the original API data unchanged (immutability).
- Do I write readable code that a teammate can maintain.
- Do I think about edge cases: empty list, unknown status, money precision.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. First I agree on the output shape with the UI, for example:
   { pending: { items: [...], count: 2, total: 150 }, shipped: {...} }.
2. I keep the transformation in a separate pure function (input -> output),
   so it is easy to unit test and does not touch the original array.
3. For grouping I use Object.groupBy (ES2024). It is supported in modern
   browsers and Node 21+. For older targets I use reduce or a polyfill.
4. Then I compute count and total for each group in a second, simple step.
   Two clear steps are better than one clever reduce that nobody can read.
5. I handle edge cases: empty array returns {}, missing status goes to
   "unknown", and I keep money in cents (integers) to avoid 0.1 + 0.2 issues.
6. If the keys are not strings (for example objects or dates), I use
   Map.groupBy, which returns a Map instead of a plain object.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const orders = [
  { id: 1, status: "pending", amountCents: 1000 },
  { id: 2, status: "shipped", amountCents: 2500 },
  { id: 3, status: "pending", amountCents: 500 },
];

// BUGGY: mutates the input objects and is hard to read
function groupBad(list) {
  return list.reduce((acc, o) => {
    o.label = o.status.toUpperCase();          // changes API data!
    (acc[o.status] = acc[o.status] || []).push(o);
    return acc;
  }, {});
}

// FIXED: pure, readable, two clear steps
function groupOrders(list) {
  const groups = Object.groupBy(list, (o) => o.status ?? "unknown");

  return Object.fromEntries(
    Object.entries(groups).map(([status, items]) => [
      status,
      {
        items,
        count: items.length,
        total: items.reduce((sum, o) => sum + o.amountCents, 0),
      },
    ])
  );
}

// Fallback without Object.groupBy (older browsers / Node < 21)
const groupBy = (list, keyFn) =>
  list.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would write a pure function that takes the API array and returns the
  shape the UI needs, without mutating the input. I group with
  Object.groupBy, or reduce as a fallback for older browsers, and then
  compute count and total per group in a separate map step. I keep money as
  integer cents and handle empty lists and unknown statuses. I prefer two
  readable steps over one clever one-liner, and I add a unit test for it."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Mutating the original objects inside reduce (adding fields, sorting in place
  with .sort() instead of .toSorted()).
- Writing one huge nested reduce that is impossible to read or debug.
- Forgetting the initial value in reduce, which breaks on an empty array.
- Doing the grouping inside the React render on every render, instead of
  memoizing (useMemo) or doing it once when data arrives.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does Object.groupBy return, and why is it not Array.prototype.groupBy?
A1: It returns a null-prototype object where each key holds an array of items.
    It became a static method because adding groupBy to arrays broke some old
    websites that already used that name.

Q2: When would you use Map.groupBy instead?
A2: When the keys are not strings, for example an object, a Date, or a number
    that must stay a number. A Map keeps the key type and the insertion order.

Q3: The list has 100,000 orders. Is your solution still fine?
A3: Yes, it is O(n) per step, so it is fast. If it is still slow I would do the
    grouping on the server, paginate, or move it into a Web Worker, and make
    sure it does not run again on every render.
*/
