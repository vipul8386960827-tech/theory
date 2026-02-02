/* 168_detect_mobile_no_regexp.js

=====================================================
Detecting Mobile Browsers Without RegExp in JavaScript
=====================================================

Definition:
- Detect mobile devices by checking `navigator.userAgent` 
  using string methods instead of regular expressions.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `includes()` Method
   - Check for common mobile keywords.
   - Example:
     function isMobile() {
         const ua = navigator.userAgent;
         return ua.includes("Mobi") || ua.includes("Android") ||
                ua.includes("iPhone") || ua.includes("iPad") ||
                ua.includes("iPod") || ua.includes("BlackBerry") ||
                ua.includes("IEMobile") || ua.includes("Opera Mini");
     }
     console.log(isMobile()); // true or false

2. Using `some()` with an Array of Keywords
   - Cleaner approach for multiple checks.
   - Example:
     function isMobile() {
         const ua = navigator.userAgent;
         const keywords = ["Mobi", "Android", "iPhone", "iPad", "iPod", 
                           "BlackBerry", "IEMobile", "Opera Mini"];
         return keywords.some(kw => ua.includes(kw));
     }
     console.log(isMobile());

3. Using Modern `navigator.userAgentData`
   - Structured detection when available.
   - Example:
     if (navigator.userAgentData) {
         console.log(navigator.userAgentData.mobile); // true if mobile
     }

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Detecting mobile without RegExp is like **checking labels on items manually**:
  - You just look for keywords instead of scanning patterns.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why avoid RegExp for mobile detection?
A1: Simpler, faster, and more readable for basic keyword checks.

Q2: Is this method 100% reliable?
A2: No, user agents can be spoofed or custom.

Q3: Can you detect tablets separately?
A3: Yes, check for "iPad" or screen size metrics.

Q4: When to prefer `userAgentData` over string checks?
A4: Modern browsers support it; provides structured info, more privacy-friendly.

Q5: Should detection replace responsive design?
A5: No, always combine with CSS media queries for layout adjustments.
*/
