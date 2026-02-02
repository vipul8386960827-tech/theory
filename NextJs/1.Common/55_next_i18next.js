/* 55_next_i18next */
/*
Key Points (Interviewer Keywords + Explanation):
1. next-i18next – A library for **internationalization (i18n)** in Next.js,
   allowing multi-language support in apps.

2. Purpose – Manage translations, detect user locale, and render content
   in different languages.

3. Implementation – Configure `next-i18next.config.js` and wrap app
   with `appWithTranslation`.

4. Features – Supports server-side rendering, static generation, dynamic routing,
   and namespace-based translations.

5. Benefits – Enables multi-language websites, improves UX for global users,
   integrates seamlessly with Next.js features.
*/

/*
Definition (Using Specific Terms):
next-i18next is a Next.js library that simplifies i18n support.
It allows defining translation JSON files per language, detects user
locale, and works with SSR, SSG, or client-side rendering.
*/

/*
Code Example (Setup):

// 1. Install dependencies
// npm install next-i18next react-i18next i18next

// 2. Create next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};

// 3. Wrap app (_app.js)
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import nextI18NextConfig from "../next-i18next.config";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp, nextI18NextConfig);

// 4. Example translation files
// public/locales/en/common.json
// { "welcome": "Welcome" }
// public/locales/fr/common.json
// { "welcome": "Bienvenue" }

// 5. Usage in component
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation("common");
  return <h1>{t("welcome")}</h1>;
}
*/

/*
Important Notes:
- next-i18next works with Pages Router and App Router.
- Can use SSR/SSG by combining with getServerSideProps/getStaticProps.
- Supports multiple namespaces for organizing translations.
- Locale detection can be automatic or manual.
- Ideal for apps targeting global audiences.
*/

/*
Follow-up Questions + Answers:

Q1: What is next-i18next?
A1: A Next.js library for internationalization (i18n), managing translations per locale.

Q2: How do you configure supported languages?
A2: In next-i18next.config.js under `locales` and `defaultLocale`.

Q3: How do you use translations in components?
A3: Import `useTranslation` from next-i18next and call `t("key")`.

Q4: Can it work with SSR/SSG?
A4: Yes, fully compatible with server-side rendering or static generation.

Q5: Why use next-i18next over manual JSON translations?
A5: Simplifies locale management, integrates with Next.js routing and SSR, supports multiple namespaces and fallback locales.
*/
