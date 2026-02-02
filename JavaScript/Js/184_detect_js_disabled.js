/* 184_detect_js_disabled.js

=====================================================
Detecting if JavaScript is Disabled in Browser
=====================================================

Definition (Interview-friendly):
- "To detect if JavaScript is disabled, we can use the <noscript> tag 
  in HTML. Content inside <noscript> is displayed only when JS is disabled."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     <noscript>
       <p>JavaScript is disabled in your browser. Please enable it.</p>
     </noscript>

2. Styling for No-JS Users
   - Example:
     <noscript>
       <style>
         body { background-color: #f8d7da; color: #721c24; }
       </style>
     </noscript>

3. Redirecting Users
   - Example:
     <noscript>
       <meta http-equiv="refresh" content="0;url=no-js.html">
     </noscript>

4. Warning Message
   - Example:
     <noscript>
       <div class="warning">This website requires JavaScript.</div>
     </noscript>

5. Progressive Enhancement
   - Provide alternative content or UI for users with JS disabled.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- <noscript> is like **a backup sign in case the main power (JS) is off**:
  - It only appears when JS is not running.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you detect JS disabled using JavaScript itself?
A1: No, because if JS is disabled, scripts won’t run; <noscript> is required.

Q2: Is <noscript> supported in all browsers?
A2: Yes, widely supported.

Q3: Can CSS be used inside <noscript>?
A3: Yes, you can include inline styles.

Q4: Can <noscript> contain scripts?
A4: No, scripts inside <noscript> are ignored.

Q5: Why use <noscript>?
A5: To provide fallback content or instructions for users without JS.
*/
