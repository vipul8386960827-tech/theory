/*
=====================================
Two Ways of Formatting in React Intl
=====================================

Definition:
React Intl provides two main ways to format messages, dates, numbers, and 
currencies in React applications: using **components** and **programmatic API (hooks or format functions)**.

-------------------------------------
Key Points:
-------------------------------------
1. **Component-Based Formatting**
   - Use built-in components like <FormattedMessage>, <FormattedNumber>, 
     <FormattedDate>, <FormattedTime>.  
   - Declarative approach: embed directly in JSX.  
   - Automatically re-renders when locale changes.

2. **Programmatic/Imperative Formatting**
   - Use `useIntl()` hook in functional components or `injectIntl` HOC in class components.  
   - Gives access to `intl.formatMessage`, `intl.formatNumber`, `intl.formatDate`, etc.  
   - Useful for formatting values outside JSX or for complex logic before rendering.

-------------------------------------
Example 1: Component-Based Formatting
-------------------------------------
import React from "react";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";

const messages = { greeting: "Hello, {name}! Total: {amount}" };

function App() {
  return (
    <IntlProvider locale="en" messages={messages}>
      <p>
        <FormattedMessage 
          id="greeting" 
          values={{ name: "Kaizer", amount: <FormattedNumber value={12345.67} style="currency" currency="USD" /> }} 
        />
      </p>
    </IntlProvider>
  );
}

-------------------------------------
Example 2: Programmatic Formatting with useIntl
-------------------------------------
import React from "react";
import { IntlProvider, useIntl } from "react-intl";

const messages = { greeting: "Hello, {name}! Total: {amount}" };

function App() {
  const intl = useIntl();
  const formattedAmount = intl.formatNumber(12345.67, { style: "currency", currency: "USD" });
  const message = intl.formatMessage({ id: "greeting" }, { name: "Kaizer", amount: formattedAmount });

  return <p>{message}</p>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Component-based formatting = using pre-made form templates 📝.  
- Programmatic formatting = manually writing custom letters ✍️ using formatting functions.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Which is better, component-based or programmatic formatting?
A1: Components are simple for JSX; programmatic is better for calculations or outside JSX.

Q2: Can we mix both approaches?
A2: Yes, you can use components for UI and useIntl for computed values.

Q3: Can programmatic formatting work in class components?
A3: Yes, using `injectIntl` HOC to access the `intl` object.

Q4: Does component-based formatting re-render on locale change?
A4: Yes, automatically.

Q5: Can we format plural messages with both approaches?
A5: Yes, use ICU message syntax in both components and formatMessage.
*/
