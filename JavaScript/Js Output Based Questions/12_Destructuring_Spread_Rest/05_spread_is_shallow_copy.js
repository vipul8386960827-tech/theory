/*
==========================================================================================
QUESTION 5: Spread makes a SHALLOW copy
Topic: Destructuring, Spread and Rest   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const original = {
  name: "Alice",
  address: { city: "Delhi" },
  tags: ["admin"],
};

const copy = { ...original };

copy.name = "Bob";
copy.address.city = "Mumbai";
copy.tags.push("editor");

console.log(original.name);
console.log(original.address.city);
console.log(JSON.stringify(original.tags));
console.log(copy === original);
console.log(copy.address === original.address);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Alice
Mumbai
["admin","editor"]
false
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
{ ...original } creates a NEW top-level object and copies each property's VALUE.
For primitive values (like "Alice") the value itself is copied.
For objects/arrays the value is a REFERENCE, so the reference is copied -- both
objects now point to the SAME nested address object and the SAME tags array.

copy.name = "Bob"
  Changes only copy's own top-level property -> original.name is still "Alice".

copy.address.city = "Mumbai"
  copy.address is the same object as original.address -> original sees "Mumbai".

copy.tags.push("editor")
  Same shared array -> original.tags is ["admin", "editor"].

copy === original              -> false (different top-level objects)
copy.address === original.address -> true (shared nested object)

KEY RULE: Spread (and Object.assign, Array.from, slice) copy only ONE level deep. Nested objects are shared. Use structuredClone for a deep copy.
COMMON MISTAKE: Answering "Delhi" -- believing spread makes a full independent copy.
FOLLOW-UP: What if we did copy.address = { city: "Goa" }?  That REPLACES the reference in copy only, so original.address.city stays "Delhi".
*/
