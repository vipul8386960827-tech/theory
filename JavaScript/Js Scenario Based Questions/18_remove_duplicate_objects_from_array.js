/* 18_remove_duplicate_objects_from_array.js

=====================================================
Scenario: API returns duplicate users with the same id
=====================================================

The Question (how the interviewer asks it):
- "The API returns a list of users, but some users appear two or three times
   (same id). The UI shows duplicates and React warns about duplicate keys. How
   do you remove the duplicates?"

What the interviewer is checking:
- Do you know why new Set(array) does not work for objects?
- Can you de-duplicate by a key (id) using a Map or a Set of ids?
- Do you know the time complexity: filter + findIndex O(n^2) vs Map O(n)?
- Do you ask which duplicate to keep (first or last)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain why Set fails: Set compares objects by reference. Two objects with
   the same id are different objects, so both stay.
2. I decide the unique key, here user.id, and ask which copy to keep: the first
   one or the latest one (for example the newest data).
3. Keep LAST: new Map(users.map(u => [u.id, u])). A later entry overwrites the
   earlier one. Then take [...map.values()]. This is O(n).
4. Keep FIRST: use a Set of seen ids inside filter. Also O(n).
5. I mention filter + findIndex works but is O(n^2), which is slow for large
   lists (10,000 items means up to about 100 million checks).
6. I also tell the team to fix the real cause in the API if possible, and I
   still de-duplicate on the client as a safety net.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
  { id: 1, name: "Asha K" },
];

// Bug: Set works only for primitives / same references
console.log([...new Set(users)].length); // 3, nothing removed

// Works for primitives
console.log([...new Set([1, 2, 1])]); // [1, 2]

// Fix 1: Map by id, keeps LAST, O(n)
const lastWins = [...new Map(users.map((u) => [u.id, u])).values()];
// [{ id: 1, name: "Asha K" }, { id: 2, name: "Ravi" }]

// Fix 2: Set of seen ids, keeps FIRST, O(n)
const seen = new Set();
const firstWins = users.filter((u) => {
  if (seen.has(u.id)) return false;
  seen.add(u.id);
  return true;
});
// [{ id: 1, name: "Asha" }, { id: 2, name: "Ravi" }]

// Works but slow: O(n^2)
const slow = users.filter(
  (u, index) => users.findIndex((x) => x.id === u.id) === index
);

// Composite key when no single id exists
const byKey = (u) => `${u.email}|${u.country}`;

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "A Set does not help because it compares objects by reference. I de-duplicate
   by the id. If I want the last version I build a Map from id to user and take
   its values; if I want the first version I keep a Set of seen ids inside
   filter. Both are O(n). filter with findIndex also works but is O(n squared),
   so I avoid it for big lists."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using new Set(users) and thinking it removes duplicate objects.
- Using JSON.stringify(user) as the key. It breaks if key order or one extra field
  differs.
- Not asking which duplicate should win.
- Using the array index as the React key to hide the warning. It hides the bug
  and causes wrong UI updates.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does the Map approach keep the original order?
A1: Map keeps the order in which a key was FIRST inserted. Overwriting a key
    keeps its old position, so the order follows the first appearance.

Q2: How would you merge duplicates instead of dropping them?
A2: Use reduce or a loop with a Map: if the id exists, merge the objects, for
    example map.set(id, { ...map.get(id), ...user }).

Q3: Is there a built-in groupBy?
A3: Yes, Object.groupBy(users, u => u.id) and Map.groupBy (ES2024, Node 21+).
    They return groups of all items per key, which is useful to see duplicates.
*/
