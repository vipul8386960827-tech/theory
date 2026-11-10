/*
==========================================================================================
QUESTION 12: error.name, error.message and custom errors
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const e = new Error('Oops');
console.log(e.name);
console.log(e.message);
console.log(String(e));

try {
  null.prop;
} catch (err) {
  console.log(err.name, err instanceof TypeError, err instanceof Error);
}

try {
  notDefinedAnywhere;
} catch (err) {
  console.log(err.name);
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
const v = new ValidationError('bad input');
console.log(`${v}`);
console.log(v instanceof ValidationError, v instanceof Error);

try {
  throw 'just a string';
} catch (err) {
  console.log(typeof err, err.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Error
Oops
Error: Oops
TypeError true true
ReferenceError
ValidationError: bad input
true true
string undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. new Error('Oops'): name is 'Error' (inherited from Error.prototype), message is 'Oops'.
2. String(e) calls Error.prototype.toString -> `${name}: ${message}` -> 'Error: Oops'.
3. Reading a property of null throws a TypeError. TypeError extends Error, so both
   instanceof checks are true.
4. Using an undeclared variable throws a ReferenceError.
5. ValidationError sets this.name, so toString gives 'ValidationError: bad input'.
   It is an instance of both its own class and Error.
6. You can throw ANY value. Throwing a string means err is just that string - it has no
   .message property -> 'string undefined'.

KEY RULE: Error toString = "name: message". Built-in types: TypeError (wrong type / null
access / calling a non-function), ReferenceError (undeclared variable / TDZ),
SyntaxError, RangeError. Always throw Error objects, not strings.
COMMON MISTAKE: Expecting err.message to work for thrown strings, or answering
'TypeError' for the undeclared variable.
*/
