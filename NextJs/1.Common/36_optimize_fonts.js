/* 36_optimize_fonts */
/*
Key Points (Interviewer Keywords + Explanation):
1. Optimized Fonts – Next.js provides automatic font optimization
   to improve performance and reduce layout shifts.

2. Google Fonts Integration – Use the `next/font/google` module
   to load fonts efficiently with built-in optimization.

3. Benefits – Fonts are preloaded, subsetted, and served
   in modern formats for faster page load and better FCP/LCP.

4. Fallbacks – Next.js automatically provides fallback fonts
   while the custom font loads.

5. Self-Hosting – Can also optimize local fonts using `next/font/local`.
*/

/*
Definition (Using Specific Terms):
Next.js font optimization automatically loads and serves fonts
in the most efficient way. It supports Google Fonts and local fonts,
preloading only necessary subsets and formats, reducing CLS and
improving web performance metrics.
*/

/*
Code Example (Google Fonts):

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap", // ensures text remains visible during load
});

export default function Home() {
  return (
    <div className={inter.className}>
      <h1>Hello, optimized font!</h1>
    </div>
  );
}

Code Example (Local Fonts):

import localFont from "next/font/local";

const myFont = localFont({
  src: [
    { path: "../public/fonts/MyFont-Regular.woff2", weight: "400" },
    { path: "../public/fonts/MyFont-Bold.woff2", weight: "700" },
  ],
  display: "swap",
});

export default function Home() {
  return (
    <div className={myFont.className}>
      <h1>Hello, local optimized font!</h1>
    </div>
  );
}
*/

/*
Important Notes:
- Automatic font optimization reduces layout shifts and improves Core Web Vitals.
- Supports subsets, weights, and modern formats automatically.
- `display: "swap"` ensures text is visible while font is loading.
- Works for both Google Fonts and self-hosted local fonts.
*/

/*
Follow-up Questions + Answers:

Q1: What is font optimization in Next.js?
A1: Efficiently loading fonts by preloading, subsetting, and serving in modern formats.

Q2: How do you optimize Google Fonts in Next.js?
A2: Use next/font/google with subsets, weights, and display options.

Q3: Can local fonts be optimized?
A3: Yes, using next/font/local with proper paths and weights.

Q4: What does display: "swap" do?
A4: Ensures text is immediately visible using fallback fonts until the custom font loads.

Q5: Why is font optimization important?
A5: Improves performance, reduces CLS, and enhances user experience.
*/
