/* 15_copied_object_changes_original.js

=====================================================
Scenario: Changing the copy also changes the original object
=====================================================

The Question (how the interviewer asks it):
- "I copied a user object with { ...user }, changed copy.address.city, and the
   original user's city also changed. Why? How do you copy it correctly?"

What the interviewer is checking:
- Do you know objects are stored and copied by reference?
- Do you know the difference between shallow and deep copy?
- Do you know structuredClone and the limits of JSON.parse(JSON.stringify())?
- Can you do immutable updates (important for React / Redux state)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain that spread and Object.assign make a SHALLOW copy: only the top
   level is new. Nested objects and arrays are still the same references.
2. So copy.address and user.address point to the same object in memory. Changing
   one changes "both".
3. If I need a full independent copy, I use structuredClone(user). It is built in
   (browsers and Node 17+) and handles Date, Map, Set and circular references.
4. I mention JSON.parse(JSON.stringify(obj)) limits: it drops undefined and
   functions, turns Date into a string, loses Map/Set, and throws on circular
   references.
5. For state updates I prefer an immutable update: copy only the path I change,
   like { ...user, address: { ...user.address, city: "Pune" } }. It is faster
   and keeps unchanged parts shared.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const user = { name: "Vipul", address: { city: "Delhi" }, tags: ["dev"] };

// Bug: shallow copy
const copy = { ...user };
copy.name = "Amit";            // ok, top-level is new
copy.address.city = "Mumbai";  // changes user.address too!
console.log(user.address.city); // "Mumbai"

// Fix 1: deep copy with structuredClone
const deep = structuredClone(user);
deep.address.city = "Pune";
console.log(user.address.city); // still "Mumbai"

// Fix 2: immutable update (best for React/Redux state)
const updated = {
  ...user,
  address: { ...user.address, city: "Pune" },
  tags: [...user.tags, "js"],
};

// JSON trick limits
const data = { d: new Date(), fn() {}, u: undefined };
console.log(JSON.parse(JSON.stringify(data)));
// { d: "2026-...Z" }  -> date is a string, fn and u are gone

// structuredClone limit: functions and DOM nodes throw DataCloneError
// structuredClone({ fn() {} }); // DataCloneError

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Spread makes only a shallow copy. The top-level properties are copied, but
   nested objects are still shared by reference, so changing copy.address changes
   the original. For a real deep copy I use structuredClone. The JSON trick works
   only for plain data, because it loses dates, undefined, functions, Map and Set.
   For React state I do immutable updates and copy only the nested path I change."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Thinking const makes an object immutable. const only stops re-assignment.
- Using JSON.parse(JSON.stringify()) for everything, without knowing what it loses.
- Deep cloning a big state object on every update. It is slow and breaks
  memoization because every reference changes.
- Mutating state directly (state.items.push(x)) in React; the reference does not
  change, so the UI may not re-render.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does Object.freeze solve this?
A1: Only partly. Object.freeze is also shallow: nested objects can still change.
    You need a recursive "deep freeze" for full protection.

Q2: Which array methods mutate and which return a new array?
A2: push, pop, splice, sort, reverse mutate. map, filter, slice, concat, and the
    ES2023 methods toSorted, toReversed, toSpliced and with return new arrays.

Q3: How do libraries like Immer help?
A3: Immer lets you write code that looks like mutation on a draft, and it creates
    a new immutable object, copying only the changed paths (structural sharing).
*/
