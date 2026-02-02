/* 319_screen_object.js

=====================================================
Screen Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `screen` object provides information about the user's physical screen, 
  such as dimensions, color depth, and available display area. 
  It is read-only and useful for responsive design or window positioning."

Key Points to Highlight:
- Purpose: Access screen properties to optimize layout, popups, and UI scaling.
- Common Properties:
  - screen.width → total screen width in pixels
  - screen.height → total screen height in pixels
  - screen.availWidth → available width excluding OS taskbars
  - screen.availHeight → available height excluding OS taskbars
  - screen.colorDepth → number of bits used for colors
  - screen.pixelDepth → number of bits per pixel

Examples:

console.log(screen.width);       // e.g., 1920
console.log(screen.height);      // e.g., 1080
console.log(screen.availWidth);  // e.g., 1920 minus taskbar
console.log(screen.availHeight); // e.g., 1040 if taskbar is 40px
console.log(screen.colorDepth);  // e.g., 24
console.log(screen.pixelDepth);  // e.g., 24

Code Explanation:
- `screen` is a global object in browsers.  
- Provides read-only info about user's display.  
- Useful to adapt UI elements or open popups in optimal size.

Real-Life Analogy:
- Like measuring your desk before placing a monitor or laptop; you know how much space is available.

Example / Usage:

// Open a window centered on the screen
const width = 600;
const height = 400;
const left = (screen.width - width) / 2;
const top = (screen.height - height) / 2;
window.open('https://example.com', 'Popup', `width=${width},height=${height},left=${left},top=${top}`);

Follow-Up Interview Questions:
- Q1: Can you modify the screen object properties?
  A1: No, they are read-only.
- Q2: Difference between screen.width and screen.availWidth?
  A2: availWidth excludes OS elements like taskbars or docks.
- Q3: How to detect high DPI screens?
  A3: Use window.devicePixelRatio along with screen.pixelDepth.
- Q4: Can screen object be used on mobile devices?
  A4: Yes, it provides screen info, but values vary based on device and orientation.
- Q5: How to adapt popup size based on screen object?
  A5: Calculate left/top using screen.width/height minus popup dimensions for centering.
*/
