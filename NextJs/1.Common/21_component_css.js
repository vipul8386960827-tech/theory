/* 21_component_css */
/*
Key Points (Interviewer Keywords + Explanation):
1. Component-Level CSS – Next.js supports CSS scoped to individual components
   using CSS Modules.

2. File Naming – Use *.module.css or *.module.scss to enable module scoping.

3. Importing CSS – CSS Module files are imported directly into components.

4. Scope Isolation – Classes are locally scoped to prevent global collisions.

5. Supported Options – Next.js supports plain CSS, SCSS, and PostCSS for components.
*/

/*
Definition (Using Specific Terms):
Component-level CSS in Next.js allows styling that is scoped to a single component
using CSS Modules. By naming files as *.module.css or *.module.scss,
class names are automatically hashed to prevent conflicts across components.
*/

/*
Code Example (Usage):

// styles/Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

// components/Button.js
import styles from "../styles/Button.module.css";

export default function Button({ label }) {
  return <button className={styles.button}>{label}</button>;
}
*/

/*
Important Notes:
- No global namespace pollution.
- Supports dynamic class names using template literals.
- Works with both functional and class components.
- For global styles, use globals.css or import in _app.js.
*/

/*
Follow-up Questions + Answers:

Q1: How do we scope CSS to a component in Next.js?
A1: Use CSS Modules with *.module.css files.

Q2: Are class names global by default in CSS Modules?
A2: No, they are locally scoped and hashed automatically.

Q3: Can we use SCSS for component-level CSS?
A3: Yes, using *.module.scss files.

Q4: How do we apply multiple classes dynamically?
A4: Use template literals or the classnames library.

Q5: Where do we put global CSS?
A5: In styles/globals.css and import in _app.js or layout file.
*/
