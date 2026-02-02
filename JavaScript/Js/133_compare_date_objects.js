/* 133_compare_date_objects.js

=====================================================
Comparing Date Objects in JavaScript
=====================================================

Definition:
- In JavaScript, `Date` objects represent points in time.
- Two Date objects are **not equal** using `===` or `==` because they are reference types.
- To compare dates, we convert them to timestamps (milliseconds) or use date methods.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Direct Comparison
   - `new Date("2025-01-01") === new Date("2025-01-01")` → false
   - Reason: Different objects in memory.

2. Convert to Timestamp
   - Use `getTime()` to compare numeric time values.
   - `date1.getTime() === date2.getTime()` → true if they represent the same instant.

3. Compare Components
   - Compare year, month, day individually:
     ```
     date1.getFullYear() === date2.getFullYear() &&
     date1.getMonth() === date2.getMonth() &&
     date1.getDate() === date2.getDate()
     ```
   - Useful when ignoring time.

4. Libraries
   - Use libraries like **moment.js**, **date-fns**, or **luxon** for more robust date comparisons.

-----------------------------------------------------
Example:
-----------------------------------------------------
const date1 = new Date("2025-01-01");
const date2 = new Date("2025-01-01");

console.log(date1 === date2); // false
console.log(date1.getTime() === date2.getTime()); // true

// Compare only date part
console.log(
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()
); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of two identical clocks bought at different stores.
- They show the same time (value) but are separate objects (references), so `===` fails.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why can't we compare Date objects directly with `===`?  
A1: Because they are reference types; `===` checks reference, not value.

Q2: How can you compare only the date ignoring time?  
A2: Use `getFullYear()`, `getMonth()`, `getDate()` or format strings like `toDateString()`.

Q3: How do libraries like moment.js simplify date comparisons?  
A3: They provide built-in methods like `isSame()`, `isBefore()`, `isAfter()` to compare dates safely.

Q4: What is the difference between `Date.now()` and `new Date().getTime()`?  
A4: Both return the timestamp in milliseconds, but `Date.now()` is a static method.
*/
