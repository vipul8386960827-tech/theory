/* 94_access_current_locale_react_intl.js */

/*
=====================================
Access Current Locale in React Intl
=====================================

Definition:
In React Intl, the current locale represents the language and regional 
settings being used by the <IntlProvider>. You can access it to 
conditionally render content or perform locale-specific logic.

-------------------------------------
Key Points:
-------------------------------------
- The locale is passed as a prop to <IntlProvider>.  
- Functional components: use `useIntl()` hook to access `intl.locale`.  
- Class components: use `injectIntl` HOC to access `this.props.intl.locale`.  
- Useful for conditional rendering, formatting, or analytics.

-------------------------------------
Example 1: Functional Component Using useIntl
-------------------------------------
import React from "react";
import { IntlProvider, useIntl } from "react-intl";

const messages = {
  greeting: "Hello!",
};

function LocaleDisplay() {
  const intl = useIntl();
  return <p>Current Locale: {intl.locale}</p>;
}

function App() {
  return (
    <IntlProvider locale="en-US" messages={messages}>
      <LocaleDisplay />
    </IntlProvider>
  );
}

-------------------------------------
Example 2: Class Component Using injectIntl
-------------------------------------
import React from "react";
import { IntlProvider, injectIntl } from "react-intl";

class LocaleDisplay extends React.Component {
  render() {
    const { intl } = this.props;
    return <p>Current Locale: {intl.locale}</p>;
  }
}

const LocaleDisplayWithIntl = injectIntl(LocaleDisplay);

function App() {
  const messages = { greeting: "Hello!" };
  return (
    <IntlProvider locale="fr-FR" messages={messages}>
      <LocaleDisplayWithIntl />
    </IntlProvider>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Current locale = the language tag 🏷️ on your app.  
- Determines how dates, numbers, currencies, and messages are displayed.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you change the locale at runtime?
A1: Yes, by updating the `locale` prop on <IntlProvider>, all child components re-render.

Q2: How to access current locale in a non-component file?
A2: Pass the locale as prop or context to that file; IntlProvider does not export it globally.

Q3: Can this be used for conditional rendering?
A3: Yes, e.g., show different images or layouts based on locale.

Q4: Difference between locale and messages?
A4: Locale = language/region code; messages = translations for that locale.

Q5: Does React Intl support automatic locale detection?
A5: Not directly; you can detect browser locale using `navigator.language` and pass to <IntlProvider>.
*/
