/* 97_void_0.js

=====================================================
JavaScript: void(0)
=====================================================

Definition:
`void(0)` is a JavaScript expression that evaluates to `undefined`.  
It is often used to create expressions that do nothing and safely 
return `undefined`.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. **What is void?**
   - `void` is an operator in JavaScript.
   - Syntax: `void expression`
   - Always evaluates the expression but returns `undefined`.

2. **Why void(0)?**
   - `0` is a commonly used expression with `void` because it’s short 
     and has no side effects.
   - `void(0)` guarantees the result is `undefined`.

3. **Common Uses:**
   - **Prevent page reload in `<a>` tags**:
     ```html
     <a href="javascript:void(0)">Click Me</a>
     ```
     Prevents the link from navigating anywhere.
   - **Bookmarklets**:
     `javascript:void(alert("Hi"))`
   - **Avoid unwanted return values**:
     Wrapping an expression in `void` ensures it evaluates but discards its result.

4. **Alternatives Today:**
   - Better to use `event.preventDefault()` or `href="#"` with caution, 
     instead of `javascript:void(0)` for links.

-----------------------------------------------------
Examples:
-----------------------------------------------------
void(0);              // undefined
void(123);            // undefined
void console.log("hi"); // prints "hi", returns undefined

// In HTML
<a href="javascript:void(0)">Safe Link</a>

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of `void(0)` like throwing something into a black hole:
  the action happens (expression runs), but nothing comes back 
  (always returns undefined).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between `void(0)` and `undefined`?  
A1: `undefined` can be reassigned in older JS versions, while `void(0)` 
    always guarantees `undefined`.

Q2: Why was `void(0)` commonly used in links?  
A2: To prevent navigation/reload while still using an `<a>` element.

Q3: What are modern alternatives to `javascript:void(0)`?  
A3: Use `event.preventDefault()` inside an `onclick` handler, or use 
    `<button>` elements instead of dummy links.

Q4: Can you pass any expression to `void`?  
A4: Yes, `void` will evaluate it but always return `undefined`.
*/
