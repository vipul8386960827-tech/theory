/* 321_nav_object.js

=====================================================
Navigator Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `navigator` object contains information about the browser and the system. 
  It helps in detecting browser type, version, platform, and online status."

Key Points to Highlight:
- Purpose: Identify browser capabilities, platform, language, and connectivity.
- Common Properties:
  - navigator.userAgent → string containing browser info
  - navigator.platform → operating system
  - navigator.language → preferred language
  - navigator.onLine → true if online, false if offline
  - navigator.cookieEnabled → true if cookies are enabled
- Common Methods:
  - navigator.geolocation.getCurrentPosition() → get user location
  - navigator.registerProtocolHandler() → handle custom protocols

Examples:

// Browser information
console.log(navigator.userAgent);    // e.g., "Mozilla/5.0 ..."
console.log(navigator.platform);     // e.g., "MacIntel"
console.log(navigator.language);     // e.g., "en-US"
console.log(navigator.onLine);       // true or false
console.log(navigator.cookieEnabled);// true or false

Code Explanation:
- `navigator` is a global object in browsers.
- Provides runtime info about browser capabilities and system.
- Useful for feature detection and analytics.

Real-Life Analogy:
- Like checking your device settings to know OS, language, and network status 
  before performing an action.

Example / Usage:

// Detect if offline
if(!navigator.onLine) {
  alert('You are offline. Some features may not work.');
}

// Detect language
if(navigator.language.startsWith('en')) {
  console.log('Display English content');
} else {
  console.log('Display localized content');
}

Follow-Up Interview Questions:
- Q1: Can navigator properties be modified?
  A1: Most are read-only; cannot change userAgent or platform.
- Q2: Difference between navigator.onLine and actual connectivity?
  A2: navigator.onLine may be true even if the network has issues; it's a basic status.
- Q3: How to detect browser type using navigator?
  A3: Use navigator.userAgent string and parse it carefully.
- Q4: Can navigator detect mobile vs desktop?
  A4: Partially, using navigator.userAgent and navigator.platform.
- Q5: Are navigator properties standard across all browsers?
  A5: Most modern browsers support them, but behavior may vary slightly.
*/
