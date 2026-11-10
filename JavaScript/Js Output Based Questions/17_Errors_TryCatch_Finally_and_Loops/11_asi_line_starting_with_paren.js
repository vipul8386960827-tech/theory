/*
==========================================================================================
QUESTION 11: ASI - a line starting with ( after a line without semicolon
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

console.log('start')
const greet = 'Hello'
const result = greet
(function () {
  console.log('IIFE ran')
})()
console.log(result)

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
start
Uncaught TypeError: greet is not a function

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. ASI only inserts a semicolon at a line break when the next line CANNOT continue the
   current statement. A line starting with ( CAN continue it (as a function call), so
   no semicolon is inserted after `greet`.
2. The engine therefore reads:
       const result = greet(function () { ... })();
   i.e. "call greet with the function as an argument, then call the result".
3. 'start' is logged (line 1 is fine - the next line starts with `const`, which cannot
   continue it, so a semicolon is inserted there).
4. greet is the string 'Hello', and calling a string throws:
   TypeError: greet is not a function. 'IIFE ran' and console.log(result) never run.

KEY RULE: Without semicolons, a line beginning with ( [ ` + - / is glued to the previous
line. Either always use semicolons or start such lines with ; (e.g. ;(function(){})()).
COMMON MISTAKE: Answering start, IIFE ran, Hello.
FOLLOW-UP: The same trap with [ :
    const a = 1
    const b = a
    [1, 2].forEach(n => console.log(n))
-> parsed as a[1, 2].forEach(...) -> a[2] is undefined ->
   TypeError: Cannot read properties of undefined (reading 'forEach').
*/
