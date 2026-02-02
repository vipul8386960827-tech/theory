/* 271_obfuscation_vs_encryption.js

=====================================================
JavaScript Obfuscation vs Encryption – Interview-Ready Answer
=====================================================

Definition:
- "Obfuscation transforms code to make it hard to read while keeping it functional.  
   Encryption transforms data/code into unreadable format that requires a key to decode."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - **Obfuscation** → Protect source code from reverse engineering.  
   - **Encryption** → Protect sensitive data or code; requires decryption key.

2. **Functionality**  
   - **Obfuscation**: Code still runs as-is in browser or runtime.  
   - **Encryption**: Code/data cannot run without decryption.

3. **Reversibility**  
   - **Obfuscation**: Can be reverse-engineered with effort.  
   - **Encryption**: Only reversible with correct key.

4. **Use Cases**  
   - **Obfuscation**: Protect frontend JavaScript libraries, proprietary algorithms.  
   - **Encryption**: Protect passwords, API keys, sensitive user data.

5. **Tools**  
   - Obfuscation → javascript-obfuscator, UglifyJS.  
   - Encryption → CryptoJS, Node.js crypto module.

-----------------------------------------------------
Examples:

// Obfuscation (simplified)
function greet(name){console.log("Hello,"+name);} 
greet("Alice");

// Encryption using CryptoJS (AES)
const CryptoJS = require("crypto-js");
const secretMessage = "Hello Alice";
const encrypted = CryptoJS.AES.encrypt(secretMessage, "secret-key").toString();
const decrypted = CryptoJS.AES.decrypt(encrypted, "secret-key").toString(CryptoJS.enc.Utf8);
console.log(encrypted); // gibberish
console.log(decrypted); // Hello Alice

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Obfuscation = transforms code syntax and names; still runs normally.  
- Encryption = encodes data; requires key to get original content.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Obfuscation = writing a message in shorthand that only someone familiar can read.  
- Encryption = locking the message in a safe; only opens with correct key.

-----------------------------------------------------
Example / Usage:

// Protecting frontend logic
const calculate = (a, b) => a + b; // obfuscated for release
// Protecting sensitive info
const password = "myPass123"; // encrypted before sending to server

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can obfuscation secure code completely?  
A1: No, it only deters casual reverse engineering.

Q2: Can encrypted code run directly in browser?  
A2: No, it must be decrypted first.

Q3: Can obfuscation be combined with minification?  
A3: Yes, often minification is applied before obfuscation.

Q4: Which is better for protecting API keys in frontend?  
A4: Neither is fully secure; better to keep secrets on server side.

Q5: Are there performance differences?  
A5: Obfuscation has minimal impact; decryption adds runtime overhead.
*/
