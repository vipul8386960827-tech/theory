/* 296_find_html_elements_dom.js

=====================================================
Finding HTML Elements in DOM – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript provides various methods to locate and access HTML elements 
  in the DOM, enabling interaction, manipulation, and data retrieval."

Key Points to Highlight:
- Common DOM selection methods:
  - getElementById('id') → single element by ID
  - getElementsByClassName('class') → HTMLCollection of elements
  - getElementsByTagName('tag') → HTMLCollection of elements
  - querySelector('selector') → first element matching CSS selector
  - querySelectorAll('selector') → NodeList of all matching elements
- NodeList and HTMLCollection can be converted to arrays for iteration

Examples:

// Select by ID
const header = document.getElementById('header');

// Select by class
const items = document.getElementsByClassName('item');

// Select by tag
const divs = document.getElementsByTagName('div');

// Select with CSS selector
const firstButton = document.querySelector('button.primary');
const allButtons = document.querySelectorAll('button');

Code Explanation:
- getElementById returns a single element
- getElementsByClassName / getElementsByTagName return live collections
- querySelector / querySelectorAll use CSS selectors; querySelectorAll returns static NodeList

Real-Life Analogy:
- Like searching for a specific person in a room by name, role, or appearance

Example / Usage:

// Iterate over NodeList
const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => btn.addEventListener('click', () => alert(btn.textContent)));

Follow-Up Interview Questions:
- Q1: Difference between HTMLCollection and NodeList?
  A1: HTMLCollection is live; NodeList can be static or live (depending on method).
- Q2: Can getElementsByClassName return multiple elements?
  A2: Yes, it returns an HTMLCollection of all matching elements.
- Q3: Can querySelector select multiple elements?
  A3: querySelector returns first match; querySelectorAll returns all matches.
- Q4: How to convert HTMLCollection to array?
  A4: Array.from(collection) or [...collection].
- Q5: Which method is preferred for modern JS?
  A5: querySelector / querySelectorAll due to CSS selector flexibility.
*/
