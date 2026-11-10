/*
==========================================================================================
QUESTION 4: Creating a Set from a string
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(new Set('hello').size);
console.log([...new Set('hello')].join(''));
console.log(new Set(['hello']).size);
console.log([...new Set('aAbBaa')].join('-'));
console.log([...new Set('mississippi')].join(''));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
4
helo
1
a-A-b-B
misp

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. new Set(iterable) iterates over its argument. A string is iterable character by
   character, so new Set('hello') receives 'h', 'e', 'l', 'l', 'o'.
2. The duplicate 'l' is dropped -> {'h','e','l','o'} -> size 4.
3. A Set remembers INSERTION ORDER, so spreading it gives h, e, l, o -> "helo".
4. new Set(['hello']) iterates the ARRAY, which has one element (the whole string) -> 1.
5. Comparison is case-sensitive: 'a' and 'A' are different -> a-A-b-B.
6. 'mississippi' -> first appearances in order: m, i, s, p -> "misp".

KEY RULE: new Set(x) iterates x. A string is iterated per character; the order of first
insertion is preserved.
COMMON MISTAKE: Answering 1 for new Set('hello').size (thinking the string is stored as
a single value) or expecting the Set to be sorted.
FOLLOW-UP: What does new Set(123) do? -> Throws TypeError: number 123 is not iterable.
*/
