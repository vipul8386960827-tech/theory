/* 27_timezone_bug_in_dates.js

=====================================================
Scenario: Users in another country see the wrong date (off by one day)
=====================================================

The Question (how the interviewer asks it):
- "A user picks the birthday 2024-01-15. Users in India see it correctly, but
  users in the USA see January 14. The data in the database looks fine.
  What is going on and how do you fix it?"

What the interviewer is checking:
- Do I know how new Date(string) parses different formats (UTC vs local).
- Do I understand that a Date is one moment in time (a UTC timestamp).
- Do I store and display dates correctly (UTC ISO, Intl.DateTimeFormat).
- Do I know when to use a library or the Temporal API.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the parsing rule: a date-only string like "2024-01-15" is parsed
   as UTC midnight. A date-time string without offset, like
   "2024-01-15T00:00", is parsed as LOCAL time. This difference surprises
   many developers.
2. UTC midnight on Jan 15 is still Jan 14 in the evening in the USA (UTC-5),
   so getDate() or toLocaleDateString() shows the 14th there.
3. I separate two kinds of data: an exact moment (order created, meeting
   time) and a calendar date (birthday, holiday). A birthday has no time and
   no timezone, so I keep it as the string "2024-01-15" and do not turn it
   into a Date at all, or I always read and format it in UTC.
4. For moments, I store UTC ISO strings (toISOString) or timestamps in the
   database, and convert to the user's timezone only when displaying.
5. For display I use Intl.DateTimeFormat with the user's locale and, if
   needed, an explicit timeZone option.
6. For complex date math I use date-fns (with date-fns-tz) or Luxon. The new
   Temporal API (Temporal.PlainDate for calendar dates) solves this cleanly;
   it is shipping in Firefox and Chrome but is not yet in every browser, so
   I check support or use a polyfill.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: date-only string is parsed as UTC midnight
const birthday = new Date("2024-01-15");
birthday.getDate();                // 14 in New York, 15 in India

// BUGGY 2: toISOString always converts to UTC
const local = new Date(2024, 0, 15);          // local midnight in India
local.toISOString().slice(0, 10);             // "2024-01-14" in India!

// FIXED for calendar dates: keep it as a plain string, format in UTC
const value = "2024-01-15";
const [y, m, d] = value.split("-").map(Number);
const asUtc = new Date(Date.UTC(y, m - 1, d));
new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })
  .format(asUtc);                              // "January 15, 2024" everywhere

// FIXED for moments: store UTC, display in the user's timezone
const createdAt = new Date().toISOString();   // "2024-01-15T09:30:00.000Z"
new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",                         // user's locale and timezone
}).format(new Date(createdAt));

// Modern: Temporal (check browser support or use a polyfill)
// Temporal.PlainDate.from("2024-01-15").toLocaleString("en-US");

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "new Date('2024-01-15') is parsed as UTC midnight, and in timezones behind
  UTC that moment is still the previous day, so the user sees the 14th. A
  birthday is a calendar date, not a moment, so I keep it as a 'YYYY-MM-DD'
  string or format it with timeZone UTC. For real moments I store UTC ISO
  strings and display them with Intl.DateTimeFormat in the user's timezone.
  For complex cases I use date-fns or the new Temporal API."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using toISOString().slice(0, 10) to get "today"; it gives the UTC date,
  which can be yesterday or tomorrow locally.
- Adding or subtracting the timezone offset by hand to "fix" it.
- Parsing non-standard strings like "01/15/2024" with new Date; the result
  depends on the browser.
- Testing only in your own timezone. Test with TZ=America/New_York in Node
  or the DevTools Sensors panel to override the timezone.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does a JavaScript Date actually store?
A1: A single number: milliseconds since 1 January 1970 UTC. It has no
    timezone inside. Methods like getDate() use the local timezone, and
    getUTCDate() uses UTC.

Q2: How do you get the user's timezone?
A2: Intl.DateTimeFormat().resolvedOptions().timeZone, for example
    "America/New_York". I can send it to the server if it needs to schedule
    things in the user's local time.

Q3: Why is adding 24 hours not always "next day"?
A3: Because of daylight saving time, a day can be 23 or 25 hours long. For
    calendar math I use setDate(d.getDate() + 1), date-fns addDays, or
    Temporal, not milliseconds.
*/
