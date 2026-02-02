/* 241_intl_object_properties.js

=====================================================
JavaScript Intl Object Properties – Interview-Ready Answer
=====================================================

Definition:
- "The `Intl` object in JavaScript provides language-sensitive functionality 
  for number, date, time, and string formatting. Its properties and constructors 
  allow developers to format data according to different locales."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Provide built-in internationalization support.  
   - Format numbers, currencies, dates, times, and collations for various locales.

2. **Key Properties / Constructors**  
   - `Intl.Collator` → Compare strings according to locale.  
   - `Intl.NumberFormat` → Format numbers, currencies, percentages.  
   - `Intl.DateTimeFormat` → Format dates and times.  
   - `Intl.ListFormat` → Format lists according to locale.  
   - `Intl.RelativeTimeFormat` → Format relative time like “3 days ago”.  
   - `Intl.Locale` → Represents locale information.

3. **Usage**  
   - Each constructor takes a locale string (e.g., "en-US") and optional options.

-----------------------------------------------------
Examples:

// Example 1: Number formatting
const number = 1234567.89;
const formatter = new Intl.NumberFormat('de-DE');
console.log(formatter.format(number)); // 1.234.567,89

// Example 2: Date formatting
const date = new Date();
const dateFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
console.log(dateFormatter.format(date)); // e.g., Monday, 22 September 2025

// Example 3: Collator for string comparison
const collator = new Intl.Collator('en', { sensitivity: 'base' });
console.log(['a', 'B', 'c'].sort(collator.compare)); // ["a", "B", "c"]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Intl` constructors create objects that format or compare values based on locale.  
- Options allow customization (style, currency, numbering system, date format).  
- Helps in creating applications for multiple languages and regions.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Intl = international toolkit: like a translator for numbers, dates, and lists, ensuring proper presentation per country or language.

-----------------------------------------------------
Example / Usage:

// Currency formatting
const price = 1234.5;
const currencyFormatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log(currencyFormatter.format(price)); // ¥1,235

// Relative time formatting
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // yesterday

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `Intl.NumberFormat` and `toLocaleString()`?  
A1: `toLocaleString()` is simpler, while `Intl.NumberFormat` provides more control and options.

Q2: Can Intl handle multiple locales at once?  
A2: You can pass an array of locales; it picks the best match.

Q3: Are Intl objects immutable?  
A3: Yes, formatting objects themselves are immutable.

Q4: Which Intl constructor is used for sorting?  
A4: `Intl.Collator`.

Q5: How to format a date relative to today?  
A5: Use `Intl.RelativeTimeFormat`.
*/
