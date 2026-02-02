/* 318_window_open_params.js

=====================================================
window.open() Parameters in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "`window.open()` is a method to open a new browser window or tab, 
  and its parameters allow control over URL, window name, features, and history replacement."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Open a new browser window or tab.  
   - Customize size, position, and features.  
   - Can optionally replace the current page in history.

2. **Parameters**  
   - `url` → URL to load (optional, default is empty).  
   - `name` → Target window name (string).  
       - `_blank` → new window/tab  
       - `_self` → same window  
       - `_parent`, `_top` → frames navigation  
   - `specs` → String of features separated by commas:  
       - `width`, `height`, `top`, `left`  
       - `resizable`, `scrollbars`, `menubar`, `toolbar`  
   - `replace` → Boolean, whether the URL replaces current history entry.

-----------------------------------------------------
Examples:

// Open example.com in a new window with custom size
const win = window.open(
  'https://example.com', 
  'ExampleWindow', 
  'width=600,height=400,scrollbars=yes,resizable=yes'
);

// Open blank window
const popup = window.open('', 'Popup', 'width=400,height=300');
popup.document.write('<h1>Hello!</h1>');

// Replace current page in history
window.open('https://example.com', '_self', '', true);

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `url` specifies the page to load.  
- `name` targets existing window or creates new one.  
- `specs` define window features like size, scrollbars.  
- `replace` controls history replacement.  
- Returns a reference to the opened window for further manipulation.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like opening a new physical booklet with specified dimensions and tools (like bookmarks or scroll).

-----------------------------------------------------
Example / Usage:

// Focus a newly opened window
const helpWindow = window.open('help.html', 'Help', 'width=500,height=400');
helpWindow.focus();

// Open multiple popups
const popup1 = window.open('page1.html', 'Popup1', 'width=300,height=300');
const popup2 = window.open('page2.html', 'Popup2', 'width=300,height=300');

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you manipulate the opened window?  
A1: Yes, via the reference returned by window.open().

Q2: What happens if name matches an existing window?  
A2: The existing window is reused.

Q3: Are there restrictions on features?  
A3: Some features may be ignored by modern browsers for security.

Q4: How to open a URL in the same tab using window.open()?  
A4: Use `_self` as the name parameter.

Q5: Can window.open() be blocked by browsers?  
A5: Yes, popups not triggered by user actions are often blocked.
*/
