/* 339_event_bubbling_capturing.js

=====================================================
Event Bubbling and Capturing in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Event bubbling and capturing are two phases of event propagation in the DOM. 
  Capturing goes from the root to the target element, while bubbling goes from 
  the target element up to the root."

Key Points to Highlight:
- Three phases of event flow:
  1. Capturing phase: Event travels from window/document down to target
  2. Target phase: Event reaches the target element
  3. Bubbling phase: Event bubbles up from target to root
- By default, most events bubble
- Event listeners can specify capture phase using `addEventListener(type, handler, true)`

Examples:

const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

// Bubbling (default)
parent.addEventListener('click', (e) => {
  console.log('Parent clicked - bubbling');
});

child.addEventListener('click', (e) => {
  console.log('Child clicked - bubbling');
});

// Capturing
parent.addEventListener('click', (e) => {
  console.log('Parent clicked - capturing');
}, true);

Code Explanation:
- Bubbling: child event triggers first, then parent
- Capturing: parent event triggers first, then child
- Can stop propagation using e.stopPropagation()

Real-Life Analogy:
- Bubbling: a rumor starts from child and spreads up to parents
- Capturing: instructions start from top management and reach employees

Example / Usage:

document.body.addEventListener('click', (e) => {
  console.log('Clicked element:', e.target);
}, false); // false = bubbling, true = capturing

Follow-Up Interview Questions:
- Q1: Default phase for events?
  A1: Bubbling (false) unless capture=true
- Q2: How to stop event from propagating?
  A2: e.stopPropagation()
- Q3: Can all events bubble?
  A3: No, e.g., focus, blur do not bubble
- Q4: Difference between target and currentTarget?
  A4: target = origin element, currentTarget = element listener attached to
- Q5: Why use capturing phase?
  A5: Useful for intercepting events before they reach child elements
*/
