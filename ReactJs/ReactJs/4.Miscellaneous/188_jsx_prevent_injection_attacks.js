/* 188_jsx_prevent_injection_attacks.js */
/* 188_jsx_prevent_injection_attacks.js

=====================================
JSX Prevent Injection Attacks
=====================================

Definition:
React automatically escapes values embedded in JSX before rendering them.  
This means any string passed as props, attributes, or children is treated as text,  
not executable HTML or JavaScript, which prevents cross-site scripting (XSS) attacks.

-------------------------------------
Key Points:
-------------------------------------
1. JSX automatically escapes dangerous characters (`<`, `>`, `&`, `"`, `'`).  
2. Malicious input is rendered as plain text, not HTML or executable scripts.  
3. Directly using `dangerouslySetInnerHTML` bypasses this protection, so it should be avoided unless absolutely necessary.  
4. Always sanitize user-generated HTML before using `dangerouslySetInnerHTML`.

-------------------------------------
Guidelines:
-------------------------------------
- ✅ Safe: `{userInput}` inside JSX → rendered as text.  
- ❌ Unsafe: `dangerouslySetInnerHTML` without sanitization.  
- Use libraries like `DOMPurify` when you must inject raw HTML.  

-------------------------------------
Example:
-------------------------------------
import React from "react";

function App() {
  const userInput = "<img src=x onerror=alert('Hacked!') />";

  return (
    <div>
      <h3>Safe Output:</h3>
      {/* React escapes the string 
      <p>{userInput}</p>

      <h3>Unsafe Output (don’t do this):</h3>
      {/* Directly injecting HTML is dangerous *
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Think of JSX like a **restaurant**:  
- Normally, food (text) is served clean on a plate.  
- But if you allow customers to bring their own knives into the kitchen (`dangerouslySetInnerHTML`),  
  you risk contamination and accidents unless you sanitize carefully.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is JSX safe from XSS by default?  
A1: Because React escapes all values before rendering them, treating them as text, not code.  

Q2: When should you use `dangerouslySetInnerHTML`?  
A2: Only when rendering sanitized HTML (e.g., CMS content, markdown output).  

Q3: How can you make `dangerouslySetInnerHTML` safe?  
A3: Use sanitization libraries like `DOMPurify` to clean the HTML before injecting.  

Q4: Does React escape attributes as well as children?  
A4: Yes, React escapes both to prevent injection attacks.  

*/
