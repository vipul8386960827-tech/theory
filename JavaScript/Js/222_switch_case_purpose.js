/* 222_switch_case_purpose.js

=====================================================
Switch-Case Statement in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The switch-case statement is a control flow structure that allows 
  executing different blocks of code based on the value of an expression. 
  It is an alternative to multiple if-else statements."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Evaluates an expression once and matches it against case values.
- Each case has code to execute if matched.
- 'break' prevents fall-through to the next case.
- 'default' case executes if no match is found.
- Cleaner and more readable for multiple discrete conditions.

-----------------------------------------------------
Examples:

// Basic switch-case
const day = 3;
let dayName;

switch(day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  default:
    dayName = "Unknown";
}
console.log(dayName); // "Wednesday"

// Multiple cases leading to same block
const fruit = "apple";
switch(fruit) {
  case "apple":
  case "pear":
    console.log("This is a pome fruit");
    break;
  case "banana":
    console.log("This is a tropical fruit");
    break;
  default:
    console.log("Unknown fruit");
}

// Fall-through example without break
switch(fruit) {
  case "apple":
    console.log("Apple selected");
  case "banana":
    console.log("Banana selected");
  default:
    console.log("Default executed");
}

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Like a menu selection in a restaurant: choose one option, only that action executes.
- Traffic light: different actions based on red, yellow, or green signals.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Switch evaluates expression once and jumps to matching case.
- Break avoids executing subsequent cases accidentally.
- Default ensures a fallback if no cases match.

-----------------------------------------------------
Example / Usage:

const score = 85;
let grade;

switch(true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
    break;
  case score >= 70:
    grade = "C";
    break;
  default:
    grade = "F";
}
console.log(grade); // "B"

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if break is omitted?
A1: Execution falls through to subsequent cases until a break or end.

Q2: Can switch cases use expressions instead of constants?
A2: Yes, but evaluated at runtime and must match the switch expression.

Q3: Is switch faster than multiple if-else?
A3: Usually more readable; performance difference is minimal for small cases.

Q4: Can default appear anywhere in switch?
A4: Yes, but conventionally placed last.

Q5: Can multiple cases execute the same block?
A5: Yes, stack multiple cases without break before the block.
*/
