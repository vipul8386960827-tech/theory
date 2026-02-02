/*
-----------------------------------
How to speak in interview:
"JSX is a syntax extension for JavaScript that looks like HTML.  
It allows us to write UI code in a way that’s more readable.  
Under the hood, JSX gets compiled to React.createElement calls,  
which produce React elements.  
It helps combine markup and logic in the same file."

-----------------------------------
Detailed Explanation of JSX:

1. Definition:
- JSX stands for JavaScript XML.  
- It lets you write HTML-like code inside JavaScript.  

2. Why it’s useful:
- Makes UI code easier to read and write.  
- Keeps component structure clear and intuitive.  
- Allows embedding JavaScript expressions inside `{}`.  

3. Example:

Without JSX (plain React):
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
);

With JSX:
const element = <h1 className="title">Hello World</h1>;

Both do the same thing, but JSX is cleaner.  

4. Key Points:
- JSX is not HTML, but very similar.  
- It must be transpiled (e.g., by Babel) to regular JS.  
- Attributes use camelCase (e.g., className, onClick).  
- Expressions are wrapped in curly braces `{}`.  

-----------------------------------
✅ Tip for Interview:
Keep your answer short first.  
If the interviewer wants depth, add the example and explain  
how JSX compiles to React.createElement.  
*/
