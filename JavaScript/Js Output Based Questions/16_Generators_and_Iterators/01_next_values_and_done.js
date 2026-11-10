/*
==========================================================================================
QUESTION 1: next() values and done
Topic: Generators and Iterators   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function* gen() {
  console.log('body started');
  yield 1;
  yield 2;
  return 3;
}

const g = gen();
console.log('generator created');

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
generator created
body started
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: true }
{ value: undefined, done: true }

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Calling gen() does NOT run the function body. It only creates a paused generator
   object. So 'generator created' prints first.
2. The 1st next() starts the body: logs 'body started', runs until `yield 1`, pauses and
   returns { value: 1, done: false }.
3. The 2nd next() resumes after `yield 1`, stops at `yield 2` -> { value: 2, done: false }.
4. The 3rd next() reaches `return 3`. A return finishes the generator, and the returned
   value comes out WITH done: true -> { value: 3, done: true }.
5. Any next() after that -> { value: undefined, done: true } forever.

KEY RULE: yield -> { value, done: false }; return -> { value, done: true }; after that
always { value: undefined, done: true }. The body starts only on the first next().
COMMON MISTAKE: Printing 'body started' before 'generator created', or expecting
{ value: 3, done: false } for the return statement.
*/
