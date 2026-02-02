/* 234_language_specific_formatting.js

=====================================================
Language-Specific Formatting – Interview-Ready Answer
=====================================================

Definition:
- "Language-specific formatting refers to formatting numbers, 
  dates, and strings according to the conventions of a specific locale 
  using JavaScript’s `Intl` object."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Intl.NumberFormat**  
   - Formats numbers, currencies, and percentages according to locale.  
   - Example: grouping separators, decimal points, currency symbols.

2. **Intl.DateTimeFormat**  
   - Formats dates and times according to locale and style options.  
   - Example: `dd/mm/yyyy` vs `mm/dd/yyyy`.

3. **Intl.Collator**  
   - Compares strings according to language rules for sorting.  

4. **Locale Codes**  
   - Accepts BCP 47 language tags like `"en-US"`, `"fr-FR"`, `"hi-IN"`.

-----------------------------------------------------
Examples:

// Number formatting
const num = 1234567.89;
const nfUS = new Intl.NumberFormat("en-US").format(num);
const nfIN = new Intl.NumberFormat("hi-IN").format(num);
console.log(nfUS); // "1,234,567.89"
console.log(nfIN); // "12,34,567.89"

// Currency formatting
const salary = 5000;
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
console.log(usdFormatter.format(salary)); // "$5,000.00"

// Date formatting
const date = new Date();
const dtFormatter = new Intl.DateTimeFormat("de-DE", { dateStyle: "full" });
console.log(dtFormatter.format(date)); // e.g., "Montag, 22. September 2025"

// String comparison (sorting)
const collator = new Intl.Collator("fr-FR", { sensitivity: "base" });
const names = ["éclair", "eagle", "École"];
names.sort(collator.compare);
console.log(names); // ["eagle", "éclair", "École"]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Intl` API provides locale-aware operations.  
- Helps create globally consistent user interfaces.  
- Ensures numbers, dates, and strings follow local conventions.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of it as a translator that formats content according to local cultural norms.  
- Example: A website shows price in local currency and date in local format automatically.

-----------------------------------------------------
Example / Usage:

const amount = 987654.32;
const formattedAmount = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY"
}).format(amount);
console.log(formattedAmount); // "￥987,654"

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the main purpose of language-specific formatting?  
A1: To format numbers, dates, and strings according to user locale.

Q2: Which object is primarily used?  
A2: The `Intl` object (`NumberFormat`, `DateTimeFormat`, `Collator`, etc.).

Q3: How to format currency in a specific locale?  
A3: Use `Intl.NumberFormat` with `style: "currency"` and `currency` code.

Q4: How to handle different date formats?  
A4: Use `Intl.DateTimeFormat` with `dateStyle` and `timeStyle` options.

Q5: Can string sorting be locale-specific?  
A5: Yes, using `Intl.Collator` to compare strings according to language rules.
*/
