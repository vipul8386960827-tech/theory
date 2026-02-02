/* 
28_closures.js – Interview-Ready Answer:

"A closure is a feature in JavaScript where an inner function has access to variables 
from its outer function, even after the outer function has finished executing. Everytime a function is created
in another function a closure is formed. It means that the innerfunction can access or has scope access of its 
own variables
,variables of the outer function or functions and also the global variables. The benifits of the closures are
1. They can Encapsulate the private variables, they can also help with memoization and cacheing they 
can be used as function factories. A function factory
is a function that returns new function based on the parameters  and
they also can be used with event handlers with the preserved state."
*/

//The given example shows encapsulation, memoization and functionFactories and also with the preserved states as addTo10 does not
//  maddle with addTo5
// it also has a drawback for the memory leak like if we dont need addTo5 anymore that cache is still in the 
// memory of the js  if there are multiple
// functions like this for like long running apps and all at that time this will just occupy space.
function memoizedAdder(addValue) {
  const cache = {};
  return function (num) {
    if (cache[num]) console.log(`From memoization:${cache[num]}`);
    else {
      const result = addValue + num;
      cache[num] = result;
      console.log(`From the calculations:${result}`);
    }
  };
}

const addTo5 = memoizedAdder(5);
const addTo10 = memoizedAdder(10);

addTo10(7);
addTo10(7);
addTo10(2);

addTo5(5);
addTo5(1);
addTo5(2);

addTo5 = null;//to prevent memory leak

/*
6️⃣ Follow-Up Interview Questions:

Q1: What is a closure in JavaScript?  
A1: A function that retains access to variables from its outer scope even after the outer function has executed.

Q2: Why are closures useful?  
A2: For data encapsulation, maintaining state, function factories, memoization, and private variables.

Q3: Can closures cause memory leaks?  
A3: Yes, if they reference large objects that are no longer needed, preventing garbage collection.

Q4: How is closure different from a normal function?  
A4: Normal function only accesses its own and global variables; closure accesses outer function variables even after execution.

Q5: Can closures be used with loops?  
A5: Yes, especially with `let` to capture the value per iteration and avoid classic closure-loop problems.
*/
