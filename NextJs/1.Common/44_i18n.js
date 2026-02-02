/* 44_i18n */
/*
Key Points (Interviewer Keywords + Explanation):
1. i18n – Stands for **internationalization**, used to support multiple languages in Next.js apps.

2. Built-in Support – Next.js has native i18n routing support in `next.config.js`.

3. Implementation – Define `locales` (languages) and `defaultLocale` in next.config.js.

4. Automatic Routing – Next.js generates locale-specific routes automatically,
   e.g., `/en/about`, `/fr/about`.

5. Use Cases – Multi-language websites, global applications, localized content.
*/

/*
Definition (Using Specific Terms):
i18n in Next.js allows you to serve your application in multiple languages
by defining available locales and default locale. The framework automatically
handles locale-aware routing and allows locale detection based on headers or path.
*/

/*
Code Example (next.config.js):

/** @type {import('next').NextConfig}
const nextConfig = {
  i18n: {
    locales: ["en", "fr", "de"], // supported languages
    defaultLocale: "en",          // default language
    localeDetection: true,        // auto detect based on browser settings
  },
};

module.exports = nextConfig;
*/

/*
Usage in Pages:

// pages/index.js
import { useRouter } from "next/router";

export default function Home() {
  const { locale, locales, defaultLocale } = useRouter();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <p>All supported locales: {locales.join(", ")}</p>
    </div>
  );
}
*/

/*
Important Notes:
- Use `next/link` with `locale` prop to switch languages.
- Next.js handles locale-based routing automatically.
- Can be combined with translation libraries like `next-translate` or `react-intl`.
- Ideal for global applications needing multi-language support.
*/

/*
Follow-up Questions + Answers:

Q1: What is i18n in Next.js?
A1: Internationalization support to serve multiple languages.

Q2: How do you configure supported languages?
A2: In next.config.js under the `i18n` property with `locales` and `defaultLocale`.

Q3: Does Next.js handle routing automatically for locales?
A3: Yes, it generates locale-based routes like /en/page or /fr/page.

Q4: Can you detect user language automatically?
A4: Yes, by setting `localeDetection: true`.

Q5: Can i18n be combined with translation libraries?
A5: Yes, libraries like `next-translate` or `react-intl` integrate well.
*/
