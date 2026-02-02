/* 172_convert_date_timezone.js

=====================================================
Converting Dates Between Time Zones in JavaScript
=====================================================

Definition:
- JavaScript `Date` objects store time in UTC internally.
- Time zone conversions are done when displaying or formatting dates.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `toLocaleString()` with Time Zone
   - Example:
     const date = new Date("2025-09-22T12:00:00Z");
     // Convert to New York time
     const nyTime = date.toLocaleString("en-US", { timeZone: "America/New_York" });
     console.log(nyTime);

2. Using `toLocaleDateString()` or `toLocaleTimeString()`
   - Example:
     console.log(date.toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" }));
     console.log(date.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata" }));

3. Using Intl.DateTimeFormat
   - Example:
     const formatter = new Intl.DateTimeFormat("en-US", {
         timeZone: "Europe/London",
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit"
     });
     console.log(formatter.format(date));

4. Using Libraries (Recommended for Complex Cases)
   - Libraries like `moment-timezone` or `date-fns-tz` simplify conversions.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Converting time zones is like **changing the clocks when you travel**:
  - The actual moment in time is the same, only the local display changes.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does changing the system time zone affect Date objects?
A1: No, Date stores time in UTC; formatting/display changes with local time zone.

Q2: Why use `Intl.DateTimeFormat` instead of manual calculations?
A2: Handles daylight saving, locale formats, and is reliable.

Q3: Can you convert time zones without a library?
A3: Yes, using `toLocaleString` and `Intl` APIs.

Q4: How to get current UTC time as string?
A4: Use `new Date().toISOString()`.

Q5: Are `moment` and `date-fns` still recommended?
A5: `moment` is legacy; `date-fns` or `luxon` is recommended for modern apps.
*/
