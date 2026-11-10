/*
==========================================================================================
QUESTION 9: yield* delegation and its return value
Topic: Generators and Iterators   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function* inner() {
  yield 'a';
  yield 'b';
  return 'inner-done';
}

function* outer() {
  yield 1;
  const result = yield* inner();
  console.log('result =', result);
  yield* [2, 3];
  yield* 'hi';
  yield inner;
}

const values = [...outer()];
console.log(values.length);
console.log(values.slice(0, 7).join(','));
console.log(typeof values[7]);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
result = inner-done
8
1,a,b,2,3,h,i
function

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `yield 1` -> 1.
2. `yield* inner()` delegates to another iterator: every value inner yields ('a', 'b')
   is passed straight out of outer. When inner finishes, its RETURN value 'inner-done'
   becomes the value of the whole `yield* inner()` expression (it is not yielded).
   -> logs 'result = inner-done' (this happens during the spread, before the other logs).
3. `yield* [2, 3]` - yield* works with ANY iterable -> 2, 3.
4. `yield* 'hi'` - a string is iterable -> 'h', 'i'.
5. `yield inner` (no star) yields the value itself - here the function object.
6. values = [1, 'a', 'b', 2, 3, 'h', 'i', inner] -> length 8; last one is a function.

KEY RULE: yield* iterable yields each item of the iterable; the expression's value is the
delegated generator's return value. Plain yield yields a single value as-is.
COMMON MISTAKE: Expecting 'inner-done' to appear in the values array, or thinking
yield* 'hi' yields the whole string 'hi'.
FOLLOW-UP: What does `yield inner()` (no star) yield? -> one generator object, not 'a','b'.
*/
