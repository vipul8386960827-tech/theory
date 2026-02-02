/* 223_switch_case_conventions.js

=====================================================
Switch-Case Conventions in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Switch-case conventions are best practices followed when using 
  switch statements to make code readable, maintainable, and predictable."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Use break statements after each case to prevent fall-through unless intentional.
2. Place default case at the end for fallback handling.
3. Use descriptive and consistent case values (constants if possible).
4. Avoid complex logic inside cases; keep them simple and readable.
5. Group multiple cases leading to the same block without breaks.
6. Indent code properly inside each case for readability.

-----------------------------------------------------
Examples:

// Basic switch with conventions
const color = "red";
switch(color) {
  case "red":
    console.log("Stop");
    break;
  case "yellow":
    console.log("Caution");
    break;
  case "green":
    console.log("Go");
    break;
  default:
    console.log("Unknown color");
}

// Grouping multiple cases
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

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Traffic lights: handle each color distinctly, with a fallback if signal is broken.
- Menu options: clear choices and default handling for invalid selection.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Each case checks the expression value and executes its block.
- Break ensures only the matched block executes.
- Default handles unmatched values.
- Grouping reduces redundancy and improves clarity.

-----------------------------------------------------
Example / Usage:

const day = 6;
switch(day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  case 3: console.log("Wednesday"); break;
  case 4: console.log("Thursday"); break;
  case 5: console.log("Friday"); break;
  case 6:
  case 7:
    console.log("Weekend"); 
    break;
  default: console.log("Invalid day");
}
// Output: "Weekend"

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if break is omitted?
A1: Execution falls through to subsequent cases until a break or end.

Q2: Can default be placed anywhere?
A2: Yes, but conventionally at the end.

Q3: Can multiple cases execute the same block?
A3: Yes, stack multiple cases before a shared block.

Q4: Should complex logic be inside switch cases?
A4: Prefer simple actions; complex logic should call functions.

Q5: Why follow switch-case conventions?
A5: Improves readability, maintainability, and avoids bugs due to fall-through.
*/
