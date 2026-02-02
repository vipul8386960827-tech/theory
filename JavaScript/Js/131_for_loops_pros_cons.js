/* 131_for_loops_pros_cons.js

=====================================================
Pros and Cons of Using `for` Loops in JavaScript
=====================================================

Definition:
The `for` loop is a traditional looping construct in JavaScript, 
used to execute a block of code a specific number of times or 
iterate over arrays and objects (when combined with indices).

-----------------------------------------------------
Pros of `for` Loops:
-----------------------------------------------------
1. **Fine-grained control**
   - Full access to loop index, condition, and increment/decrement.
   - Example: `for (let i = 0; i < arr.length; i++) { ... }`

2. **Performance**
   - Often faster than higher-order methods (`map`, `forEach`) 
     because it avoids function calls.

3. **Flexibility**
   - Can count up or down, skip values, break early, or continue conditionally.

4. **Widely supported**
   - Available in all JavaScript environments (old and modern).

-----------------------------------------------------
Cons of `for` Loops:
-----------------------------------------------------
1. **Verbosity**
   - Requires boilerplate (initialization, condition, increment).
   - Example: `for (let i = 0; i < arr.length; i++)`

2. **Readability**
   - Less expressive compared to `for...of`, `forEach`, or `map`.

3. **Error-prone**
   - Off-by-one errors are common (`i <= arr.length` vs `i < arr.length`).

4. **Not functional**
   - Unlike `map` or `filter`, `for` loops don’t return new arrays.
   - Must handle mutation manually.

-----------------------------------------------------
Examples:
-----------------------------------------------------
// Example 1: Standard for loop
const arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Example 2: Counting backwards
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}

// Example 3: Skipping values
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- A `for` loop is like **driving a manual car**:
  - You have full control (speed, gears).
  - But it requires more effort compared to automatic cars 
    (`map`, `forEach`).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: When would you prefer `for` over `map` or `forEach`?  
A1: When performance is critical, or when you need fine control 
    (breaking early, skipping, counting backwards).

Q2: What is the difference between `for`, `for...in`, and `for...of`?  
A2: 
   - `for`: general purpose, uses indices.
   - `for...in`: iterates over keys of an object.
   - `for...of`: iterates directly over iterable values.

Q3: Why are `for` loops considered imperative while `map` is declarative?  
A3: `for` loops tell **how** to iterate (step by step), 
    while `map` tells **what** to do with each element.

Q4: How can you avoid off-by-one errors in `for` loops?  
A4: Always use `i < arr.length` instead of `i <= arr.length`.
*/
