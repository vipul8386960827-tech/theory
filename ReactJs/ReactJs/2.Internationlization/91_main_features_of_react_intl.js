/*
=====================================
Main Features of React Intl
=====================================

Definition:
React Intl is a library for internationalization (i18n) in React apps, 
enabling apps to support multiple languages and locales efficiently.

-------------------------------------
Main Features:
-------------------------------------
1. **Localization of Text**
   - Use <FormattedMessage> to display translated text.
   - Supports variables and dynamic values in strings.

2. **Date and Time Formatting**
   - <FormattedDate> and <FormattedTime> automatically format dates/times 
     based on locale.
   - Supports custom formats (short, long, numeric, etc.).

3. **Number and Currency Formatting**
   - <FormattedNumber> formats numbers, percentages, and currencies according 
     to locale.
   - Handles currency symbols, separators, and decimals automatically.

4. **Pluralization and Gender**
   - Supports ICU message syntax for plurals and gender-sensitive messages.
   - Example: `{count, plural, one {# item} other {# items}}`

5. **Message IDs and Translation Management**
   - Uses message IDs for mapping translations across locales.
   - Allows loading translations dynamically from JSON files.

6. **Dynamic Language Switching**
   - Locale and messages can be updated at runtime to switch languages 
     without page reload.

7. **Integration with React**
   - Provides hooks and components for React apps.
   - Works with both class and functional components.

-------------------------------------
Real-Life Analogy:
-------------------------------------
React Intl = professional translator 🗣️ + locale-aware formatter 🧭:  
- Automatically adjusts messages, numbers, and dates to match user's language and region.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: How do you handle multiple languages in React Intl?
A1: Create JSON message files per language and switch `locale` + `messages` in <IntlProvider>.

Q2: Can React Intl handle dynamic content in messages?
A2: Yes, use placeholders and pass values via `values` prop.

Q3: Difference between FormattedMessage and useIntl hook?
A3: FormattedMessage is a component; useIntl provides programmatic access to formatting functions.

Q4: How is pluralization handled?
A4: Using ICU syntax inside message strings with `{count, plural, one {...} other {...}}`.

Q5: Can React Intl handle nested translations?
A5: Yes, using dot notation in message IDs and nested JSON structure.
*/
