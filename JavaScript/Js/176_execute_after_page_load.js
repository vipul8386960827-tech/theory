/* 176_execute_after_page_load.js

=====================================================
Executing JavaScript After Page Load
=====================================================

Definition (Interview-friendly):
- "To ensure JavaScript runs only after the HTML page has fully loaded, 
  we can use event listeners or window.onload to execute code safely."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `window.onload`
   - Example:
     window.onload = function() {
         console.log("Page fully loaded");
     };

2. Using `DOMContentLoaded` Event
   - Fires when HTML is fully parsed, before images/styles load.
   - Example:
     document.addEventListener("DOMContentLoaded", function() {
         console.log("DOM fully loaded and parsed");
     });

3. Inline Script at Bottom of Body
   - Placing `<script>` just before `</body>` ensures DOM is loaded.
   - Example:
     <body>
         <div id="content"></div>
         <script>
             console.log(document.getElementById("content").innerText);
         </script>
     </body>

4. Using Async or Defer Attributes
   - `<script src="script.js" defer></script>` runs after DOM is parsed.
   - `<script src="script.js" async></script>` runs as soon as script is loaded.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Waiting to execute JS until page load is like **waiting for ingredients**:
  - You can’t start cooking until all ingredients are ready.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `DOMContentLoaded` and `window.onload`?
A1: DOMContentLoaded fires after HTML is parsed; window.onload fires after all resources loaded.

Q2: When to use defer vs async?
A2: defer keeps execution order and waits for DOM; async executes immediately after download.

Q3: Can scripts at the top run safely without DOM ready?
A3: Only if DOM elements they access are already loaded or wrapped in event listeners.

Q4: Which method is recommended for modern apps?
A4: `DOMContentLoaded` or `<script defer>` are preferred for reliability.

Q5: Can multiple event listeners be attached for DOMContentLoaded?
A5: Yes, all will execute in the order attached.
*/
