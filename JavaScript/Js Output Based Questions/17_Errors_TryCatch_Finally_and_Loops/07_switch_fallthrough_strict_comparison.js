/*
==========================================================================================
QUESTION 7: switch fall-through and strict comparison
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function test(x) {
  switch (x) {
    case 1:
      console.log('one');
    case '2':
      console.log('string two');
      break;
    case 2:
      console.log('number two');
    default:
      console.log('default');
    case 3:
      console.log('three');
  }
}

test(1);
console.log('---');
test(2);
console.log('---');
test('1');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
one
string two
---
number two
default
three
---
default
three

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Two rules: (1) switch compares with STRICT equality (===), (2) once a case matches,
execution "falls through" into the following cases until a break (or the end).

test(1):
- 1 === 1 matches `case 1` -> logs 'one'. No break, so it falls into `case '2'` (the
  label is NOT checked again) -> logs 'string two' -> break.

test(2):
- 2 === 1? no. 2 === '2'? no (strict!). 2 === 2? yes -> 'number two'.
- No break -> falls into default -> 'default' -> falls into case 3 -> 'three'.

test('1'):
- '1' matches nothing (not 1, not '2', not 2, not 3) -> jumps to default, even though
  default is written in the middle -> 'default', then falls through into case 3 ->
  'three'.

KEY RULE: switch uses ===; without break, code continues into the next case bodies;
default can be anywhere and also falls through.
COMMON MISTAKE: Thinking test(2) matches case '2' (loose comparison), or thinking
default stops execution / must be last.
*/
