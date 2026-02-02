/* 167_detect_mobile_browser.js

=====================================================
Detecting Mobile Browsers in JavaScript
=====================================================

Definition:
- Detect if a user is visiting from a mobile device using the
  `navigator.userAgent` or `navigator.userAgentData` (modern API).

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `navigator.userAgent`
   - Simple regex check for common mobile keywords.
   - Example:
     function isMobile() {
         return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                .test(navigator.userAgent);
     }
     console.log(isMobile()); // true or false

2. Using `navigator.userAgentData` (modern browsers)
   - Provides structured information about device type.
   - Example:
     if (navigator.userAgentData) {
         navigator.userAgentData.mobile; // true if mobile
     }

3. Responsive Design Recommendation
   - Instead of relying only on detection, combine with CSS media queries.
   - Example: `@media (max-width: 768px) { ... }`

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Detecting mobile browsers is like **checking the size of a device**:
  - You decide which layout or behavior to apply based on device type.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can `userAgent` be spoofed?
A1: Yes, users or browsers can change it; not 100% reliable.

Q2: Difference between `userAgent` and `userAgentData`?
A2: `userAgent` is a string; `userAgentData` is structured and more privacy-friendly.

Q3: Should detection replace responsive design?
A3: No, detection is supplementary; CSS media queries are preferred for layout changes.

Q4: Can you detect tablet separately from mobile?
A4: Yes, using keywords like "iPad" or device metrics.

Q5: Any modern alternative for feature detection?
A5: Use feature detection (like touch support) rather than relying solely on user agent.
*/
