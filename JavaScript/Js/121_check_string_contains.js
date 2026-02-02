/*
121_check_string_contains.js – Interview-Ready Answer

"In JavaScript, checking whether a string contains another string can be done 
using multiple methods, including includes(), indexOf(), or search()."

Key Points:

1️⃣ Using includes():
- Returns true if substring is found, false otherwise.
- Case-sensitive.

Syntax Example:
const str = "Hello, World!";
console.log(str.includes("World")); // true
console.log(str.includes("world")); // false

2️⃣ Using indexOf():
- Returns index of first occurrence or -1 if not found.
- Case-sensitive.

Syntax Example:
const str = "Hello, World!";
console.log(str.indexOf("World") !== -1); // true
console.log(str.indexOf("world") !== -1); // false

3️⃣ Using search() with regex:
- Returns index of match or -1 if not found.
- Can be case-insensitive with /i flag.

Syntax Example:
const str = "Hello, World!";
console.log(str.search(/world/i) !== -1); // true

4️⃣ Real-Life Analogies:

Global Analogy: Searching for a word in a book.
India-specific Analogy: Checking if 'Biryani' is mentioned in a menu.
Web Analogy: Verifying if a URL contains a specific query parameter.

5️⃣ Code Explanation:

- includes() is straightforward for boolean checks.
- indexOf() is older but works in all browsers.
- search() with regex allows advanced matching patterns.

6️⃣ Example / Usage:

const message = "JavaScript is awesome!";
if (message.includes("awesome")) {
    console.log("Yes, it contains 'awesome'");
}

if (message.indexOf("JavaScript") !== -1) {
    console.log("Found 'JavaScript' in the string");
}

if (message.search(/javascript/i) !== -1) {
    console.log("Found 'javascript' ignoring case");
}

7️⃣ Follow-Up Interview Questions:

Q1: Which method is preferred for simple substring checks?  
A1: includes() is more readable and modern.

Q2: Are these methods case-sensitive?  
A2: includes() and indexOf() are case-sensitive; search() can be made case-insensitive using regex /i.

Q3: Can we use startsWith() or endsWith() instead?  
A3: Yes, for checking substrings specifically at the start or end of a string.

Q4: What if the substring is empty?  
A4: includes('') always returns true; indexOf('') returns 0.

Q5: Browser support differences?  
A5: includes() is supported in modern browsers; indexOf() works in all browsers.
*/
