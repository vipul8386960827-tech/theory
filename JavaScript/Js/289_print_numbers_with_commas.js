/* 289_print_numbers_with_commas.js

=====================================================
Print Numbers with Commas in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "You can format numbers with commas as thousand separators 
  to improve readability using built-in methods or custom functions."

Key Points to Highlight:
- Common methods:
  1. toLocaleString()
  2. Intl.NumberFormat
  3. Regular expressions

Examples:

// 1. Using toLocaleString
const num = 1234567;
console.log(num.toLocaleString()); // "1,234,567"

// 2. Using Intl.NumberFormat
const formatter = new Intl.NumberFormat('en-US');
console.log(formatter.format(1234567)); // "1,234,567"

// 3. Using regex
function addCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
console.log(addCommas(1234567)); // "1,234,567"

Code Explanation:
- toLocaleString formats number according to locale conventions
- Intl.NumberFormat is more flexible for formatting
- Regex adds commas every 3 digits from the right

Real-Life Analogy:
- Like writing currency amounts in standard readable format: 1,000 instead of 1000.

Example / Usage:

const amount = 9876543;
console.log(`Total: ${amount.toLocaleString()} USD`); 
// Output: Total: 9,876,543 USD

Follow-Up Interview Questions:
- Q1: Does toLocaleString work with decimals?
  A1: Yes, it formats decimals according to locale.
- Q2: Can you format with different separators?
  A2: Yes, Intl.NumberFormat allows specifying different locales or options.
- Q3: Which is more performant: regex or toLocaleString?
  A3: toLocaleString is simpler and optimized; regex can be slower for large numbers.
- Q4: Can you handle negative numbers?
  A4: Yes, all methods handle negative numbers correctly.
- Q5: How to format numbers in Indian style (lakh/crore)?
  A5: Use locale 'en-IN': (12345678).toLocaleString('en-IN'); // "1,23,45,678"
*/
