/*
==========================================================================================
QUESTION 10: Getters + closures + destructuring/spread/JSON
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function createCounter() {
  let count = 0;
  return {
    get value() {
      return ++count;
    },
    reset() {
      count = 0;
    },
  };
}

const c = createCounter();
console.log(c.value, c.value);

const { value } = c;
console.log(value, value);

c.reset();
console.log(c.value);

const copy = { ...c };
console.log(copy.value, copy.value);

console.log(JSON.stringify(c));
console.log(c.value);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 2
3 3
1
2 2
{"value":3}
4

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`count` is a private variable in the closure; the getter increments it on EVERY read.

1. c.value, c.value -> two reads -> 1 and 2.
2. const { value } = c reads the getter ONCE (count becomes 3) and stores the plain
   number 3 in a variable. Reading the variable twice doesn't call anything -> 3 3.
3. reset() sets count = 0 through the same closure. c.value -> 1.
4. Spread { ...c } copies properties by READING them: the getter runs once (count 2)
   and copy gets a normal DATA property value: 2 (not a getter) -> 2 2.
   (reset is also copied, as a normal function that still closes over the same count.)
5. JSON.stringify also reads the getter -> count 3 -> {"value":3}. reset is a function,
   so JSON skips it.
6. c.value -> 4 (the closure kept counting through all those reads).

KEY RULE: A getter is code that runs on every property read. Destructuring, spread,
Object.assign and JSON.stringify all READ the property, so they trigger the getter once
and store a plain value.
COMMON MISTAKE: Expecting `value` (the destructured variable) or copy.value to keep
incrementing, or forgetting that JSON.stringify/spread also bumped the counter.
*/
