/*
122_validate_email.js – Interview-Ready Answer

"In JavaScript, validating email addresses is commonly done using regular 
expressions to check for proper syntax before processing user input."

Key Points:

1️⃣ Definition:
- Email validation ensures the input matches standard email format.
- Typically uses regex patterns to check for presence of '@', domain, and valid characters.

2️⃣ Syntax Example:

// Simple regex validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Usage
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));    // false

3️⃣ Real-Life Analogies:

Global Analogy: Checking a mailing address for correct format before sending a letter.
India-specific Analogy: Validating email when registering for PAN or Aadhaar online.
Web Analogy: Signup forms on websites that show error if email format is incorrect.

4️⃣ Code Explanation:

- /^[^\s@]+@[^\s@]+\.[^\s@]+$/ explained:
  - ^ start of string
  - [^\s@]+ one or more characters except whitespace or '@'
  - @ literal '@' symbol
  - [^\s@]+ one or more characters except whitespace or '@' (domain)
  - \. literal dot
  - [^\s@]+ one or more characters after dot (TLD)
  - $ end of string
- test() returns true if pattern matches.

5️⃣ Example / Usage:

const emails = ["user@example.com", "hello@world", "name@domain.co"];
emails.forEach(email => {
    if (validateEmail(email)) {
        console.log(`${email} is valid`);
    } else {
        console.log(`${email} is invalid`);
    }
});

// Output:
// user@example.com is valid
// hello@world is invalid
// name@domain.co is valid

6️⃣ Follow-Up Interview Questions:

Q1: Is regex validation enough for emails?  
A1: Regex checks syntax but cannot verify if email actually exists.

Q2: Can regex handle all valid email formats?  
A2: Complex emails may require advanced regex; simple regex may not cover all edge cases.

Q3: Difference between client-side and server-side validation?  
A3: Client-side validates before submission; server-side ensures security and prevents bad data.

Q4: How to make regex case-insensitive?  
A4: Add 'i' flag: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

Q5: Alternatives to regex for email validation?  
A5: Use built-in HTML input type="email" or server-side validation libraries.
*/
