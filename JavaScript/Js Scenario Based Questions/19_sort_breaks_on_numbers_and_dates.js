/* 19_sort_breaks_on_numbers_and_dates.js

=====================================================
Scenario: sort() gives wrong order for numbers, dates and names
=====================================================

The Question (how the interviewer asks it):
- "[10, 1, 5].sort() returns [1, 10, 5]. Our table sorted by date or by name is
   also wrong, and after sorting, the original list in another component changed
   too. What is happening?"

What the interviewer is checking:
- Do you know default sort converts items to strings and compares UTF-16 order?
- Can you write a correct comparator for numbers, dates and strings?
- Do you know localeCompare for names (case, accents, numbers in text)?
- Do you know sort mutates the array, and toSorted (ES2023) does not?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the default: without a comparator, sort converts values to strings
   and compares them as text. "10" comes before "5" because "1" < "5".
2. For numbers I pass a comparator: (a, b) => a - b for ascending. A negative
   result means a comes first, positive means b comes first, 0 keeps the order.
3. For dates I compare timestamps: new Date(a.date) - new Date(b.date) or
   getTime(). Comparing ISO date strings works only if the format is the same.
4. For names I use a.name.localeCompare(b.name), or Intl.Collator for many items.
   Plain < and > are case-sensitive ("Z" comes before "a").
5. I explain that sort changes the original array. If the array is shared (props,
   state), I use toSorted() or [...arr].sort() to get a new array.
6. For multi-column sort, I chain comparators with ||.

-----------------------------------------------------
Code Example
-----------------------------------------------------
console.log([10, 1, 5].sort());               // [1, 10, 5]  (string order)
console.log([10, 1, 5].sort((a, b) => a - b)); // [1, 5, 10]

const users = [
  { name: "ravi", joined: "2024-03-10", age: 30 },
  { name: "Asha", joined: "2023-11-02", age: 25 },
  { name: "Ölaf", joined: "2024-01-15", age: 30 },
];

// Names: case and accent aware
const byName = users.toSorted((a, b) => a.name.localeCompare(b.name));

// Dates: newest first
const byDate = users.toSorted(
  (a, b) => new Date(b.joined) - new Date(a.joined)
);

// Multi-column: age ascending, then name
const byAgeThenName = users.toSorted(
  (a, b) => a.age - b.age || a.name.localeCompare(b.name)
);

// Bug: mutates the shared array (bad for React state/props)
// users.sort(...);
// Fix: toSorted (ES2023) or copy first
const sorted = [...users].sort((a, b) => a.age - b.age);

// Fast compare for large lists, with numbers inside text
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
["item10", "item2"].toSorted(collator.compare); // ["item2", "item10"]

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "By default sort compares items as strings, so 10 comes before 5. I always pass
   a comparator: a - b for numbers, date difference for dates, and localeCompare
   or Intl.Collator for names. Also sort mutates the original array, so for state
   or shared data I use toSorted from ES2023, or copy the array before sorting."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Returning a boolean from the comparator, like (a, b) => a > b. It must return a
  negative, zero or positive number; a boolean gives wrong results.
- Sorting date strings in a format like "10/03/2024" as text.
- Calling sort on React state or props directly, so the state is mutated.
- Writing a - b for strings. The result is NaN, so the order is wrong.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is Array.prototype.sort stable?
A1: Yes, since ES2019 it must be stable: items that compare as equal keep their
    original order. This makes multi-step sorting reliable.

Q2: Where do undefined values go?
A2: Default sort and sort with a comparator always move undefined to the end,
    and the comparator is not called for them. Holes in sparse arrays also go last.

Q3: What other ES2023 non-mutating methods exist?
A3: toReversed(), toSpliced() and with(index, value). They return a new array
    and leave the original unchanged, like toSorted().
*/
