/*
==========================================================================================
QUESTION 8: Using a class before its declaration
Topic: Hoisting and TDZ   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function makeUser() {
  return new User("Sam");
}

console.log(typeof makeUser);

const u = new User("Alex");

class User {
  constructor(name) {
    this.name = name;
  }
}

console.log(u.name);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
function
ReferenceError: Cannot access 'User' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Creation phase:
  - `function makeUser` is fully hoisted.
  - `const u` is hoisted, uninitialized (TDZ).
  - `class User` is hoisted like let/const: the binding exists but is uninitialized
    until the class declaration line executes.

Execution phase:
  1. typeof makeUser -> "function".
  2. `new User("Alex")` runs BEFORE the class line has executed -> User is in its TDZ
     -> ReferenceError. The script stops.

Note: makeUser itself referencing User is fine - that reference is only resolved when
makeUser is CALLED. Calling makeUser() after the class line would work.

KEY RULE: Class declarations are hoisted but stay in the TDZ (like let/const) - unlike function declarations they cannot be used before the line that defines them.
COMMON MISTAKE: Treating classes like function declarations and answering "function", "Alex".
FOLLOW-UP: Move `const u = new User("Alex")` below the class? -> "function", "Alex".
*/
