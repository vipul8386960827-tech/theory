/*
=====================================
React Intl
=====================================

Definition:
React Intl is a library used for internationalization (i18n) in React 
applications. It helps format messages, numbers, dates, times, and 
currencies based on locale, making apps usable in multiple languages.

-------------------------------------
Key Points:
-------------------------------------
- Part of the FormatJS project.  
- Provides <IntlProvider> to set locale and messages for the app.  
- Supports components like <FormattedMessage>, <FormattedNumber>, <FormattedDate>.  
- Allows dynamic switching of languages.  
- Can use message descriptors or IDs for easy translation.  

-------------------------------------
Example 1: Basic Setup
-------------------------------------
import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";

const messagesInEnglish = {
  greeting: "Hello, {name}!",
};

function App() {
  return (
    <IntlProvider locale="en" messages={messagesInEnglish}>
      <h2>
        <FormattedMessage id="greeting" values={{ name: "Kaizer" }} />
      </h2>
    </IntlProvider>
  );
}

-------------------------------------
Example 2: Number and Date Formatting
-------------------------------------
import { FormattedNumber, FormattedDate } from "react-intl";

function Stats() {
  return (
    <div>
      <p>
        Total Price: <FormattedNumber value={12345.67} style="currency" currency="INR" />
      </p>
      <p>
        Today's Date: <FormattedDate value={new Date()} year="numeric" month="long" day="2-digit" />
      </p>
    </div>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- React Intl = multilingual guide 🌏:  
- Formats content, numbers, and dates according to the user's language and region.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: How do you switch languages dynamically?
A1: Change the `locale` and `messages` props in <IntlProvider>.

Q2: Can React Intl handle plurals?
A2: Yes, using ICU message syntax in messages: `{count, plural, one {# item} other {# items}}`.

Q3: Difference between FormattedMessage and FormattedHTMLMessage?
A3: FormattedHTMLMessage supports HTML tags in translation strings but is less safe.

Q4: Can you load messages asynchronously?
A4: Yes, fetch translation JSON files and pass to <IntlProvider> dynamically.

Q5: How to handle nested messages?
A5: Use dot notation in IDs, e.g., `user.profile.greeting`, and corresponding nested JSON.
*/
