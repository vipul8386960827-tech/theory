/* 96_same_origin_policy.js

=====================================================
Same-Origin Policy in Web Development
=====================================================

Definition:
The Same-Origin Policy (SOP) is a critical security concept in web browsers that 
restricts how documents and scripts loaded from one origin can interact with 
resources from another origin. It helps prevent malicious websites from accessing 
sensitive data on another site via the user’s browser.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Origin = protocol + domain + port.
   Example:
   - https://example.com:443/page
   - Origin = https + example.com + 443

2. What SOP Restricts:
   - JavaScript cannot read responses from a different origin (blocks data theft).
   - DOM access is limited across different origins.
   - Cookies and localStorage are not shared across origins.

3. What SOP Allows:
   - Embedding images, scripts, and styles from other origins.
   - Navigating to another site by setting window.location.
   - Using <iframe> (but with restricted cross-origin access).

4. Bypassing SOP (Securely):
   - **CORS (Cross-Origin Resource Sharing)**: Server explicitly allows cross-origin requests.
   - **JSONP**: Legacy workaround for GET requests.
   - **PostMessage API**: Safe communication between windows/iframes.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of SOP as a locked office building:
  - You can see the building (like loading images or scripts).
  - But you cannot enter offices (read data) without a key.
  - CORS is like the building owner giving you a visitor pass.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is the Same-Origin Policy important?  
A1: It protects users from cross-site scripting attacks and prevents malicious 
    sites from stealing sensitive data from authenticated sessions.

Q2: How does CORS work with SOP?  
A2: CORS adds specific HTTP headers (like Access-Control-Allow-Origin) that tell 
    the browser it’s safe to allow cross-origin communication.

Q3: Can SOP prevent CSRF (Cross-Site Request Forgery)?  
A3: No, SOP doesn’t block sending requests cross-origin; it only blocks reading responses.

Q4: What is the difference between SOP and CORS?  
A4: SOP is a security restriction enforced by browsers; CORS is a mechanism that 
    servers use to relax those restrictions under controlled conditions.
*/
