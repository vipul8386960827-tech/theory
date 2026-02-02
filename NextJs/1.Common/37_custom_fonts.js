/* 37_custom_fonts */
/*
Key Points (Interviewer Keywords + Explanation):
1. Custom Fonts – Next.js supports using **self-hosted (local) fonts**
   or external fonts (like Google Fonts) with automatic optimization.

2. Implementation – Use `next/font/local` for local fonts
   and `next/font/google` for Google Fonts.

3. Benefits – Reduces layout shifts (CLS), improves load speed,
   ensures efficient font delivery and better performance.

4. Fallback Fonts – Always define fallback fonts for immediate text rendering
   while the custom font loads.

5. Usage – Assign the font via the generated `className` to components
   or root layout for global application.
*/

/*
Definition (Using Specific Terms):
Custom fonts in Next.js are fonts added either locally or via Google Fonts,
optimized automatically with `next/font`. This provides faster loading,
smaller font files (subsets), and improved user experience without blocking rendering.
*/

/*
Code Example (Local Fonts):

import localFont from "next/font/local";

const myFont = localFont({
  src: [
    { path: "../public/fonts/MyFont-Regular.woff2", weight: "400" },
    { path: "../public/fonts/MyFont-Bold.woff2", weight: "700" },
  ],
  display: "swap", // ensures fallback font is shown until custom font loads
});

export default function Home() {
  return (
    <div className={myFont.className}>
      <h1>Hello with custom local font!</h1>
    </div>
  );
}

Code Example (Google Fonts):

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={roboto.className}>
      <h1>Hello with Roboto font!</h1>
    </div>
  );
}
*/

/*
Important Notes:
- Local fonts reduce dependency on external servers and improve performance.
- Automatic optimization handles subsets, preload, and modern formats.
- display: "swap" ensures immediate text visibility while the font loads.
- Font className can be applied per component or globally in layout.
*/

/*
Follow-up Questions + Answers:

Q1: How do you add custom fonts in Next.js?
A1: Use next/font/local for self-hosted fonts or next/font/google for Google Fonts.

Q2: What is the advantage of local fonts?
A2: Faster load times, reduced CLS, and independence from external font servers.

Q3: Can multiple font weights be used?
A3: Yes, define each weight in the src array when using localFont or Google Fonts.

Q4: What does display: "swap" do?
A4: Shows fallback fonts immediately and swaps to the custom font once loaded.

Q5: Can custom fonts be applied globally?
A5: Yes, assign the generated className to the root layout or body.
*/
