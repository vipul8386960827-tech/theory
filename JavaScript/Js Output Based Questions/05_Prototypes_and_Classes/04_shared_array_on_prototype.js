/*
==========================================================================================
QUESTION 4: Shared reference values on the prototype
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function Team() {}
Team.prototype.members = [];
Team.prototype.count = 0;

const a = new Team();
const b = new Team();

a.members.push("Ann");
a.count++;

console.log(JSON.stringify(b.members));
console.log(b.count, a.count);

a.members = ["Bob"];
console.log(JSON.stringify(a.members), JSON.stringify(b.members));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
["Ann"]
0 1
["Bob"] ["Ann"]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `a.members.push("Ann")` is a READ of a.members (found on Team.prototype) followed by
   a mutation of that array. No own property is created on a. The ONE shared array on
   the prototype now holds "Ann" -> b sees it too -> ["Ann"].
2. `a.count++` is `a.count = a.count + 1`: it reads 0 from the prototype, then WRITES
   1 as an OWN property on a. The prototype's count stays 0 -> b.count 0, a.count 1.
3. `a.members = ["Bob"]` is an assignment -> creates an own property on a, shadowing
   the prototype array. b still reads the shared one -> ["Bob"] ["Ann"].

KEY RULE: Mutating an inherited object/array affects every instance; assigning creates an own property only on that instance. Put per-instance data in the constructor, methods on the prototype.
COMMON MISTAKE: Expecting b.members to be [] (thinking each instance gets its own copy) or b.count to be 1.
*/
