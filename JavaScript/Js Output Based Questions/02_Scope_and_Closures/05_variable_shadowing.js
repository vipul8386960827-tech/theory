/*
==========================================================================================
QUESTION 5: Variable shadowing across nested scopes
Topic: Scope and Closures   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

let a = 1;

function outer() {
  let a = 2;
  {
    let a = 3;
    console.log(a);
  }
  console.log(a);

  function inner() {
    a = 20;
    console.log(a);
  }
  inner();
  console.log(a);
}

outer();
console.log(a);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
2
20
20
1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
There are three different variables called `a`:
   global a = 1  |  outer's a = 2  |  block's a = 3

1. Inside the block, the nearest `a` is the block one -> 3.
2. After the block ends, its `a` is gone; the nearest is outer's a -> 2.
3. inner() has no own `a`, so `a = 20` walks up the scope chain and finds outer's a
   (the first one it meets), reassigning it to 20 -> prints 20.
4. Back in outer, its a is now 20 -> prints 20.
5. The global a was shadowed the whole time and never changed -> 1.

KEY RULE: Identifier lookup walks outward from the current scope and uses the FIRST matching binding; assignment without a declaration modifies that nearest binding.
COMMON MISTAKE: Thinking `a = 20` inside inner changes the global a, or creates a new local variable.
*/
