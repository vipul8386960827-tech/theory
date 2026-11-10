/*
==========================================================================================
QUESTION 11: Date overflow - February 30 and day 0
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = new Date(2023, 1, 30);   // "Feb 30, 2023"
console.log(a.getMonth(), a.getDate());

const b = new Date(2024, 1, 30);   // "Feb 30, 2024" (leap year)
console.log(b.getMonth(), b.getDate());

const c = new Date(2024, 2, 0);    // "Mar 0, 2024"
console.log(c.getMonth(), c.getDate());

const d = new Date(2024, 0, 31);
d.setMonth(1);                      // set month to February
console.log(d.getMonth(), d.getDate());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2 2
2 1
1 29
2 2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript Dates do not throw on invalid day numbers - they ROLL OVER into the next or
previous month.

1. Feb 2023 has 28 days. Day 30 = 28 + 2 -> March 2 -> month 2, date 2.
2. Feb 2024 has 29 days (leap year). Day 30 = 29 + 1 -> March 1 -> 2 1.
3. Day 0 means "one day before day 1" -> the last day of the previous month.
   new Date(2024, 2, 0) = last day of February 2024 -> month 1, date 29.
4. d is Jan 31, 2024. setMonth(1) keeps the date 31 -> "Feb 31, 2024" -> overflows by
   2 days past Feb 29 -> March 2 -> 2 2. (A classic bug in "add one month" code.)

KEY RULE: Out-of-range date parts overflow into neighbouring months/years. Day 0 = last
day of the previous month (handy for "days in month": new Date(y, m + 1, 0).getDate()).
COMMON MISTAKE: Expecting an Invalid Date / error for Feb 30, or expecting setMonth(1)
on Jan 31 to give Feb 29.
*/
