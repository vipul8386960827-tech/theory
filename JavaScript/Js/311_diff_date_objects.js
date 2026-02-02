/* 311_diff_date_objects.js

=====================================================
Difference Between Date Objects – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript, Date objects represent points in time. 
  Differences between two Date objects are calculated using their 
  timestamps (milliseconds since Epoch)."

Key Points to Highlight:
- Date objects store time internally as milliseconds
- Can perform arithmetic operations by converting to timestamps
- Useful for calculating differences in days, hours, minutes, etc.

Examples:

const date1 = new Date('2025-09-01');
const date2 = new Date('2025-09-22');

const diffMs = date2.getTime() - date1.getTime();
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log(diffMs);   // Milliseconds difference
console.log(diffDays); // 21

// Negative difference
const date3 = new Date('2025-08-01');
const diffMs2 = date1.getTime() - date3.getTime();
console.log(diffMs2); // Positive 31 days in ms

Code Explanation:
- getTime() converts Date to milliseconds
- Subtracting timestamps gives duration in ms
- Can convert ms to other units: seconds, minutes, hours, days

Real-Life Analogy:
- Like calculating the number of days between two calendar dates

Example / Usage:

function daysBetween(d1, d2) {
  return Math.abs(d2.getTime() - d1.getTime()) / (1000*60*60*24);
}

console.log(daysBetween(new Date('2025-01-01'), new Date('2025-12-31'))); // 364

Follow-Up Interview Questions:
- Q1: Can you subtract Date objects directly?
  A1: No, use getTime() or valueOf() to get numeric difference.
- Q2: How to handle timezones in date difference?
  A2: Dates are in local time by default; use UTC methods for consistency.
- Q3: Difference between getTime() and valueOf()?
  A3: Both return milliseconds since Epoch; valueOf() is shorthand.
- Q4: Can you get difference in hours or minutes directly?
  A4: Divide milliseconds appropriately.
- Q5: How to get negative differences?
  A5: Subtract earlier date from later date; negative indicates order.
*/
