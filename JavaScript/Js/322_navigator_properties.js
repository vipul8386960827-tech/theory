/* 322_navigator_properties.js

=====================================================
Navigator Properties in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Navigator properties provide information about the browser, system, 
  and network status. They help in feature detection, localization, 
  and online/offline checks."

Key Points to Highlight:
- Purpose: Access browser and system info programmatically.
- Common Properties:
  - navigator.userAgent → browser info string
  - navigator.platform → operating system
  - navigator.language → preferred language
  - navigator.onLine → online status (true/false)
  - navigator.cookieEnabled → cookie support
  - navigator.hardwareConcurrency → number of logical CPU cores
  - navigator.maxTouchPoints → number of touch points on device
- Common Methods:
  - navigator.geolocation.getCurrentPosition() → get user location
  - navigator.registerProtocolHandler() → handle custom protocols

Examples:

console.log(navigator.userAgent);        // e.g., "Mozilla/5.0 ..."
console.log(navigator.platform);         // e.g., "Win32"
console.log(navigator.language);         // e.g., "en-US"
console.log(navigator.onLine);           // true or false
console.log(navigator.cookieEnabled);    // true or false
console.log(navigator.hardwareConcurrency); // e.g., 8
console.log(navigator.maxTouchPoints);   // e.g., 5

Code Explanation:
- `navigator` is a global read-only object in browsers.
- Properties help detect browser capabilities, device features, and system info.
- Methods allow geolocation or registering protocol handlers.

Real-Life Analogy:
- Like checking your device settings for OS, language, network, and hardware before using certain apps.

Example / Usage:

// Check if offline
if(!navigator.onLine) {
  alert('You are offline. Some features may not work.');
}

// Detect multi-core processor
console.log(`CPU cores: ${navigator.hardwareConcurrency}`);

// Check for touch support
if(navigator.maxTouchPoints > 0) {
  console.log('Touchscreen device detected');
}

Follow-Up Interview Questions:
- Q1: Can navigator properties be modified?
  A1: Most are read-only; cannot change userAgent or platform.
- Q2: How reliable is navigator.onLine for connectivity detection?
  A2: It may be true even if actual network is down; basic status only.
- Q3: How to detect mobile devices using navigator?
  A3: Use navigator.userAgent and navigator.maxTouchPoints.
- Q4: Difference between userAgent and platform?
  A4: userAgent → full browser info; platform → OS type.
- Q5: Are all navigator properties standard across browsers?
  A5: Most modern browsers support them, but slight differences may exist.
*/
