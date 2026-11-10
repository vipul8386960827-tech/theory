/*
==========================================================================================
QUESTION 5: The return value is skipped by for...of, spread and destructuring
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function* letters() {
  yield 'a';
  yield 'b';
  return 'c';
}

for (const v of letters()) {
  console.log(v);
}

console.log([...letters()].join(','));
console.log(Array.from(letters()).length);

const [x, y, z] = letters();
console.log(x, y, z);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
a
b
a,b
2
a b undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
for...of, spread (...), Array.from and array destructuring all consume an iterator the
same way: they call next() repeatedly and STOP as soon as they see done: true - and they
throw away the value of that final { value: 'c', done: true } result.

1. for...of logs 'a' and 'b'. The third next() returns { value: 'c', done: true }, so the
   loop ends without using 'c'.
2. [...letters()] -> ['a', 'b'] -> "a,b".
3. Array.from -> 2 elements.
4. Destructuring [x, y, z]: x = 'a', y = 'b', and for z the iterator is already done,
   so z = undefined.

KEY RULE: A generator's `return` value is only visible via a manual next() call (or as
the result of yield*). Iteration protocols ignore it.
COMMON MISTAKE: Answering a, b, c for the for...of loop.
FOLLOW-UP: How do you get 'c'? -> const g = letters(); g.next(); g.next();
g.next().value === 'c', or `const r = yield* letters()` inside another generator.
*/
