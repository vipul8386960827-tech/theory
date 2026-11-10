/*
==========================================================================================
QUESTION 11: Strings are immutable
Topic: Operators, typeof and Numbers   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

let str = "hello";
str[0] = "H";
console.log(str);

str.toUpperCase();
console.log(str);

str.length = 10;
console.log(str.length);

const upper = str.toUpperCase();
console.log(str, upper);

str = "H" + str.slice(1);
console.log(str);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
hello
hello
5
hello HELLO
Hello

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Strings are PRIMITIVE values and are immutable: no operation can change the characters
of an existing string.

str[0] = "H"
  You can READ characters by index, but writing to an index does nothing.
  In sloppy (non-strict) mode the write is silently ignored -> "hello".
  (In strict mode it throws TypeError: Cannot assign to read only property '0' of string.)

str.toUpperCase()
  String methods never modify the original; they RETURN a new string. The return value is
  discarded here, so str is still "hello".

str.length = 10
  length of a string is read-only -> silently ignored -> 5.

const upper = str.toUpperCase()
  Capturing the returned value: str is "hello", upper is "HELLO".

str = "H" + str.slice(1)
  The only way to "change" a string: build a NEW string and REASSIGN the variable.
  -> "Hello"

KEY RULE: String methods (toUpperCase, replace, trim, slice, ...) return new strings. Index assignment and length assignment on strings are ignored (or throw in strict mode).
COMMON MISTAKE: Answering "Hello" for the first log, assuming strings work like arrays of characters.
FOLLOW-UP: Does const s = "hi"; s.concat("!"); change s?  No. And it's not because of const -- even with let the string itself can't change.
*/
