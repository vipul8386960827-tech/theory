/* 9_var_in_loop_gives_same_value.js

=====================================================
Scenario: Buttons created in a loop all alert the last index
=====================================================

The Question (how the interviewer asks it):
- "We create 3 buttons in a for loop. Each click should alert its own
  index (0, 1, 2). But every button alerts 3. Why, and how do you fix it?"

What the interviewer is checking:
- Do you understand closures: functions remember variables, not values?
- Do you know var is function-scoped and let is block-scoped?
- Do you know that let creates a new binding for each loop iteration?
- Can you show the old fix (IIFE) and explain why it works?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain: with var, there is only ONE variable i for the whole
   function. All 3 click handlers close over that same variable.
2. The handlers run later, when the user clicks. By then the loop has
   finished and i is 3 (the value that stopped the loop).
3. Fix 1 (best): use let. In a for loop, let creates a new i for every
   iteration, so each handler remembers its own value.
4. Fix 2 (old code, before ES6): an IIFE that receives i as a parameter.
   The parameter is a new variable for each call.
5. Fix 3: avoid the closure problem: forEach gives a new index for each
   call, or store the index on the element (data-index).
6. I mention the same bug with setTimeout in a loop (prints 3, 3, 3).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: every button alerts 3
for (var i = 0; i < 3; i++) {
  const btn = document.createElement("button");
  btn.textContent = `Button ${i}`;
  btn.addEventListener("click", () => alert(i)); // same i for all
  document.body.append(btn);
}

// FIX 1: let (new binding per iteration)
for (let i = 0; i < 3; i++) {
  const btn = document.createElement("button");
  btn.addEventListener("click", () => alert(i)); // 0, 1, 2
  document.body.append(btn);
}

// FIX 2: IIFE (pre-ES6 style)
for (var j = 0; j < 3; j++) {
  (function (index) {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => alert(index));
    document.body.append(btn);
  })(j);
}

// FIX 3: read the index from the element (also works with event delegation)
// btn.dataset.index = i;  ...  alert(event.currentTarget.dataset.index);

// Same bug with timers
for (var k = 0; k < 3; k++) setTimeout(() => console.log(k)); // 3 3 3
for (let k = 0; k < 3; k++) setTimeout(() => console.log(k)); // 0 1 2

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The click handlers are closures, and closures keep a reference to the
  variable, not a copy of the value. With var there is only one i for the
  whole loop, and when the user clicks, the loop is done and i is 3. With
  let, JavaScript creates a new i for each iteration, so each handler has
  its own value. In old code we fixed it with an IIFE that takes i as a
  parameter."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Saying "the closure stores the value". It stores a live reference to the
  variable.
- Saying the answer is 2. The loop stops when i becomes 3, so it is 3.
- Thinking const works in a classic for loop: for (const i = 0; ...; i++)
  throws TypeError on i++. const is fine in for...of.
- Not knowing why let works (per-iteration binding), only that it does.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What other way can you pass the value without a closure trick?
A1: Use setTimeout's extra arguments: setTimeout(console.log, 0, i), or
    fn.bind(null, i). Both pass the current value as an argument.

Q2: Is creating a listener per button a good idea for 1000 buttons?
A2: Better to use event delegation: one listener on the parent, then read
    event.target.closest("button").dataset.index. Less memory and it works
    for buttons added later.

Q3: What is the temporal dead zone?
A3: let and const are hoisted but not initialized. Using them before the
    declaration line throws ReferenceError. var is hoisted and set to
    undefined, so it gives undefined instead of an error.
*/
