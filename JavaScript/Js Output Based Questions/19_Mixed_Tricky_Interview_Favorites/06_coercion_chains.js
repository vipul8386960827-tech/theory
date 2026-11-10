/*
==========================================================================================
QUESTION 6: Type coercion chains
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log([] + {});
console.log([] == ![]);
console.log('5' - - '2');
console.log('5' + - '2');
console.log(true + true + '1');
console.log('1' + true + true);
console.log([1, 2] + [3]);
console.log(null + 1, undefined + 1);
console.log([0] == false, '' == 0, null == 0);
console.log(1 + '1' - 1);
console.log('b' + 'a' + +'a' + 'a');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[object Object]
true
7
5-2
21
1truetrue
1,23
1 NaN
true true false
10
baNaNa

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. [] + {}: both become strings: '' + '[object Object]' -> '[object Object]'.
2. [] == ![]: ![] is false ([] is truthy). Now [] == false -> both go to numbers:
   [] -> '' -> 0, false -> 0 -> 0 == 0 -> true.
3. '5' - - '2': -'2' is -2 (unary minus converts to number); '5' - (-2) -> 5 + 2 = 7.
4. '5' + - '2': -'2' is the number -2, but + with a string concatenates -> '5-2'.
5. true + true + '1': left to right: 1 + 1 = 2, then 2 + '1' -> '21'.
6. '1' + true + true: a string comes first, so it's concatenation all the way
   -> '1true' + true -> '1truetrue'.
7. [1, 2] + [3]: arrays become strings '1,2' and '3' -> '1,23'.
8. null -> 0 in arithmetic -> 1. undefined -> NaN -> NaN.
9. [0] == false: [0] -> '0' -> 0, false -> 0 -> true. '' == 0: '' -> 0 -> true.
   null == 0: special rule - null is only loosely equal to null/undefined -> false.
10. 1 + '1' = '11'; '11' - 1 = 10 (minus always converts to numbers).
11. +'a' is NaN, so 'b' + 'a' + NaN + 'a' -> 'baNaNa'.

KEY RULE: + concatenates if either side is a string (after objects are turned into
primitives); every other arithmetic operator converts to numbers. == with null only
matches null/undefined.
COMMON MISTAKE: Answering '52' for '5' - - '2', '4' for true + true + '1', or true for
null == 0.
*/
