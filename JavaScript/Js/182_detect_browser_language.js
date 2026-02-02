/* 182_detect_browser_language.js

=====================================================
Detecting Browser Language in JavaScript
=====================================================

Definition (Interview-friendly):
- "You can detect the user's preferred language using the 
  `navigator.language` or `navigator.languages` property in JavaScript."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const userLang = navigator.language || navigator.userLanguage;
     console.log(userLang); // e.g., "en-US"

2. Multiple Preferred Languages
   - Example:
     const languages = navigator.languages;
     console.log(languages); // ["en-US", "fr-FR", "de-DE"]

3. Using for Localization
   - Example:
     if (userLang.startsWith("fr")) {
         console.log("Load French content");
     } else {
         console.log("Load default content");
     }

4. Browser Compatibility
   - `navigator.language` works in most modern browsers.
   - `navigator.userLanguage` is for older IE versions.

5. Example in Function
   - Example:
     function getBrowserLanguage() {
         return navigator.language || navigator.userLanguage || "en";
     }
     console.log(getBrowserLanguage());

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Detecting browser language is like **asking the user their preferred language**:
  - You can then serve content in the appropriate language automatically.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between navigator.language and navigator.languages?
A1: navigator.language returns the preferred language; navigator.languages returns an array of preferred languages in order.

Q2: Can the language be changed by the user?
A2: Yes, changing browser settings can change these values.

Q3: How to handle multiple languages in your app?
A3: Use navigator.languages and fallback logic to select the best supported language.

Q4: What is the default if detection fails?
A4: Can provide a default like "en" or app's default language.

Q5: Are these properties writable?
A5: No, they are read-only.
*/
