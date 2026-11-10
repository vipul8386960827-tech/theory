/*
==========================================================================================
QUESTION 10: Template literal conversions
Topic: Destructuring, Spread and Rest   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, 2, 3];
const obj = { a: 1 };

console.log(`${1 + 1}`);
console.log(`Array: ${arr}`);
console.log(`Object: ${obj}`);
console.log(`${null} and ${undefined}`);
console.log(`${[]}|${[null]}|${[1, [2, 3]]}`);
console.log(`a ${`b ${"c"}`} d`);
console.log(typeof `${42}`);
console.log(`line1
line2`.length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2
Array: 1,2,3
Object: [object Object]
null and undefined
||1,2,3
a b c d
string
11

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Each ${expression} is evaluated, then converted with ToString (hint "string").

`${1 + 1}`        -> the expression is evaluated first -> 2 -> "2"
`${arr}`          -> arr.toString() = arr.join(",") -> "1,2,3"
`${obj}`          -> Object.prototype.toString -> "[object Object]"
`${null}`         -> "null",  `${undefined}` -> "undefined"
                     (unlike [null].join(), which turns null into "")
`${[]}`           -> ""
`${[null]}`       -> join treats null as "" -> ""
`${[1, [2, 3]]}`  -> join flattens nested arrays via their own toString -> "1,2,3"
                     So the line is "" + "|" + "" + "|" + "1,2,3" -> "||1,2,3"
`a ${`b ${"c"}`} d` -> templates can be nested -> "a b c d"
typeof `${42}`    -> templates always produce a string
`line1<newline>line2`.length -> 5 + 1 (the newline is kept) + 5 = 11

KEY RULE: Template literals convert every interpolated value with String() semantics (toString first), and preserve newlines literally.
COMMON MISTAKE: Expecting `${obj}` to print the object's contents like console.log does, or `${arr}` to print "[1, 2, 3]".
FOLLOW-UP: How do you show the object's contents in a template?  `${JSON.stringify(obj)}` -> {"a":1}.
*/
