/*
==========================================================================================
QUESTION 7: Infinite generator with a take() helper
Topic: Generators and Iterators   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

function* take(iterable, count) {
  let i = 0;
  for (const value of iterable) {
    yield value;
    if (++i === count) return;
  }
}

console.log(`[${[...take(naturals(), 3)]}]`);

const nums = naturals();
console.log(`[${[...take(nums, 3)]}]`);
console.log(`[${[...take(nums, 3)]}]`);
console.log(nums.next());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2,3]
[1,2,3]
[]
{ value: undefined, done: true }

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. naturals() is infinite, but it is lazy: it only produces a number when next() is
   called, so `while (true)` does not freeze the program.
2. take(naturals(), 3) yields 1, 2, 3 and then hits `return` -> spread stops -> [1,2,3].
   (Spreading naturals() directly would loop forever!)
3. Now the trap: we reuse the SAME iterator `nums`.
   - First take(nums, 3) -> [1,2,3]. But when take() does `return` from inside its
     for...of loop, the loop exits early, and for...of automatically calls
     nums.return(). That CLOSES the naturals generator for good.
   - Second take(nums, 3): the for...of calls nums.next() -> { done: true } immediately
     -> nothing is yielded -> [] (and NOT [4,5,6]).
4. nums.next() -> { value: undefined, done: true } - the generator is finished.

KEY RULE: Leaving a for...of early (break, return, throw) calls .return() on the
iterator, closing a generator permanently.
COMMON MISTAKE: Expecting the second take() to continue with [4,5,6].
FOLLOW-UP: How to make it continue? -> In take(), iterate manually with
iterable.next() instead of for...of, so the source iterator is not closed.
*/
