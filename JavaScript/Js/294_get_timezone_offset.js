/* 294_get_timezone_offset.js

=====================================================
Get Timezone Offset in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The timezone offset is the difference, in minutes, between UTC and local time of the system. 
  JavaScript provides getTimezoneOffset() method on Date objects to retrieve this value."

Key Points to Highlight:
- date.getTimezoneOffset() returns offset in minutes
  - Positive → local time is behind UTC
  - Negative → local time is ahead of UTC
- Can be used to adjust times for display or calculations
- Note: Returns minutes, not hours; divide by 60 for hours

Examples:

const now = new Date();
const offsetMinutes = now.getTimezoneOffset();
console.log('Timezone offset in minutes:', offsetMinutes);
console.log('Timezone offset in hours:', offsetMinutes / 60);

Code Explanation:
- Create Date object
- Call getTimezoneOffset() to get difference from UTC in minutes
- Divide by 60 to get hours if needed

Real-Life Analogy:
- Like comparing your local clock to Greenwich Mean Time (GMT) to see how many hours ahead/behind you are

Example / Usage:

// Adjust UTC date to local time
const utcDate = new Date('2025-09-22T12:00:00Z');
const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
console.log('Local date:', localDate);

Follow-Up Interview Questions:
- Q1: Why does getTimezoneOffset return positive for some timezones?
  A1: Positive value indicates local time is behind UTC (e.g., US timezones).
- Q2: Is DST considered?
  A2: Yes, getTimezoneOffset reflects current daylight saving adjustments.
- Q3: Can offset change throughout the year?
  A3: Yes, due to daylight saving time changes.
- Q4: How to get timezone name?
  A4: Use Intl.DateTimeFormat().resolvedOptions().timeZone
- Q5: How to convert local time to UTC?
  A5: Subtract getTimezoneOffset (in milliseconds) from local Date.
*/
