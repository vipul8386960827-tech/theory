/* 269_minification.js

=====================================================
JavaScript Minification – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript minification is the process of removing all unnecessary characters 
  (like spaces, comments, line breaks) from the code without changing its functionality, 
  primarily to reduce file size and improve load times."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Reduce file size → faster download and execution.  
   - Improve website performance.  
   - Obfuscates code slightly but is mainly for optimization, not security.

2. **Common Tools**  
   - UglifyJS, Terser, Google Closure Compiler.  
   - Integrated in build systems like Webpack, Rollup, or Parcel.

3. **Difference from Obfuscation**  
   - Minification: removes whitespace/comments, shortens identifiers minimally.  
   - Obfuscation: makes code intentionally hard to read and understand.

-----------------------------------------------------
Examples:

// Original code
function add(a, b) {
  // Returns sum
  return a + b;
}
console.log(add(5, 10));

// Minified version (example)
function add(a,b){return a+b}console.log(add(5,10));

// Using Terser (Node.js)
// Install: npm install terser -g
// Command: terser input.js -o output.min.js -c -m

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Minification reduces size by removing unnecessary characters.  
- It may also shorten variable names (`-m` option in Terser).  
- Functionality remains identical to the original code.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like compressing a document by removing extra spaces and comments; content stays the same but takes less storage.

-----------------------------------------------------
Example / Usage:

const sum = (a, b) => a + b;
console.log(sum(5, 10));
// After minification: const sum=(a,b)=>a+b;console.log(sum(5,10));

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does minification secure code?  
A1: Not really; it only slightly obfuscates it.

Q2: Can minification break code?  
A2: Yes, if code relies on specific variable names in global scope or dynamic evaluation.

Q3: Difference between minification and uglification?  
A3: Uglification includes both minification and renaming for optimization/obfuscation.

Q4: Why is minification important in production?  
A4: Reduces load times, improves performance, and lowers bandwidth usage.

Q5: Can source maps be used with minified code?  
A5: Yes, to map minified code back to original source for debugging.
*/
