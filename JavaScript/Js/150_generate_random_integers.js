/* 150_generate_random_integers.js

=====================================================
Generating Random Integers in JavaScript
=====================================================

Definition:
- JavaScript provides `Math.random()` to generate pseudo-random
  floating-point numbers between 0 (inclusive) and 1 (exclusive).
- Can be used to generate random integers within a specific range.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Random Integer Between 0 and N-1
   - Example:
     const randomInt = Math.floor(Math.random() * 10); // 0 to 9
     console.log(randomInt);

2. Random Integer Between Min and Max (Inclusive)
   - Example:
     function getRandomInt(min, max) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }
     console.log(getRandomInt(5, 15)); // 5 to 15

3. Random Array Element
   - Example:
     const colors = ["red", "green", "blue"];
     const randomColor = colors[Math.floor(Math.random() * colors.length)];
     console.log(randomColor);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Generating random integers is like **rolling dice**:
  - You can control the range (number of sides) and pick results randomly.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why use `Math.floor()` with `Math.random()`?
A1: To convert the floating-point number into an integer.

Q2: How to generate random numbers without repetition?
A2: Shuffle the array or keep track of generated numbers.

Q3: Is `Math.random()` truly random?
A3: No, it is pseudo-random; suitable for most cases but not for cryptography.

Q4: For cryptographic randomness, what to use?
A4: Use `crypto.getRandomValues()` in browsers or `crypto` module in Node.js.

Q5: How to generate floating-point random numbers in a range?
A5: Multiply `Math.random()` by the range and add the minimum:
   Example: `Math.random() * (max - min) + min`.
*/
