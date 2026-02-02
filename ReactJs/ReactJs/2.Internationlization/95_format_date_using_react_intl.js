/* 95_format_date_using_react_intl.js */

/*
=====================================
Format Date Using React Intl
=====================================

Definition:
React Intl allows formatting dates according to the current locale 
using <FormattedDate> component or `intl.formatDate` function.  
It automatically applies locale-specific formatting for day, month, 
year, and time.

-------------------------------------
Key Points:
-------------------------------------
- Functional components: use <FormattedDate> or `useIntl().formatDate`.  
- Class components: use <FormattedDate> or `injectIntl` for programmatic formatting.  
- Supports various options: weekday, year, month, day, hour, minute, second.  
- Can be combined with time formatting.

-------------------------------------
Example 1: Using <FormattedDate> Component
-------------------------------------
import React from "react";
import { IntlProvider, FormattedDate } from "react-intl";

function App() {
  return (
    <IntlProvider locale="en-US">
      <p>
        Today is:{" "}
        <FormattedDate 
          value={new Date()} 
          year="numeric" 
          month="long" 
          day="2-digit" 
          weekday="long" 
        />
      </p>
    </IntlProvider>
  );
}

-------------------------------------
Example 2: Using useIntl Hook (Functional Component)
-------------------------------------
import React from "react";
import { IntlProvider, useIntl } from "react-intl";

function DateDisplay() {
  const intl = useIntl();
  const formattedDate = intl.formatDate(new Date(), {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });

  return <p>Today is: {formattedDate}</p>;
}

function App() {
  return (
    <IntlProvider locale="en-GB">
      <DateDisplay />
    </IntlProvider>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- FormatDate = multilingual calendar 🗓️:  
- Shows dates in the format the user expects based on region and language.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between FormattedDate component and formatDate function?
A1: Component is declarative in JSX; formatDate is programmatic for use in variables or calculations.

Q2: Can you format date with time together?
A2: Yes, use <FormattedDate> for date and <FormattedTime> for time, or `intl.formatDate` + `intl.formatTime`.

Q3: Does it automatically handle locale differences?
A3: Yes, based on locale provided in <IntlProvider>.

Q4: Can you format relative dates like “2 days ago”?
A4: Use <FormattedRelativeTime> component for that.

Q5: Can you provide custom date formats?
A5: Yes, use options object with day, month, year, weekday, hour, minute, second.
*/
