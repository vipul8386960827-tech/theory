/*
==========================================================================================
QUESTION 12: Destructuring primitives and computed keys
Topic: Destructuring, Spread and Rest   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const { length } = "hello";
console.log(length);

const [first, second] = "hi";
console.log(first, second);

const { toFixed } = 5;
console.log(typeof toFixed);

const key = "color";
const { [key]: myColor = "none" } = { color: "red" };
console.log(myColor);

const { 0: zero, length: len } = ["a", "b", "c"];
console.log(zero, len);

try {
  const { x } = null;
} catch (e) {
  console.log(e.name);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
5
h i
function
red
a 3
TypeError

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Object destructuring reads PROPERTIES. When the right side is a primitive (string,
number, boolean), it is temporarily boxed into its wrapper object (String, Number,
Boolean), so its properties and prototype methods can be read.

const { length } = "hello"
  -> new String("hello").length -> 5

const [first, second] = "hi"
  Array destructuring uses the ITERATOR. Strings are iterable -> "h", "i".

const { toFixed } = 5
  -> Number.prototype.toFixed is found through the prototype -> typeof "function"

const { [key]: myColor = "none" } = { color: "red" }
  Computed key: [key] means the property named by the value of key -> "color".
  It exists, so the default is not used -> "red".

const { 0: zero, length: len } = ["a", "b", "c"]
  Arrays are objects, so you can object-destructure their index keys and length
  -> "a" and 3.

const { x } = null
  null and undefined can NOT be boxed (they have no wrapper and no properties)
  -> TypeError: Cannot destructure property 'x' of 'null' as it is null.

KEY RULE: Object destructuring works on any value except null and undefined (primitives are boxed). Array destructuring requires an iterable.
COMMON MISTAKE: Expecting const { length } = "hello" to be an error or undefined.
FOLLOW-UP: What does const [a] = 5 do?  TypeError: 5 is not iterable -- numbers aren't iterable even though they can be boxed.
*/
