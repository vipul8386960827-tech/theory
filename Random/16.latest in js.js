/*
====================================
LATEST JAVASCRIPT FEATURES
(ES2023, ES2024, ES2025+)
====================================

1. ARRAY FINDING METHODS
------------------------

findLast()
- Finds last element matching condition

findLastIndex()
- Finds index of last matching element

Example:
const arr = [1, 2, 3, 4, 5];

arr.findLast(n => n % 2 === 0); 
// 4


2. ARRAY COPYING METHODS (IMMUTABLE)
------------------------------------
(New methods that DO NOT mutate original array)

toSorted()
- like sort() but returns new array

toReversed()
- like reverse() but returns new array

toSpliced()
- like splice() but immutable

with()
- replaces element at index

Example:
const arr = [3, 1, 2];

arr.toSorted(); 
// [1, 2, 3] (original unchanged)


3. OBJECT.groupBy()
-------------------
- Groups array items into object based on condition

Example:
Object.groupBy([1,2,3,4], n => n % 2 === 0 ? "even" : "odd")

// {
//   odd: [1,3],
//   even: [2,4]
// }


4. MAP.groupBy()
----------------
- Same as Object.groupBy but returns Map

Better when:
- keys are complex (objects, etc.)


5. TOP-LEVEL AWAIT
------------------
- You can use await outside async functions

Example:
const data = await fetch("api");

Benefits:
- Cleaner async code in modules


6. SYMBOLS AS WEAKMAP KEYS
--------------------------
- Now Symbols can be used as WeakMap keys

Before:
- Only objects allowed


7. ERROR CAUSE (BETTER DEBUGGING)
---------------------------------
- Add original cause to error

Example:
throw new Error("Something failed", { cause: originalError });

Benefits:
- Better debugging and tracing


8. TEMPORAL API (UPCOMING BIG FEATURE)
--------------------------------------
- Modern replacement for Date()

Problems with Date():
- confusing, inconsistent

Temporal solves:
- time zones
- formatting
- safer date handling

Example:
Temporal.Now.plainDateISO();

(Note: still not fully adopted everywhere)


9. DECORATORS (ES2024)
----------------------
- Used to modify classes/functions

Common in:
- frameworks (Angular, etc.)

Example:
@log
class User {}

Benefits:
- cleaner abstraction


10. IMPORT ATTRIBUTES
---------------------
- Control how modules are imported

Example:
import data from "./file.json" with { type: "json" };

Benefits:
- more control over module loading


11. REGEXP IMPROVEMENTS
-----------------------
- Better matching and flags
- More powerful pattern handling


====================================
INTERVIEW SUMMARY (SHORT)
====================================
- JavaScript is focusing on:
    1. Immutability (toSorted, toReversed)
    2. Better data grouping (groupBy)
    3. Simpler async (top-level await)
    4. Better debugging (error cause)
    5. Modern date handling (Temporal)
    6. Cleaner abstractions (decorators)

*/
