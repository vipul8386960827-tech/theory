/*
==========================================================================================
QUESTION 11: Copying an array of objects
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const users = [{ name: "A" }, { name: "B" }];
const copy = [...users];

copy[0].name = "Changed";
copy[1] = { name: "Replaced" };
copy.push({ name: "New" });

console.log(JSON.stringify(users));
console.log(JSON.stringify(copy));

const mapped = users.map((u) => ({ ...u }));
mapped[0].name = "Only in mapped";
console.log(users[0].name);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[{"name":"Changed"},{"name":"B"}]
[{"name":"Changed"},{"name":"Replaced"},{"name":"New"}]
Changed

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
const copy = [...users]
  Creates a NEW array, but its elements are the SAME object references as in users.

copy[0].name = "Changed"
  copy[0] and users[0] are the same object -> MUTATION is visible in users.

copy[1] = { name: "Replaced" }
  REPLACES the slot in the copy array only. users[1] still points to { name: "B" }.

copy.push(...)
  Changes only the copy array's length/contents -> users still has 2 items.

So users = [{ "Changed" }, { "B" }] and copy = [{ "Changed" }, { "Replaced" }, { "New" }].

users.map((u) => ({ ...u }))
  Copies each OBJECT one level deep -> mapped[0] is a different object from users[0],
  so changing it doesn't affect users. users[0].name is still "Changed" (from before).

KEY RULE: Copying an array copies its slots; objects inside are shared. Changing a slot is isolated, mutating an element object is not.
COMMON MISTAKE: Expecting users[0].name to still be "A" because "we made a copy".
FOLLOW-UP: Does const sorted = [...users].sort(...) protect the original order?  Yes -- sort mutates only the new array; but the elements are still shared objects.
*/
