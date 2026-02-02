/* 213_print_web_contents.js

=====================================================
Print Web Page Contents in JavaScript
=====================================================

Definition (Interview-friendly):
- "You can print the contents of a web page using the 
  window.print() method, which opens the browser's print dialog."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     <button onclick="window.print()">Print Page</button>

2. Printing Specific Elements
   - Example:
     function printDiv(divId) {
         const content = document.getElementById(divId).innerHTML;
         const originalContent = document.body.innerHTML;
         document.body.innerHTML = content;
         window.print();
         document.body.innerHTML = originalContent;
     }
     // Call: printDiv("myDiv");

3. Using CSS for Print
   - Example:
     @media print {
         .no-print { display: none; }
     }
     // Hides elements with .no-print class during printing

4. Open in New Window and Print
   - Example:
     function printContent(content) {
         const w = window.open();
         w.document.write(content);
         w.print();
         w.close();
     }

5. Edge Cases
   - Printing can include unwanted styles if not handled with print CSS
   - Large pages may take time to render in print dialog

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Printing web contents is like **sending a document to a printer**:
  - You can print the entire page or select specific sections.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you print without opening print dialog?
A1: No, browser security requires user interaction.

Q2: How to exclude certain elements while printing?
A2: Use CSS @media print and set display:none for those elements.

Q3: Can you format content specifically for printing?
A3: Yes, with print-specific CSS styles.

Q4: Can window.print() print hidden elements?
A4: Only if they are visible in the DOM and not hidden via CSS.

Q5: Any alternatives for automated printing?
A5: Server-side PDF generation or headless browser automation.
*/
