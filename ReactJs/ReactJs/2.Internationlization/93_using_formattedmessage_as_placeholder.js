/* 93_using_formattedmessage_as_placeholder.js */

/*
=====================================
Using FormattedMessage as Placeholder in React Intl
=====================================

Definition:
In React Intl, <FormattedMessage> can be used to provide translated 
text not only for visible content but also as attributes, such as 
placeholders in input fields.

-------------------------------------
Key Points:
-------------------------------------
- Placeholders are attribute values in input elements.  
- You cannot directly use <FormattedMessage> as JSX inside the attribute.  
- Use the `intl.formatMessage` function or render prop pattern to assign 
  translated text to attributes.  
- Works with both functional and class components.

-------------------------------------
Example 1: Functional Component Using useIntl Hook
-------------------------------------
import React from "react";
import { IntlProvider, useIntl } from "react-intl";

const messages = { searchPlaceholder: "Search here..." };

function SearchInput() {
  const intl = useIntl();

  return (
    <input 
      type="text" 
      placeholder={intl.formatMessage({ id: "searchPlaceholder" })} 
    />
  );
}

function App() {
  return (
    <IntlProvider locale="en" messages={messages}>
      <SearchInput />
    </IntlProvider>
  );
}

-------------------------------------
Example 2: Using FormattedMessage with render prop
-------------------------------------
import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";

const messages = { searchPlaceholder: "Search here..." };

function SearchInput() {
  return (
    <FormattedMessage id="searchPlaceholder">
      {(placeholder) => <input type="text" placeholder={placeholder} />}
    </FormattedMessage>
  );
}

function App() {
  return (
    <IntlProvider locale="en" messages={messages}>
      <SearchInput />
    </IntlProvider>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Placeholder = hint sign 🪧 inside a text box.  
- Using FormattedMessage = multilingual hint that changes with locale.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you use <FormattedMessage> directly inside placeholder attribute?
A1: No, you need to use `intl.formatMessage` or render prop.

Q2: Which method is better, useIntl or render prop?
A2: useIntl is cleaner and more convenient in functional components.

Q3: Can this be used in class components?
A3: Yes, use `injectIntl` HOC to get `intl` object.

Q4: Does it automatically update on locale change?
A4: Yes, both useIntl and render prop methods update when <IntlProvider> locale changes.

Q5: Can this approach be used for other attributes?
A5: Yes, for any string attribute like title, alt, aria-label.
*/
