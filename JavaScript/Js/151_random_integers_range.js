/* 151_random_integers_range.js

=====================================================
Generating Random Integers in a Specific Range in JavaScript
=====================================================

Definition:
- Generate random integers between two values (inclusive)
  using `Math.random()`, `Math.floor()`, or `Math.ceil()`.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Random Integer Between min and max (Inclusive)
   - Example:
     function getRandomInt(min, max) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }
     console.log(getRandomInt(1, 10)); // 1 to 10

2. Random Integer Between min and max (Exclusive max)
   - Example:
     function getRandomIntExclusive(max) {
         return Math.floor(Math.random() * max);
     }
     console.log(getRandomIntExclusive(10)); // 0 to 9

3. Random Array Element
   - Example:
     const items = ["apple", "banana", "cherry"];
     const randomItem = items[Math.floor(Math.random() * items.length)];
     console.log(randomItem);

4. Using `Math.round()` (less uniform)
   - Example:
     function getRandomIntRound(min, max) {
         return Math.round(Math.random() * (max - min) + min);
     }
     // Not recommended due to uneven probability distribution

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Generating random integers in a range is like **rolling a dice with custom sides**:
  - You define the minimum and maximum values, then pick a number randomly.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between using `Math.floor()` and `Math.round()`?
A1: `Math.floor()` gives uniform distribution; `Math.round()` can bias endpoints.

Q2: Can you generate random negative integers?
A2: Yes, set `min` as a negative number in the formula.

Q3: How to generate multiple unique random integers in a range?
A3: Shuffle an array of numbers in the range and pick elements.

Q4: Is `Math.random()` secure for cryptography?
A4: No, use `crypto.getRandomValues()` for cryptographically secure random numbers.

Q5: Why add `(max - min + 1)` in the formula?
A5: To include both `min` and `max` values in the possible results.
*/
