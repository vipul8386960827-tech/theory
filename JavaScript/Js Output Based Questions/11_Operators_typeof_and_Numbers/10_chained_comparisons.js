/*
==========================================================================================
QUESTION 10: 1 < 2 < 3 and 3 > 2 > 1
Topic: Operators, typeof and Numbers   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
console.log(3 > 2 >= 1);
console.log(1 < 3 < 2);
console.log(5 > 4 > 3 > 2);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
false
true
true
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript has NO chained comparisons like math (or Python). Comparison operators are
left-associative, so a < b < c is (a < b) < c. The first comparison produces a BOOLEAN,
which is then converted to a number (true -> 1, false -> 0) for the next comparison.

1 < 2 < 3     -> (1 < 2) = true  -> true < 3  -> 1 < 3  -> true
3 > 2 > 1     -> (3 > 2) = true  -> true > 1  -> 1 > 1  -> false
3 > 2 >= 1    -> true >= 1 -> 1 >= 1 -> true
1 < 3 < 2     -> (1 < 3) = true  -> 1 < 2 -> true   (looks wrong, but it's "true")
5 > 4 > 3 > 2 -> ((5 > 4) > 3) > 2 -> (1 > 3) = false -> false > 2 -> 0 > 2 -> false

KEY RULE: a < b < c is evaluated as (a < b) < c, and the boolean result becomes 1 or 0. Write a < b && b < c.
COMMON MISTAKE: Reading 3 > 2 > 1 mathematically and answering true.
FOLLOW-UP: What does 1 < 2 < 3 give in Python?  True, because Python does support chained comparisons -- a good contrast to mention.
*/
