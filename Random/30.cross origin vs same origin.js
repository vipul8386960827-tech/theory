/*
==================================================
SAME-ORIGIN vs CROSS-ORIGIN (SUPER SIMPLE)
==================================================

Think of it like houses:

- Your website = your house (app.com)
- Browser = security guard


--------------------------------------------------
✅ SAME-ORIGIN = SAME HOUSE
--------------------------------------------------

// Example:
app.com → app.com/api

// Meaning:
// - Request is going to the SAME website

// What browser does:
// - Trusts it ✅
// - Sends cookies automatically ✅
// - No restrictions ✅


--------------------------------------------------
❌ CROSS-ORIGIN = DIFFERENT HOUSE
--------------------------------------------------

// Example:
app.com → api.com

// Meaning:
// - Request is going to a DIFFERENT website

// What browser does:
// - Gets suspicious ⚠️
// - Blocks or restricts data ❌
// - Needs permission (CORS)


--------------------------------------------------
🧠 RULE TO REMEMBER
--------------------------------------------------

// Same origin  → same website → allowed
// Cross origin → different website → restricted


--------------------------------------------------
⚠️ EVEN SMALL DIFFERENCES MATTER
--------------------------------------------------

// These are CROSS-ORIGIN:

app.com → api.com          (different domain)
app.com → sub.app.com      (different subdomain)
https://app.com → http://app.com  (different protocol)
app.com → app.com:5000     (different port)


--------------------------------------------------
🍪 COOKIES BEHAVIOR
--------------------------------------------------

// Same-origin:
// - Cookies automatically sent ✅

// Cross-origin:
// - Cookies NOT sent by default ❌
// - Need explicit permission


--------------------------------------------------
🎯 FINAL LINE
--------------------------------------------------

// Same-origin  → browser trusts
// Cross-origin → browser checks permission

*/
