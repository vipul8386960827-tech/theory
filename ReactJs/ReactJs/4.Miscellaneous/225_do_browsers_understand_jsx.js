/* 225_do_browsers_understand_jsx.js

=====================================
Do Browsers Understand JSX?
=====================================

Definition:
Browsers **do not understand JSX** natively.  
JSX is a **syntax extension for JavaScript** used in React to describe UI components in 
a declarative way. It must be **transpiled** into regular JavaScript before the browser can execute it.

-------------------------------------
Key Points:
-------------------------------------
1. JSX looks like HTML but is converted to `React.createElement()` calls.  
2. Transpilation is done using **Babel** (or similar tools).  
3. Example: `<h1>Hello</h1>` → `React.createElement('h1', null, 'Hello')`.  
4. Allows combining HTML-like syntax with dynamic JavaScript expressions.

-------------------------------------
Guidelines:
-------------------------------------
- Always use JSX with a **build tool** (Webpack + Babel) or environments like Create React App.  
- Avoid using JSX directly in browsers without transpilation.  

-------------------------------------
Example:
-------------------------------------
// JSX
const element = <h1>Hello World</h1>;

// Transpiled JavaScript
const element = React.createElement("h1", null, "Hello World");

-------------------------------------
Analogy:
-------------------------------------
- JSX = **blueprint for a building**  
- Babel = **architect converting blueprint into actual construction instructions**  
- Browser = **construction crew**; it can only follow JavaScript instructions, not JSX.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can JSX contain expressions?  
A1: Yes, inside curly braces `{}` you can embed JavaScript expressions.

Q2: Is JSX required to use React?  
A2: No, but it makes writing components cleaner. You can use `React.createElement()` directly.

Q3: Why can't browsers execute JSX directly?  
A3: Browsers only understand standard JavaScript, not JSX syntax.

Q4: What tools are used to transpile JSX?  
A4: Babel, along with bundlers like Webpack or tools like Create React App.
*/
