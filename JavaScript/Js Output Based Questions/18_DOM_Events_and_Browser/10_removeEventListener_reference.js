/*
==========================================================================================
QUESTION 10: removeEventListener with a different function reference
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <button id="btn">Click</button>

Assume the user clicks the button once.
What will be the output of the following code?
*/

const btn = document.getElementById('btn');

// 1) anonymous function
btn.addEventListener('click', () => console.log('A'));
btn.removeEventListener('click', () => console.log('A'));

// 2) named function added twice
function handlerB() { console.log('B'); }
btn.addEventListener('click', handlerB);
btn.addEventListener('click', handlerB);

// 3) bind creates a new function each time
const obj = { name: 'C', log() { console.log(this.name); } };
btn.addEventListener('click', obj.log.bind(obj));
btn.removeEventListener('click', obj.log.bind(obj));

// 4) same reference -> removal works
function handlerD() { console.log('D'); }
btn.addEventListener('click', handlerD);
btn.removeEventListener('click', handlerD);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A
B
C

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
removeEventListener only removes a listener if you pass the SAME function reference
(plus the same type and the same capture flag).

1. The two arrow functions look identical but are two different function objects. The
   removal finds no match -> 'A' still logs.
2. Adding the exact same function (same type, same capture) twice is ignored the second
   time - duplicates are not registered -> 'B' logs only once.
3. Every .bind() call returns a NEW function. The removal passes a different bound
   function -> nothing removed -> 'C' logs.
4. handlerD is removed with the same reference -> it never logs.

KEY RULE: Keep a reference to the exact function you added (e.g. store the bound
function in a variable) if you need to remove it later.
COMMON MISTAKE: Expecting A and C to be removed, or expecting 'B' to log twice.
FOLLOW-UP: btn.addEventListener('click', handlerD, true);
           btn.removeEventListener('click', handlerD);
-> NOT removed: the capture flag is part of the identity (true vs false).
*/
