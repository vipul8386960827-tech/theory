/*
==========================================================================================
QUESTION 2: Default sort is lexicographic
Topic: Arrays   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(JSON.stringify([10, 1, 5, 100, 25].sort()));
console.log(JSON.stringify([10, 1, 5, 100, 25].sort((a, b) => a - b)));
console.log(JSON.stringify([-1, -2, 3, -10].sort()));
console.log(JSON.stringify(["banana", "Apple", "cherry", "apple"].sort()));
console.log(String([undefined, 3, null, 1].sort()));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,10,100,25,5]
[1,5,10,25,100]
[-1,-10,-2,3]
["Apple","apple","banana","cherry"]
1,3,,

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Without a compare function, sort() converts every element to a STRING and compares the
strings by UTF-16 code units (dictionary order), character by character.

[10, 1, 5, 100, 25].sort()
  As strings: "10", "1", "5", "100", "25"
  "1" < "10" < "100" (a prefix comes first) < "25" < "5" ("2" < "5")
  -> [1, 10, 100, 25, 5]

.sort((a, b) => a - b)
  Numeric comparator: negative -> a first, positive -> b first -> [1, 5, 10, 25, 100]

[-1, -2, 3, -10].sort()
  Strings "-1", "-2", "3", "-10". "-" (code 45) comes before "3" (code 51).
  Among "-1", "-10", "-2": "-1" is a prefix of "-10", then "-2".
  -> [-1, -10, -2, 3]

["banana", "Apple", "cherry", "apple"].sort()
  Uppercase letters (A = 65) come before lowercase (a = 97) -> "Apple" first.
  -> ["Apple", "apple", "banana", "cherry"]
  (Use a.localeCompare(b) for human-friendly ordering.)

[undefined, 3, null, 1].sort()
  undefined values are ALWAYS moved to the end, without calling the comparator.
  null becomes "null", which sorts after "1" and "3" -> [1, 3, null, undefined]
  String() of that array is "1,3,," (join prints null and undefined as empty strings).

KEY RULE: arr.sort() without a comparator sorts as strings. For numbers always use (a, b) => a - b.
COMMON MISTAKE: Answering [1, 5, 10, 25, 100] for the plain sort().
FOLLOW-UP: How do you sort descending?  (a, b) => b - a.
*/
