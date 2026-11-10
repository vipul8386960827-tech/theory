/*
==========================================================================================
QUESTION 4: Closure counters with private state
Topic: Scope and Closures   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const c1 = createCounter();
const c2 = createCounter();

c1.increment();
c1.increment();
c2.increment();

console.log(c1.getCount(), c2.getCount());
console.log(c1.count);

c1.count = 100;
console.log(c1.getCount());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2 1
undefined
2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Each call to createCounter() creates a brand-new scope with its own `count = 0`.
   The returned methods close over THAT scope.
     c1 -> scope A (count = 0)
     c2 -> scope B (count = 0)
2. c1.increment() twice -> scope A count = 2. c2.increment() once -> scope B count = 1.
3. getCount() values -> "2 1".
4. `c1.count` - `count` is a variable in the closure, NOT a property of the returned
   object, so the property lookup finds nothing -> undefined.
5. `c1.count = 100` just creates a new, unrelated property on the object. The private
   variable is untouched -> getCount() still returns 2.

KEY RULE: Each invocation of the outer function creates an independent closure scope; closure variables are private and unreachable as object properties.
COMMON MISTAKE: Answering "3 3" (thinking counters share state) or expecting c1.count to be 2 / to change the counter.
*/
