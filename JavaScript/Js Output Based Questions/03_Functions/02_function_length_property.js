/*
==========================================================================================
QUESTION 2: Function length with default, rest and destructured parameters
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log((function (a, b, c) {}).length);
console.log((function (a, b = 2, c) {}).length);
console.log((function (a = 1, b, c) {}).length);
console.log((function (...args) {}).length);
console.log((function (a, b, ...rest) {}).length);
console.log(((a, { b }, [c]) => {}).length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
1
0
0
2
3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
fn.length counts the parameters BEFORE the first parameter that has a default value or
is a rest parameter. It represents "how many arguments the function expects".

1. (a, b, c)          -> 3 plain parameters -> 3
2. (a, b = 2, c)      -> counting stops at b (has a default) -> only a -> 1
                         (c is not counted even though it has no default)
3. (a = 1, b, c)      -> the very first one has a default -> 0
4. (...args)          -> rest parameters are never counted -> 0
5. (a, b, ...rest)    -> a, b -> 2
6. (a, {b}, [c])      -> destructuring patterns without defaults count as normal
                         parameters -> 3

KEY RULE: length = number of parameters before the first default or rest parameter.
COMMON MISTAKE: Answering 2 for case 2 (counting every parameter without a default), or counting rest parameters.
*/
