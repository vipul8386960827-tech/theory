/*
Applying Styles in React – Interview-Ready Answer

Definition:  
In React, styles can be applied in multiple ways, ranging from inline styles to CSS Modules and styled-components.  
React does not enforce a single styling method, giving flexibility to developers depending on project needs.  

------------------------------------------------
Key Points:
- Styles can be applied in **5 common ways**:
  1. Inline styles (style attribute in JSX).
  2. CSS stylesheets (import normal CSS).
  3. CSS Modules (scoped CSS).
  4. CSS-in-JS libraries (styled-components, emotion).
  5. Utility-first frameworks (Tailwind CSS).

------------------------------------------------
1️⃣ Inline Styles:
- Use the `style` attribute.  
- Pass an object with **camelCase** property names.  
- Best for dynamic styles.

Example:
function InlineExample() {
  return <h1 style={{ color: "blue", fontSize: "24px" }}>Hello Inline!</h1>;
}

------------------------------------------------
2️⃣ External CSS Stylesheets:
- Import `.css` files into components.  
- Styles are global by default.

Example:
// App.css
.title {
  color: red;
  font-size: 20px;
}

// App.js
import "./App.css";
function CSSExample() {
  return <h1 className="title">Hello CSS!</h1>;
}

------------------------------------------------
3️⃣ CSS Modules:
- Helps avoid **class name conflicts**.  
- File must be named `Component.module.css`.  
- Imported styles are scoped to that component only.

Example:
// Button.module.css
.btn {
  background: green;
  color: white;
}

// Button.js
import styles from "./Button.module.css";
function Button() {
  return <button className={styles.btn}>Click Me</button>;
}

------------------------------------------------
4️⃣ CSS-in-JS (styled-components / emotion):
- Write styles directly in JavaScript files.  
- Great for component-specific styles & theming.

Example (styled-components):
import styled from "styled-components";

const StyledButton = styled.button`
  background: purple;
  color: white;
  padding: 10px;
`;

function StyledExample() {
  return <StyledButton>Click Me</StyledButton>;
}

------------------------------------------------
5️⃣ Utility-First Framework (Tailwind CSS):
- Apply utility classes directly in JSX.  
- Fast for prototyping, avoids writing separate CSS.

Example:
function TailwindExample() {
  return <h1 className="text-2xl text-blue-500">Hello Tailwind!</h1>;
}

------------------------------------------------
Real-Life Analogy:
- Inline styles = quick sticky notes 📝.  
- CSS stylesheet = shared notice board 📋.  
- CSS Modules = private locker 🔒.  
- Styled-components = designer-made packaging 🎁.  
- Tailwind = LEGO blocks 🧱 to build fast.

------------------------------------------------
Possible Follow-Up Questions:

Q1: Why are style properties written in camelCase in React?  
A1: Because `style` in React expects a JavaScript object, and JS object keys follow camelCase convention.  

Q2: Which approach is best for large-scale apps?  
A2: CSS Modules, styled-components, or Tailwind (since they avoid conflicts and scale better than plain CSS).  

Q3: Can inline styles handle pseudo-classes like `:hover`?  
A3: No, for that we need CSS classes or libraries like styled-components.  

Q4: What are the pros/cons of CSS-in-JS vs CSS Modules?  
A4: CSS-in-JS allows dynamic styling and theming but adds runtime cost; CSS Modules are lightweight and fast but less dynamic.  

Q5: How does React Native handle styling?  
A5: React Native uses a `StyleSheet` API, not CSS. Styles are written in JS objects similar to inline styles.  
*/

/*
Comparison Table – Styling Methods in React

------------------------------------------------
1️⃣ Inline Styles
Pros:
- Very simple, no setup required.
- Styles are scoped to the element (no conflicts).
- Great for conditional or dynamic styles.

Cons:
- Cannot use pseudo-classes (:hover, :focus).
- Cannot use media queries directly.
- Not reusable across components.
- Harder to maintain in large apps.

When to Use:
- Small components.
- One-off dynamic styles.

------------------------------------------------
2️⃣ CSS Stylesheets (Global CSS)
Pros:
- Easy to learn, works like traditional web CSS.
- No extra setup needed.
- Widely supported by tools and libraries.

Cons:
- Global scope → class name conflicts possible.
- Hard to scale for large projects.
- No isolation between components.

When to Use:
- Small/medium projects.
- Quick prototypes.

------------------------------------------------
3️⃣ CSS Modules
Pros:
- Styles are scoped to components (no conflicts).
- Still uses regular CSS syntax.
- Works well in larger codebases.
- Integrates with build tools easily.

Cons:
- Slight setup overhead (`.module.css` naming).
- Less dynamic (compared to CSS-in-JS).
- Can become verbose with multiple imports.

When to Use:
- Medium to large apps.
- Teams wanting isolation but still traditional CSS.

------------------------------------------------
4️⃣ CSS-in-JS (styled-components / emotion)
Pros:
- Styles are scoped automatically.
- Can use props for **dynamic styling**.
- Supports theming easily.
- Better developer experience (variables, autocompletion).

Cons:
- Extra runtime overhead (JS generates styles).
- Increases bundle size slightly.
- Learning curve for new syntax.

When to Use:
- Large-scale apps.
- Design systems with theming/dynamic UIs.

------------------------------------------------
5️⃣ Utility-First CSS (Tailwind CSS)
Pros:
- Very fast for development.
- Predefined utility classes → no naming conflicts.
- Responsive design support out of the box.
- No runtime overhead.

Cons:
- JSX can look cluttered (too many classes).
- Learning curve for utility class names.
- Less flexibility for very unique custom designs.

When to Use:
- Prototypes and production apps needing speed.
- Teams that want consistency and scalability.

------------------------------------------------
Quick Takeaway:
- Inline = quick fixes.
- CSS = global, simple projects.
- CSS Modules = scalable, scoped CSS.
- CSS-in-JS = dynamic styling + theming.
- Tailwind = rapid, utility-first development.

------------------------------------------------
Possible Follow-Up Questions:

Q1: Which method is most performant?  
A1: Inline, CSS, and CSS Modules are lightweight. CSS-in-JS has runtime overhead. Tailwind is precompiled → very performant.  

Q2: Which method is best for theming?  
A2: CSS-in-JS (styled-components/emotion) is the best choice because of dynamic props and theme providers.  

Q3: Which method scales best for enterprise apps?  
A3: CSS Modules and CSS-in-JS both scale well. Tailwind is also popular for scaling because of consistency.  
*/
