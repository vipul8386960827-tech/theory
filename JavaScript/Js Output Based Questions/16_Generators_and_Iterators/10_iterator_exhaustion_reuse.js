/*
==========================================================================================
QUESTION 10: Reusing an exhausted generator object
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const it = gen();
console.log(`[${[...it]}]`);
console.log(`[${[...it]}]`);

for (const x of it) {
  console.log('never?', x);
}

console.log(it[Symbol.iterator]() === it);

const arr = [1, 2, 3];
console.log(`[${[...arr]}]`);
console.log(`[${[...arr]}]`);

console.log(`[${[...gen()]}]`);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2,3]
[]
true
[1,2,3]
[1,2,3]
[1,2,3]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. A generator object is BOTH an iterator and an iterable, and its [Symbol.iterator]()
   returns ITSELF (that's why `it[Symbol.iterator]() === it` is true).
2. The first spread consumes all values -> [1,2,3]. The generator is now done.
3. The second spread asks the same exhausted object again -> immediately done -> [].
4. The for...of loop also gets done: true right away -> the body never runs, nothing is
   logged.
5. Arrays are different: every spread calls arr[Symbol.iterator]() which creates a NEW
   array iterator starting at index 0 -> works every time.
6. Calling gen() again creates a brand-new generator object -> [1,2,3].

KEY RULE: Generator objects are one-shot. To iterate again, call the generator function
again (or make an iterable whose [Symbol.iterator] is the generator function).
COMMON MISTAKE: Expecting the second [...it] to print [1,2,3] like an array would.
*/
