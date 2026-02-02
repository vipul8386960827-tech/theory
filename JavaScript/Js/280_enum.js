/* 280_enum.js

=====================================================
Enums in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Enums are a way to define a set of named constants that represent 
  related values. JavaScript does not have built-in enums, but we can 
  simulate them using objects."

Key Points to Highlight:
- Purpose: Give meaningful names to constant values to improve readability and maintainability.
- JavaScript Approach: Use objects to mimic enums.
- TypeScript Approach: Use `enum` keyword for stricter typing.

Examples:

// JavaScript-style enum using object
const Status = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

let taskStatus = Status.PENDING;
console.log(taskStatus); // PENDING

// TypeScript-style enum (for reference)
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }
// let move: Direction = Direction.Up;

Code Explanation:
- JS objects store key-value pairs representing enum constants.
- Values can be strings, numbers, or any type.
- TypeScript enums provide auto-incremented numeric values or string enums.

Real-Life Analogy:
- Like traffic lights: RED, YELLOW, GREEN — each represents a fixed state.

Example / Usage:

switch(taskStatus) {
  case Status.PENDING:
    console.log('Task is pending');
    break;
  case Status.IN_PROGRESS:
    console.log('Task is in progress');
    break;
  case Status.COMPLETED:
    console.log('Task is completed');
    break;
  default:
    console.log('Unknown status');
}

Follow-Up Interview Questions:
- Q1: Can you modify values of JavaScript enums?
  A1: Yes, since they are objects, but they should be treated as constants.
- Q2: Difference between JS enums and TypeScript enums?
  A2: JS enums are plain objects, TS enums are real enum types with compile-time checks.
- Q3: Can enum values be numbers in JS?
  A3: Yes, assign numeric values manually.
- Q4: Why use enums over simple constants?
  A4: Provides grouping, readability, and reduces errors.
- Q5: How to iterate over enum values in JS?
  A5: Use Object.keys(Status) or Object.values(Status) to loop through constants.
*/
