/*
==========================================================================================
QUESTION 11: Tagged template literals
Topic: Destructuring, Spread and Rest   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function tag(strings, ...values) {
  console.log(JSON.stringify(strings));
  console.log(JSON.stringify(values));
  return "done";
}

const name = "Ann";
const age = 30;

const result = tag`Hello ${name}, you are ${age}!`;
console.log(result);

tag`${1}${2}`;

function raw(strings) {
  return strings.raw[0] + " | " + strings[0];
}
console.log(raw`a\tb`);

console.log(typeof tag`x`);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
["Hello ",", you are ","!"]
["Ann",30]
done
["","",""]
[1,2]
a\tb | a	b
["x"]
[]
string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
tag`...` calls the function tag WITHOUT parentheses. The arguments are:
  1st: an array of the literal string PIECES between the ${} holes
  rest: the evaluated ${} values, in order (here collected with ...values)
Whatever the tag function returns is the value of the whole expression -- it does NOT
have to be a string.

tag`Hello ${name}, you are ${age}!`
  strings -> ["Hello ", ", you are ", "!"]
  values  -> ["Ann", 30]   (values are NOT converted to strings; 30 stays a number)
  returns "done" -> result is "done"

tag`${1}${2}`
  There is always ONE more string than values: strings.length === values.length + 1.
  Before ${1}, between the holes, and after ${2} the text is empty -> ["", "", ""]
  values -> [1, 2]

raw`a\tb`
  strings[0]     -> the "cooked" string: \t is a real TAB character -> "a<TAB>b"
  strings.raw[0] -> the raw source text: backslash and t kept -> "a\tb"
  (This is how String.raw works.) The output line contains an actual tab character.

typeof tag`x`
  The call logs ["x"] and [] (no values), then returns "done" -> typeof "done" = "string"

KEY RULE: A tag function receives (stringsArray, ...values) with strings.length === values.length + 1, and its return value replaces the template.
COMMON MISTAKE: Expecting the strings array to contain the interpolated values, or forgetting the empty strings at the start/end.
FOLLOW-UP: What does String.raw`C:\new\folder` produce?  The literal text C:\new\folder -- escapes are not processed.
*/
