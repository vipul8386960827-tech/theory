/* 28_zero_treated_as_missing_value.js

=====================================================
Scenario: Quantity 0 or empty string is replaced by a default value
=====================================================

The Question (how the interviewer asks it):
- "A user sets the quantity to 0 and the discount to 0, but after saving, the
  quantity shows 1 and the discount shows 10. Also, when the user clears the
  note field, it shows 'No note'. Find the bug."

What the interviewer is checking:
- Do I know the falsy values in JavaScript.
- Do I know the difference between || and ?? (and ||= vs ??=).
- Do I avoid == loose equality bugs.
- Do I think about what "missing" really means for each field.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I look for default values written with ||, like qty || 1. The || operator
   returns the right side for ANY falsy value.
2. The falsy values are: false, 0, -0, 0n, "" (empty string), null,
   undefined and NaN. So 0 and "" are treated as "missing", which is wrong
   for a quantity or an intentionally empty field.
3. I replace || with ?? (nullish coalescing). It uses the default only for
   null or undefined, so 0, "" and false are kept.
4. I check the same bug in other places: if (qty) checks, ||= assignments
   (use ??=), and function default parameters (these apply only for
   undefined, not null).
5. I check comparisons: == does type conversion, so 0 == "" and 0 == "0" are
   true, while null == 0 is false. I use === and explicit checks.
6. I agree with the product team what each field means: is "" a valid value
   or should it be stored as null? Then I add a test for 0, "" and null.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const form = { qty: 0, discount: 0, note: "", giftWrap: false };

// BUGGY: || treats 0, "" and false as missing
const qtyBad = form.qty || 1;              // 1  (user wanted 0)
const discountBad = form.discount || 10;   // 10 (user wanted 0)
const noteBad = form.note || "No note";    // "No note"
if (!form.qty) console.log("Quantity is required");  // wrong for 0

// FIXED: ?? only replaces null and undefined
const qty = form.qty ?? 1;                 // 0
const discount = form.discount ?? 10;      // 0
const note = form.note ?? "No note";       // ""
const giftWrap = form.giftWrap ?? true;    // false

// FIXED check: test for "missing", not for "falsy"
if (form.qty == null) console.log("Quantity is required");  // null or undefined
if (Number.isNaN(form.qty)) console.log("Quantity must be a number");

// ??= assigns only when the value is null or undefined
const settings = { pageSize: 0 };
settings.pageSize ||= 20;   // BUG: becomes 20
settings.pageSize = 0;
settings.pageSize ??= 20;   // stays 0

// Default parameters apply only for undefined
function setQty(q = 1) { return q; }
setQty(0);       // 0
setQty(null);    // null (not 1!)

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The bug is using || for defaults. || falls back for every falsy value,
  and 0, empty string and false are falsy, so valid user input gets
  replaced. I use ?? instead, which falls back only for null and undefined,
  and ??= for assignments. I also replace if (value) checks with explicit
  checks like value == null, and use === instead of == to avoid type
  conversion bugs."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Not knowing the full list of falsy values (especially 0, "", NaN).
- Mixing ?? with || or && without parentheses: a || b ?? c is a SyntaxError.
- Thinking default parameters also cover null.
- Using if (arr.length) is fine, but if (user.age) to check "age exists" is a
  bug for age 0.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is value == null ever acceptable?
A1: Yes. value == null is true only for null and undefined, so it is a short,
    common way to check both. Many style guides allow this one exception to
    "always use ===".

Q2: What is the difference between ?. and ???
A2: ?. (optional chaining) stops and returns undefined if the left side is
    null or undefined, instead of throwing. ?? gives a default value when the
    left side is null or undefined. They are often used together:
    user?.settings?.theme ?? "light".

Q3: How should a number input value be handled?
A3: input.value is always a string, so "" means empty and "0" means zero.
    I convert it with input.value === "" ? null : Number(input.value), or use
    input.valueAsNumber (NaN when empty) and check with Number.isNaN.
*/
