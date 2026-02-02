/* 279_enums_in_js.js

=====================================================
Enums in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Enums are a way to define a set of named constants that represent 
  related values. JavaScript does not have built-in enum support, 
  but we can simulate them using objects or TypeScript for stricter typing."

Key Points to Highlight:
- Purpose: Give meaningful names to constant values, improving readability and maintainability.
- JavaScript Approach: Use objects to mimic enums.
- TypeScript Approach: Use `enum` keyword for real enum support.

Examples:

// JavaScript-style enum using object
const Color = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE'
};

let favoriteColor = Color.RED;
console.log(favoriteColor); // RED

// TypeScript-style enum (for reference)
enum Direction {
  Up,
  Down,
  Left,
  Right
}
let move: Direction = Direction.Up;

Code Explanation:
- JavaScript objects store key-value pairs representing enum constants.
- Values can be strings, numbers, or any type.
- TypeScript enums provide auto-incremented numeric values or string enums.

Real-Life Analogy:
- Like a traffic signal with fixed colors: RED, YELLOW, GREEN. Each represents a constant action.

Example / Usage:

// Using enum for control flow
switch(favoriteColor) {
  case Color.RED:
    console.log('Stop');
    break;
  case Color.GREEN:
    console.log('Go');
    break;
  case Color.BLUE:
    console.log('Relax');
    break;
  default:
    console.log('Unknown color');
}

Follow-Up Interview Questions:
- Q1: Can you modify values of JavaScript enums?
  A1: Yes, since they are objects, but should be treated as constants.
- Q2: Difference between JS enums and TypeScript enums?
  A2: JS enums are plain objects, TS enums are real enum types with compile-time checks.
- Q3: Can enum values be numbers in JS?
  A3: Yes, assign numeric values manually.
- Q4: Why use enums over simple constants?
  A4: Provides grouping, readability, and reduces errors.
- Q5: How to iterate over enum values in JS?
  A5: Use Object.keys(Color) or Object.values(Color) to loop through constants.
*/
