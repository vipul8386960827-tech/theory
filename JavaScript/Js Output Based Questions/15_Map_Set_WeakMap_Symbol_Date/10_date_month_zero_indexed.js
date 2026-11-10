/*
==========================================================================================
QUESTION 10: Date months are 0-indexed
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const d = new Date(2024, 1, 15);

console.log(d.getFullYear());
console.log(d.getMonth());
console.log(d.getDate());
console.log(d.getDay());

const d2 = new Date(2024, 12, 1);
console.log(d2.getFullYear(), d2.getMonth());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2024
1
15
4
2025 0

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. new Date(year, monthIndex, day) - the month is 0-based: 0 = January, 1 = February ...
   11 = December. So new Date(2024, 1, 15) is 15 FEBRUARY 2024 (local time).
2. getFullYear() -> 2024.
3. getMonth() returns the 0-based month again -> 1 (February).
4. getDate() is the day of the month (1-based!) -> 15.
5. getDay() is the day of the WEEK, 0 = Sunday ... 6 = Saturday. 15 Feb 2024 was a
   Thursday -> 4.
6. Month 12 does not exist, so it overflows into the next year: new Date(2024, 12, 1)
   is 1 January 2025 -> 2025 0.

KEY RULE: Month is 0-based (0-11), but day of month is 1-based (1-31). getDay() is the
weekday, getDate() is the day of the month.
COMMON MISTAKE: Thinking new Date(2024, 1, 15) is January 15, or mixing up getDay() and
getDate().
FOLLOW-UP: How to display "02" for February? -> String(d.getMonth() + 1).padStart(2, '0').
*/
