/*
Key Points (Interviewer Keywords + Explanation):
1. Utility-First CSS – Tailwind provides utility classes
   for styling elements directly in JSX/HTML.

2. Rapid Development – Enables faster styling without writing custom CSS.

3. Integration – Next.js supports Tailwind out-of-the-box via postcss.config.js.

4. Responsive Design – Built-in responsive and variant classes.

5. Customization – Tailwind can be configured with tailwind.config.js
   for themes, colors, and breakpoints.
*/

/*
Definition (Using Specific Terms):
Tailwind CSS is a utility-first CSS framework that allows developers
to style components using pre-defined class names.
In Next.js, Tailwind can be integrated easily and supports
responsive design, variants, and custom configuration.
*/

/*
Code Example (Usage):

// Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {          
  //content: ["./app/**.{js,ts,jsx,tsx}", "./components/**.{js,ts,jsx,tsx}"],       
  //theme: { extend: {} },
  //plugins: [],
//};
/*
// styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Usage in component
export default function Button({ label }) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      {label}
    </button>
  );
}
*/

/*
Important Notes:
- Tailwind reduces need for custom CSS.
- Encourages consistency through utility classes.
- Supports responsive design using prefixes (sm:, md:, lg:).
- Custom themes and colors can be defined in tailwind.config.js.
*/

/*
Follow-up Questions + Answers:

Q1: What is Tailwind CSS?
A1: A utility-first CSS framework for rapid and consistent styling.

Q2: How do you integrate Tailwind with Next.js?
A2: Install tailwindcss, postcss, autoprefixer, create tailwind.config.js,
    and import Tailwind directives in globals.css.

Q3: Can Tailwind be customized?
A3: Yes, via tailwind.config.js for colors, spacing, breakpoints, etc.

Q4: How does Tailwind handle responsive design?
A4: Using responsive prefixes like sm:, md:, lg: on utility classes.

Q5: Difference between Tailwind and regular CSS?
A5: Tailwind uses utility classes directly in markup instead of writing
    custom CSS rules for every style.
*/
