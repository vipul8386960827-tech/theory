/*
==========================================================================================
QUESTION 11: break inside for...of over a generator
Topic: Generators and Iterators   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function* tasks() {
  try {
    console.log('open');
    yield 1;
    yield 2;
    yield 3;
    console.log('all done');
  } finally {
    console.log('finally');
  }
}

const it = tasks();
for (const t of it) {
  console.log('task', t);
  if (t === 2) break;
}
console.log('after loop');

for (const t of it) {
  console.log('second loop', t);
}
console.log(it.next().done);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
open
task 1
task 2
finally
after loop
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. for...of calls it.next() -> 'open' is logged, value 1 -> 'task 1'.
2. next() -> value 2 -> 'task 2', then `break`.
3. When a for...of loop exits early (break / return / throw), it calls it.return() on the
   iterator. The generator is paused inside try, so its finally block runs -> 'finally'.
   'all done' never runs and 3 is never produced.
4. 'after loop' is logged.
5. The generator is now closed, so the second for...of gets done: true immediately and
   logs nothing. it.next().done -> true.

KEY RULE: break in for...of = iterator.return() = the generator's finally runs and the
generator is closed. Great for cleanup (closing files/connections) in generators.
COMMON MISTAKE: Expecting the second loop to continue with 'second loop 3', or forgetting
that 'finally' is printed.
*/
