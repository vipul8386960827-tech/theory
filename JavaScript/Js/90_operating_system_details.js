/*
90_operating_system_details.js – Interview-Ready Answer

"In JavaScript (typically in browsers or Node.js), you can access certain 
operating system or platform details to adapt behavior or gather environment info."

Key Points:

1️⃣ Definition:
- Browsers provide limited OS info via navigator object.
- Node.js provides detailed OS info via 'os' module.
- Useful for feature detection, platform-specific optimizations, or analytics.

2️⃣ Syntax Example (Browser):

// Get OS info from browser
console.log(navigator.platform);       // Example: "MacIntel"
console.log(navigator.userAgent);      // Example: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."

3️⃣ Syntax Example (Node.js):

// Require OS module
const os = require('os');

console.log(os.type());                 // Operating system name, e.g., 'Darwin'
console.log(os.platform());             // Platform, e.g., 'darwin', 'win32', 'linux'
console.log(os.arch());                 // CPU architecture, e.g., 'x64'
console.log(os.release());              // OS release version
console.log(os.cpus().length);         // Number of CPU cores
console.log(os.freemem());             // Free memory in bytes

4️⃣ Real-Life Analogies:

Global Analogy: Checking what device someone is using before sending compatible software.
India-specific Analogy: Detecting if user is on Android or iOS before showing app download links.
Web Analogy: Detecting Mac, Windows, or Linux to adjust download URLs or features.

5️⃣ Code Explanation:

- navigator is browser-provided and limited; provides platform, userAgent, language.
- Node.js os module gives full OS details including CPU, memory, network interfaces.
- Can be used for analytics, platform-specific optimizations, or logging.

6️⃣ Example / Usage:

// Browser example: Adjust UI for Mac
if (navigator.platform.indexOf('Mac') !== -1) {
    console.log("User is on Mac – adjust shortcuts accordingly");
}

// Node.js example: Log OS info
console.log(`OS: ${os.type()} ${os.release()}, Architecture: ${os.arch()}, CPUs: ${os.cpus().length}`);

7️⃣ Follow-Up Interview Questions:

Q1: Can you get OS info directly in frontend JS?  
A1: Only limited info via navigator; cannot get full OS details due to security.

Q2: Difference between navigator.platform and navigator.userAgent?  
A2: platform gives OS type, userAgent gives detailed browser + OS info string.

Q3: How to detect mobile OS?  
A3: Check userAgent string for keywords like 'Android', 'iPhone', 'iPad'.

Q4: Why is OS info limited in browsers?  
A4: For security and privacy reasons; exposing full OS details can be a risk.

Q5: Can you modify OS info in Node.js?  
A5: No, os module provides read-only info about the system.
*/
