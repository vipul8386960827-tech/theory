/* 232_use_javascript_urls_in_react_v16_9.js

=====================================
Use of JavaScript URLs in React v16.9
=====================================

Definition:
A **JavaScript URL** is a URL starting with `javascript:` that executes code when visited.  
In React v16.9, using `javascript:` URLs is **discouraged** due to security risks, 
particularly **XSS (Cross-Site Scripting)** vulnerabilities.

-------------------------------------
Key Points:
-------------------------------------
1. **Security Risk**: JavaScript URLs can allow injection of malicious code.  
2. **React Behavior**: React automatically escapes content in JSX, making it safe by default, 
   but `href="javascript:..."` bypasses these protections.  
3. **Alternatives**:
   - Use `onClick` handlers instead of `javascript:` URLs.  
   - Use functions to handle actions programmatically.  

-------------------------------------
Guidelines:
-------------------------------------
- Avoid `javascript:` in `href`.  
- Always use event handlers (`onClick`) for interactivity.  
- Sanitize any dynamic content to prevent XSS.

-------------------------------------
Example:
-------------------------------------
// Avoid this
<a href="javascript:alert('Hello!')">Click Me</a>

// Recommended
<a href="#" onClick={() => alert('Hello!')}>Click Me</a>

-------------------------------------
Analogy:
-------------------------------------
- JavaScript URLs = **leaving the door unlocked** for attackers.  
- Event handlers = **controlled access**, safer and predictable.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why are JavaScript URLs unsafe in React?  
A1: They can execute arbitrary code, leading to XSS attacks.

Q2: Can React escape JavaScript URLs automatically?  
A2: No, React escapes JSX content, but `javascript:` URLs bypass it.

Q3: How do you handle dynamic links safely?  
A3: Use event handlers, sanitize inputs, and avoid inline script execution.

Q4: Are there scenarios where `javascript:` URLs are acceptable?  
A4: Rarely, only in legacy code; modern React apps should never use them.
*/
