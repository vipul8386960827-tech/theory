/*
==========================================================================================
QUESTION 9: call vs apply vs bind (and partial application)
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const person = { firstName: "Ana" };

function greet(greeting, punctuation) {
  return greeting + ", " + this.firstName + punctuation;
}

console.log(greet.call(person, "Hi", "!"));
console.log(greet.apply(person, ["Hello", "?"]));

const bound = greet.bind(person, "Hey");
console.log(bound("."));
console.log(bound.length);
console.log(bound.name);

const max = Math.max.apply(null, [3, 9, 4]);
console.log(max);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Hi, Ana!
Hello, Ana?
Hey, Ana.
1
bound greet
9

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. call(thisArg, arg1, arg2, ...) invokes immediately with arguments listed one by one.
   this = person -> "Hi, Ana!"
2. apply(thisArg, [args]) invokes immediately with arguments in an ARRAY.
   -> "Hello, Ana?"
3. bind(thisArg, ...presetArgs) does NOT invoke. It returns a new function with `this`
   permanently set to person and "Hey" pre-filled as the first argument (partial
   application). bound(".") -> greet.call(person, "Hey", ".") -> "Hey, Ana."
4. bound.length = original length (2) minus number of preset args (1) -> 1.
5. A bound function's name is "bound " + original name -> "bound greet".
6. apply spreads an array as arguments: Math.max(3, 9, 4) -> 9 (`this` is irrelevant
   for Math.max, so null is passed).

KEY RULE: call/apply invoke immediately (comma args vs array); bind returns a new function with fixed this and optional preset args.
COMMON MISTAKE: Thinking bind calls the function, or forgetting that preset arguments reduce the bound function's length.
*/
