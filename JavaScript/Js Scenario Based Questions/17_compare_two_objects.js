/* 17_compare_two_objects.js

=====================================================
Scenario: Check if form data changed; === always says false
=====================================================

The Question (how the interviewer asks it):
- "We want to enable the Save button only when the form data is different from
   the original data. But formData === original is always false, even when
   nothing changed. How do you compare them?"

What the interviewer is checking:
- Do you know === compares objects by reference, not by content?
- Can you write a simple recursive deepEqual?
- Do you know the JSON.stringify key-order trap and other limits?
- Do you pick a practical solution (shallow compare for flat forms)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain reference equality: two different objects are never ===, even with
   the same content. === is true only if both point to the same object.
2. For a flat form (only strings, numbers, booleans) a shallow compare is enough:
   same number of keys and every value is ===.
3. For nested data I write a recursive deepEqual: primitives with Object.is,
   arrays and objects by comparing keys and then each value recursively.
4. I explain why JSON.stringify(a) === JSON.stringify(b) is risky: key order
   matters, undefined is dropped, and Date, Map and Set are not handled well.
5. In a real project I may use a tested helper like lodash isEqual. I also
   normalize form values first (for example "5" vs 5, trimmed strings).

-----------------------------------------------------
Code Example
-----------------------------------------------------
const original = { name: "Vipul", age: 28, address: { city: "Delhi" } };
const formData = { name: "Vipul", age: 28, address: { city: "Delhi" } };

console.log(formData === original); // false (different references)

// JSON trap: same data, different key order
JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 }); // false

// Fix: recursive deepEqual (plain objects and arrays)
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;          // same primitive or same reference
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key])
  );
}

console.log(deepEqual(formData, original)); // true
formData.address.city = "Pune";
console.log(deepEqual(formData, original)); // false -> enable Save

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "=== on objects checks if they are the same reference, not the same content,
   so two separate objects are always false. For a flat form I compare key by key.
   For nested data I write a recursive deepEqual or use lodash isEqual. I avoid
   JSON.stringify for comparison, because key order changes the result and it
   ignores undefined and special types like Date, Map and Set."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using == and expecting it to compare content. It also compares references.
- Relying on JSON.stringify and getting false negatives because of key order.
- Only checking keys of a, not checking the key count, so extra keys in b are
  missed.
- Running a deep compare on huge objects on every keystroke without thinking
  about performance. A "dirty" flag per field can be cheaper.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use Object.is instead of === for primitives?
A1: Object.is(NaN, NaN) is true, while NaN === NaN is false. (Object.is also
    says +0 and -0 are different.) For a "did the value change" check this is
    usually what we want.

Q2: How does React compare props and state?
A2: React uses Object.is for state and a shallow comparison for React.memo
    props. That is why we create new objects when we update state.

Q3: How would you handle circular references in deepEqual?
A3: Keep a WeakMap (or a list) of pairs already being compared. If you see the
    same pair again, return true instead of recursing forever.
*/
