/*
==========================================================================================
QUESTION 2: return in try, finally changes the variable
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function getNumber() {
  let x = 1;
  try {
    console.log('try');
    return x;
  } finally {
    x = 2;
    console.log('finally, x =', x);
  }
}

function getObject() {
  const obj = { value: 1 };
  try {
    return obj;
  } finally {
    obj.value = 2;
  }
}

console.log(getNumber());
console.log(getObject().value);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
try
finally, x = 2
1
2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
getNumber():
1. 'try' is logged.
2. `return x` EVALUATES x right now (1) and remembers that value as the return value.
3. Before the function actually returns, finally runs: x = 2 and logs 'finally, x = 2'.
4. finally has no return of its own, so the remembered value 1 is returned.
   Changing x afterwards cannot change an already-computed primitive -> 1.

getObject():
5. `return obj` remembers the REFERENCE to the object.
6. finally mutates that same object (obj.value = 2).
7. The caller receives the reference and reads .value -> 2.

KEY RULE: The return expression is evaluated before finally runs. Primitives are frozen
at that moment; objects can still be mutated because only the reference was saved.
COMMON MISTAKE: Answering 2 for getNumber() (thinking finally's change affects the
result), or printing 1 before 'finally, x = 2'.
*/
