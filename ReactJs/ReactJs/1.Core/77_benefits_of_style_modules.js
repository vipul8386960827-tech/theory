/*
=====================================
Benefits of CSS Modules in React
=====================================

Definition:
CSS Modules allow you to write CSS files in a modular and scoped way, 
where class names and animations are locally scoped by default.  
This avoids global namespace collisions and improves maintainability.

-------------------------------------
Key Points:
-------------------------------------
- CSS is scoped locally by default.  
- Automatically generates unique class names.  
- Easy to import and use in React components.  
- Supports composition and variables.  
- Works seamlessly with React and Webpack.

-------------------------------------
Example 1: Basic Usage
-------------------------------------
// File: Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

// File: Button.js
import React from "react";
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Click Me</button>;
}

-------------------------------------
Example 2: Multiple Classes and Composition
-------------------------------------
// File: Button.module.css
.primary {
  background-color: blue;
  color: white;
}

.rounded {
  border-radius: 10px;
}

// File: Button.js
import React from "react";
import styles from "./Button.module.css";

function Button() {
  return <button className={`${styles.primary} ${styles.rounded}`}>Click Me</button>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
CSS Modules are like personalized name tags 🎫 for each component:  
- Each component has its own unique style,  
- So styles from one component won’t accidentally affect another.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can CSS Modules be used with global styles?
A1: Yes, you can define global styles with :global selector if needed.

Q2: How does Webpack handle CSS Modules?
A2: It automatically generates unique class names and maps them to the imported object.

Q3: Are CSS Modules compatible with CSS-in-JS?
A3: Yes, but they serve different purposes; CSS Modules scope static CSS, while CSS-in-JS allows dynamic styles.

Q4: Can you use variables and nesting with CSS Modules?
A4: Yes, by using pre-processors like SASS or PostCSS.

Q5: What happens if two components have the same class name?
A5: No conflict occurs because CSS Modules generates unique class names for each component.
*/
