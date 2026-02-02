/* 64_useTranslation_hook */
/*
Key Points (Interviewer Keywords + Explanation):
1. useTranslation Hook – Provided by i18n libraries like `react-i18next`
   or `next-i18next` for Next.js apps.

2. Purpose – Allows components to access translation functions
   and current language.

3. Implementation – Import `useTranslation` and use the `t` function
   to get translated strings.

4. Features –
   - Supports multiple namespaces for organizing translations.
   - Can detect current language/locale.
   - Works with Pages Router and App Router.

5. Benefits – Makes it easy to render multi-language content dynamically
   and switch languages in UI.
*/

/*
Definition (Using Specific Terms):
`useTranslation` is a React hook that provides the `t` function to translate
keys based on the current locale. It is commonly used with `next-i18next`
to render multi-language content in Next.js applications.
*/

/*
Code Example (Pages Router):

// pages/index.js
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation("common"); // namespace: common

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}

// Translation files:
// public/locales/en/common.json
// { "welcome": "Welcome", "description": "This is an example" }
// public/locales/fr/common.json
// { "welcome": "Bienvenue", "description": "Ceci est un exemple" }
*/

/*
Code Example (App Router):

// app/page.js
"use client"; // Required in App Router for hooks
import { useTranslation } from "next-i18next";

export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
*/

/*
Important Notes:
- "use client" is required in App Router when using hooks.
- Always specify namespace if translations are organized that way.
- Can be used to switch languages dynamically.
- Works with server-side translations as well when integrated with next-i18next.
- Helps in building fully internationalized Next.js applications.
*/

/*
Follow-up Questions + Answers:

Q1: What is useTranslation in Next.js?
A1: A hook to access the `t` function for translating keys based on current locale.

Q2: How do you specify which translation to use?
A2: Pass the namespace to useTranslation, e.g., useTranslation("common").

Q3: Can you use it in App Router?
A3: Yes, but the component must be a client component ("use client").

Q4: How do you manage multiple languages?
A4: Create separate JSON files for each locale and namespace.

Q5: Can you switch languages dynamically?
A5: Yes, by updating the i18n instance language programmatically.
*/
