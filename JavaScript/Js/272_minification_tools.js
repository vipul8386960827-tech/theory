/* 272_minification_tools.js

=====================================================
JavaScript Minification Tools – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript minification tools are utilities that remove unnecessary characters 
  from code (like spaces, comments, and line breaks) and optionally shorten 
  identifiers, improving load times and performance."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Reduce file size → faster download and execution.  
   - Improve website performance.  
   - Slightly obfuscate code.

2. **Popular Tools**  
   - **UglifyJS** → Classic minifier; supports compression and variable mangling.  
   - **Terser** → Modern fork of UglifyJS; supports ES6+ syntax.  
   - **Google Closure Compiler** → Advanced optimizations, minification, and error checking.  
   - **Webpack / Rollup Plugins** → Integrates minification in build pipelines.

3. **Features**  
   - Remove comments and whitespace.  
   - Shorten variable and function names (mangling).  
   - Optionally perform advanced optimizations like dead code elimination.

-----------------------------------------------------
Examples:

// Using Terser (Node.js)
const Terser = require('terser');

const code = `
function add(a, b) {
  return a + b;
}
console.log(add(5, 10));
`;

const minified = Terser.minify(code);
console.log(minified.code);
// Output: function add(a,b){return a+b}console.log(add(5,10));

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Minification tools parse JavaScript code, remove unnecessary characters, and 
  optionally rename identifiers to reduce size.  
- Output is functionally equivalent to original code.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like compressing a large document or PDF without losing any content.

-----------------------------------------------------
Example / Usage:

// Using UglifyJS CLI
// Install: npm install uglify-js -g
// Command: uglifyjs input.js -o output.min.js -c -m

// Using Webpack plugin
// In webpack.config.js
// const TerserPlugin = require('terser-webpack-plugin');
// optimization: { minimize: true, minimizer: [new TerserPlugin()] }

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between minification and obfuscation?  
A1: Minification reduces size for performance; obfuscation hides logic for security.

Q2: Can minification break code?  
A2: Yes, if code depends on global variable names or dynamic evaluation.

Q3: Do minification tools support ES6+?  
A3: Terser and Google Closure Compiler support modern JavaScript syntax.

Q4: Are minification tools part of build systems?  
A4: Yes, most modern build tools integrate minification automatically.

Q5: Can source maps be used with minified code?  
A5: Yes, to trace errors back to the original source code.
*/
