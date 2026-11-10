/*
==========================================================================================
QUESTION 1: Implicit binding and losing `this` when extracting a method
Topic: this Keyword   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

const user = {
  title: "Admin",
  getTitle() {
    return this.title;
  },
};

console.log(user.getTitle());

const extracted = user.getTitle;
console.log(extracted());

const other = { title: "Guest", getTitle: user.getTitle };
console.log(other.getTitle());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Admin
undefined
Guest

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
For regular functions, `this` is decided at CALL time by HOW the function is called,
not where it was defined.

1. user.getTitle() -> called as a method of user (implicit binding):
   this = user -> "Admin".
2. `const extracted = user.getTitle` copies only the function reference; the link to
   user is lost. extracted() is a plain call -> default binding: in non-strict mode
   this = the global object (window in browsers). The global object has no `title`
   property -> undefined.
3. other.getTitle() -> the SAME function, now called through `other` -> this = other
   -> "Guest".

KEY RULE: For a regular function, `this` is the object before the dot at call time; a plain call gets the global object (sloppy) or undefined (strict).
COMMON MISTAKE: Answering "Admin" for the extracted call - believing the method is permanently tied to the object it was defined in.
FOLLOW-UP: In strict mode, extracted() throws "TypeError: Cannot read properties of undefined (reading 'title')". Fix with `user.getTitle.bind(user)`.
*/
