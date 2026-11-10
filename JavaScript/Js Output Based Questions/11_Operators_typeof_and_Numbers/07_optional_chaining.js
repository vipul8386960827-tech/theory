/*
==========================================================================================
QUESTION 7: Optional chaining ?.
Topic: Operators, typeof and Numbers   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const user = {
  profile: { name: "Ann" },
  greet() {
    return "hi";
  },
};

console.log(user?.profile?.name);
console.log(user.address?.city);
console.log(user.address?.city.toUpperCase());
console.log(user.greet?.());
console.log(user.bye?.());
console.log(user.list?.[0]);

let count = 0;
const nothing = null;
nothing?.[count++];
console.log(count);

try {
  console.log(user.address.city);
} catch (e) {
  console.log(e.name + ": " + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Ann
undefined
undefined
hi
undefined
undefined
0
TypeError: Cannot read properties of undefined (reading 'city')

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
a?.b means: if a is null or undefined, stop and return undefined; otherwise do a.b.

user?.profile?.name                -> "Ann"
user.address?.city                 -> user.address is undefined -> undefined
user.address?.city.toUpperCase()   -> SHORT-CIRCUIT: once ?. sees undefined, the REST of
                                      the chain (.city.toUpperCase()) is skipped entirely.
                                      No error -> undefined
user.greet?.()                     -> greet exists -> call it -> "hi"
user.bye?.()                       -> bye is undefined -> the call is skipped -> undefined
user.list?.[0]                     -> list is undefined -> undefined

nothing?.[count++]
  Because nothing is null, the whole rest of the expression is skipped, INCLUDING the
  evaluation of count++. So count stays 0.

user.address.city (no ?.)
  user.address is undefined, and reading a property of undefined throws a TypeError.
  (V8 message shown; Firefox says "user.address is undefined".)

KEY RULE: ?. only checks the value immediately to its LEFT for null/undefined, and when it short-circuits, everything after it in the same chain is not evaluated.
COMMON MISTAKE: Thinking user.address?.city.toUpperCase() throws because .toUpperCase() has no ?. -- short-circuiting skips the whole chain.
FOLLOW-UP: What about (user.address?.city).toUpperCase()?  The parentheses end the chain, so undefined.toUpperCase() throws a TypeError.
*/
