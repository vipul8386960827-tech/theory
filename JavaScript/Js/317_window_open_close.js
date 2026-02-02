/* 317_window_open_close.js

=====================================================
Window open() and close() Methods in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "`window.open()` opens a new browser window or tab, and `window.close()` closes 
  the current or specified window. Useful for creating pop-ups or managing windows dynamically."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Open new windows or tabs with custom URLs, sizes, and features.  
   - Close windows programmatically.  
   - Control user navigation in certain cases (e.g., login pop-ups, help windows).

2. **window.open() Syntax**  
   - `window.open(url, name, specs, replace)`  
     - `url` → URL to load  
     - `name` → Window name or target  
     - `specs` → Features like `width=600,height=400`  
     - `replace` → Boolean, replace history entry

3. **window.close() Syntax**  
   - `window.close()` → Closes the current window if opened via script.  
   - Only windows opened by JavaScript can be closed programmatically in most browsers.

-----------------------------------------------------
Examples:

// Open a new window
const newWin = window.open('https://example.com', 'ExampleWindow', 'width=600,height=400');

// Close the newly opened window after 5 seconds
setTimeout(() => {
  newWin.close();
}, 5000);

// Open a window without URL (blank)
const popup = window.open('', 'Popup', 'width=400,height=300');
popup.document.write('<h1>Welcome!</h1>');

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `window.open()` returns a reference to the opened window.  
- Use this reference to manipulate content or close it later.  
- Modern browsers restrict closing windows not opened by scripts for security reasons.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like opening a new physical booklet for reading and closing it when done.

-----------------------------------------------------
Example / Usage:

// Open a help popup
const helpWindow = window.open('help.html', 'Help', 'width=500,height=400');
helpWindow.focus();

// Close popup on button click inside popup
// <button onclick="window.close()">Close</button>

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you close any browser window with window.close()?  
A1: No, only windows opened via JavaScript in the same script context.

Q2: What happens if you try to close the main window?  
A2: Most browsers ignore it for security reasons.

Q3: Can you pass features like scrollbars or resizable in window.open()?  
A3: Yes, via the `specs` parameter, e.g., `scrollbars=yes,resizable=yes`.

Q4: What is the difference between `window.open()` and `<a target="_blank">`?  
A4: `window.open()` gives programmatic control; `<a>` is declarative.

Q5: Are there security restrictions for popups?  
A5: Yes, most modern browsers block popups unless triggered by user interaction.
*/
