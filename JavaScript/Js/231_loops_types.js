/* 231_loops_types.js

=====================================================
Loops in JavaScript – Types & Interview-Ready Answer
=====================================================

Definition:
- "Loops in JavaScript are used to execute a block of code 
   repeatedly based on a condition or over a collection of data."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **for loop**  
   - Traditional loop with initialization, condition, and increment.  
   - Example: `for (let i = 0; i < 5; i++) { ... }`

2. **while loop**  
   - Executes as long as a condition is true.  
   - Example: `while (count < 5) { ... }`

3. **do...while loop**  
   - Executes block at least once, then checks condition.  
   - Example: `do { ... } while (condition);`

4. **for...in loop**  
   - Iterates over enumerable property names of an object.  
   - Example:  
     ```js
     const obj = {a:1,b:2};
     for (let key in obj) console.log(key, obj[key]);
     ```

5. **for...of loop**  
   - Iterates over iterable objects like arrays, strings, Maps, Sets.  
   - Example:  
     ```js
     const arr = [1,2,3];
     for (let value of arr) console.log(value);
     ```

6. **Array iteration methods**  
   - `forEach`, `map`, `filter`, `reduce`, etc., offer functional loop alternatives.

-----------------------------------------------------
Examples:

// for loop
for (let i = 0; i < 3; i++) {
  console.log("for:", i);
}

// while loop
let j = 0;
while (j < 3) {
  console.log("while:", j);
  j++;
}

// do...while loop
let k = 0;
do {
  console.log("do...while:", k);
  k++;
} while (k < 3);

// for...in loop
const obj = {x:1, y:2};
for (let key in obj) {
  console.log(key, obj[key]);
}

// for...of loop
const arr = ["a","b","c"];
for (let val of arr) {
  console.log(val);
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `for` → fixed number of iterations  
- `while` → condition-checked, may run 0 times  
- `do...while` → executes at least once  
- `for...in` → iterates object keys  
- `for...of` → iterates iterable values  
- Array methods → functional, more readable, avoids manual index handling  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- `for` → counting items in a fixed list  
- `while` → keep doing task until condition met  
- `do...while` → try at least once, then continue if needed  
- `for...in` → check all labeled boxes  
- `for...of` → take each item from a bag one by one  

-----------------------------------------------------
Example / Usage:

const numbers = [10, 20, 30];
for (let num of numbers) {
  console.log(num * 2); // 20, 40, 60
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `for...in` and `for...of`?  
A1: `for...in` iterates keys; `for...of` iterates values of iterables.  

Q2: When to use `do...while` instead of `while`?  
A2: When you want the block to execute at least once.  

Q3: Are array iteration methods faster than loops?  
A3: Not necessarily; loops are sometimes faster, but methods improve readability.  

Q4: Can `for...in` be used for arrays?  
A4: Yes, but it iterates indices as strings and may include inherited properties.  

Q5: Which loop should be used for asynchronous operations?  
A5: Avoid `forEach`; use `for...of` with `async/await` for sequential async handling.  
*/
