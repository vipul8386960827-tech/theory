/* 233_intl_object.js

=====================================================
Intl Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `Intl` object in JavaScript provides language-sensitive 
   functionalities for string comparison, number formatting, 
   date and time formatting, and more, enabling internationalization (i18n)."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Helps format data according to different locales and cultures.  

2. **Common Constructors**  
   - `Intl.Collator` → compares strings according to locale  
   - `Intl.NumberFormat` → formats numbers, currencies, percentages  
   - `Intl.DateTimeFormat` → formats dates and times  
   - `Intl.ListFormat` → formats lists  
   - `Intl.RelativeTimeFormat` → formats relative time (e.g., "2 days ago")  

3. **Locale Support**  
   - Accepts locale codes like `"en-US"`, `"fr-FR"`, `"hi-IN"`.  

4. **Options**  
   - Many constructors accept options for style, numbering system, currency, etc.

-----------------------------------------------------
Examples:

// Example 1: Number formatting
const number = 1234567.89;
const formatter = new Intl.NumberFormat("en-US");
console.log(formatter.format(number)); // "1,234,567.89"

// Currency formatting
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});
console.log(currencyFormatter.format(5000)); // "₹5,000.00"

// Example 2: Date formatting
const date = new Date();
const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" });
console.log(dateFormatter.format(date)); // e.g., "Sunday, 22 September 2025"

// Example 3: String comparison
const collator = new Intl.Collator("en", { sensitivity: "base" });
console.log(collator.compare("a", "A")); // 0 (considered equal)

// Example 4: Relative time
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(rtf.format(-2, "day")); // "2 days ago"

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Intl` provides tools for locale-aware operations.  
- Avoids manual formatting for different regions.  
- Makes applications globally friendly and culturally aware.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of `Intl` as a universal translator that adjusts numbers, 
  dates, and text to match the user's country or language conventions.

-----------------------------------------------------
Example / Usage:

const price = 1234.56;
const formattedPrice = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY"
}).format(price);
console.log(formattedPrice); // "￥1,235"

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the main purpose of the `Intl` object?  
A1: To provide internationalization features like locale-sensitive formatting.  

Q2: Can `Intl` handle currency and number formatting?  
A2: Yes, using `Intl.NumberFormat`.  

Q3: Difference between `Intl.DateTimeFormat` and native `toLocaleDateString`?  
A3: Both work similarly; `Intl.DateTimeFormat` provides more options and flexibility.  

Q4: Can `Intl` be used for string comparison?  
A4: Yes, using `Intl.Collator` for locale-aware comparison.  

Q5: Is `Intl` supported in all modern browsers?  
A5: Yes, most modern browsers support it, but older versions may require polyfills.  
*/
