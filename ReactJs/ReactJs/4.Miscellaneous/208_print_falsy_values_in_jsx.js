/* 208_print_falsy_values_in_jsx.js

=====================================
Printing Falsy Values in JSX
=====================================

Definition:
In React JSX, **falsy values** like `false`, `null`, `undefined`, and `true`  
are **ignored** during rendering, except `0` which is rendered.  
This behavior is useful for conditional rendering without extra checks.

-------------------------------------
Key Points:
-------------------------------------
1. `false`, `null`, `undefined` → do **not render anything**.  
2. `true` → does not render.  
3. `0` → **renders as 0**, unlike other falsy values.  
4. Simplifies conditional expressions inside JSX using `&&` or ternary operators.  

-------------------------------------
Guidelines:
-------------------------------------
- Use `&&` for inline conditional rendering.  
- Use ternary (`? :`) when an **alternative value** should be rendered.  
- Avoid returning `undefined` directly; it’s safer to use `null` to signify "nothing to render".  

-------------------------------------
Example:
-------------------------------------
import React from "react";

function App() {
  const showText = false;
  const count = 0;

  return (
    <div>
      <h1>{showText && "Hello World"}</h1>  {/* Won’t render *
      <h2>{count}</h2>                       {/* Will render 0 
      <h3>{null}</h3>                        {/* Won’t render 
      <h4>{undefined}</h4>                   {/* Won’t render 
      <h5>{true}</h5>                        {/* Won’t render 
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Falsy values in JSX are like **invisible ink**:  
- Writing with invisible ink (`false`, `null`, `undefined`) shows nothing on the page,  
- Only visible ink (`0` or strings) is displayed.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why does `0` render but other falsy values don’t?  
A1: `0` is a valid number and React treats it as content, unlike `false`, `null`, or `undefined`.  

Q2: Can you use `false` or `null` for conditional rendering?  
A2: Yes, combined with `&&` operator, it’s a common pattern in JSX.  

Q3: What happens if you return `undefined` from a component?  
A3: React ignores it and renders nothing. Returning `null` is preferred.  

Q4: Can you combine multiple falsy values in JSX?  
A4: Yes, React will ignore all except `0`. Expressions like `{false || null || 0}` render `0`.  

*/
