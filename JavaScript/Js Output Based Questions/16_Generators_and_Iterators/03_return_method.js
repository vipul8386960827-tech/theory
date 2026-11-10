/*
==========================================================================================
QUESTION 3: Ending a generator early with return()
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function* gen() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log('cleanup');
  }
}

const it = gen();
console.log(it.next());
console.log(it.return(99));
console.log(it.next());

const fresh = gen();
console.log(fresh.return('early'));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{ value: 1, done: false }
cleanup
{ value: 99, done: true }
{ value: undefined, done: true }
{ value: 'early', done: true }

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. it.next() runs to `yield 1` (inside the try) -> { value: 1, done: false }.
2. it.return(99) acts as if a `return 99` statement were placed where the generator is
   paused. Because it is paused inside try, the finally block runs first and logs
   'cleanup'. Then the generator finishes -> { value: 99, done: true }.
3. Once finished, next() always gives { value: undefined, done: true }.
4. fresh has never started (it is not inside the try yet), so return('early') finishes it
   immediately WITHOUT running the finally block -> just { value: 'early', done: true }.

KEY RULE: return(v) finishes the generator with { value: v, done: true }, running any
pending finally blocks. On a not-yet-started generator, no body code runs at all.
COMMON MISTAKE: Forgetting that finally runs on return(), or expecting 'cleanup' to be
printed for the generator that was never started.
FOLLOW-UP: If finally itself contains `yield 'x'`, it.return(99) returns
{ value: 'x', done: false } and the 99 comes out on the following next().
*/
