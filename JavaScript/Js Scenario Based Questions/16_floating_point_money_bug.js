/* 16_floating_point_money_bug.js

=====================================================
Scenario: Cart total shows 0.30000000000000004
=====================================================

The Question (how the interviewer asks it):
- "Our cart adds 0.1 + 0.2 and shows 0.30000000000000004. Some totals are off by
   one paisa or cent. Why does this happen and how do you handle money safely?"

What the interviewer is checking:
- Do you know JavaScript numbers are IEEE 754 double-precision floats?
- Do you know the safe approach: store money as integers in the smallest unit?
- Do you know toFixed is for display, not for calculation?
- Do you know Intl.NumberFormat for currency formatting?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the cause: numbers are stored in binary (IEEE 754, 64-bit). Values
   like 0.1 and 0.2 cannot be stored exactly in binary, so small errors appear.
   This is not a JavaScript bug; most languages behave the same.
2. The fix is to store money as integers in the smallest unit (cents or paise):
   10.99 becomes 1099. Integer math is exact up to Number.MAX_SAFE_INTEGER.
3. I convert to cents once, at the edge (when reading input or API data), using
   Math.round(value * 100), because value * 100 itself can be slightly off.
4. All adding, multiplying by quantity and discounts are done in cents. When a
   percentage creates a fraction, I round with a clear rule at that step.
5. I format only for display with Intl.NumberFormat, which adds the currency
   symbol and the correct separators for the locale.
6. Best practice: the backend should send amounts in minor units, and the server
   is the source of truth for the final price.

-----------------------------------------------------
Code Example
-----------------------------------------------------
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false

// Bug: floating point math on money
const items = [{ price: 1.1, qty: 3 }, { price: 0.2, qty: 1 }];
const badTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
console.log(badTotal); // 3.5000000000000004

// Fix: work in cents (integers)
const toCents = (amount) => Math.round(amount * 100);
const totalCents = items.reduce((s, i) => s + toCents(i.price) * i.qty, 0);
console.log(totalCents); // 350 (exact)

// Discount of 15%: round once, with a clear rule
const discounted = Math.round(totalCents * 0.85); // 298

// Display only
const fmt = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
console.log(fmt.format(discounted / 100)); // "₹2.98"

// Comparing floats when you must: use a tolerance
const nearlyEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;
console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "JavaScript numbers are binary floating point, so values like 0.1 cannot be
   stored exactly and small errors appear. For money I never calculate with
   decimals. I store amounts as integers in the smallest unit, like cents or
   paise, and do all math there. I round once at clear points, and only at the
   end I format for the user with Intl.NumberFormat."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using toFixed(2) in the middle of calculations. It returns a STRING, and it can
  round unexpectedly (1.005.toFixed(2) is "1.00").
- Converting with value * 100 without Math.round (1.15 * 100 is 114.99999999999999).
- Comparing floats with ===.
- Trusting the frontend total as the final price instead of the server.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is Number.MAX_SAFE_INTEGER and when do you need BigInt?
A1: It is 2^53 - 1 (9007199254740991). Above it integers lose precision. For very
    large amounts or IDs use BigInt (10n) or a string, but BigInt cannot mix with
    normal numbers in math.

Q2: Are there libraries for this?
A2: Yes, decimal.js, big.js or dinero.js. They are useful for currency
    conversion, taxes and many decimal places.

Q3: Why not just use Math.round(x * 100) / 100 everywhere?
A3: It is fine for display rounding, but the result is still a float, so errors
    can come back in the next calculation. Integers in minor units stay exact.
*/
