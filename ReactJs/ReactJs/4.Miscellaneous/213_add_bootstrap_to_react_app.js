/* 213_add_bootstrap_to_react_app.js

=====================================
Add Bootstrap to a React App
=====================================

Definition:
Bootstrap is a popular CSS framework for building responsive, mobile-first web applications.  
You can integrate it into React to leverage pre-built styles and components.

-------------------------------------
Key Points:
-------------------------------------
1. Can be added via **npm package** (`bootstrap`) or **CDN** link.  
2. Provides **CSS classes** for layout, typography, forms, buttons, and components.  
3. Compatible with React; can be combined with React-specific components like `react-bootstrap`.  
4. Improves development speed by avoiding custom CSS for common UI patterns.  

-------------------------------------
Guidelines:
-------------------------------------
- Prefer `react-bootstrap` if you want components fully compatible with React.  
- Include only the required CSS/JS to reduce bundle size.  
- For custom themes, override Bootstrap classes or use SCSS variables.  

-------------------------------------
Example (Using npm package):
-------------------------------------
1. Install Bootstrap:
   npm install bootstrap

2. Import CSS in `index.js` or `App.js`:
   import "bootstrap/dist/css/bootstrap.min.css";

3. Use Bootstrap classes in JSX:
   import React from "react";

   function App() {
     return (
       <div className="container mt-4">
         <h1 className="text-primary">Hello Bootstrap</h1>
         <button className="btn btn-success">Click Me</button>
       </div>
     );
   }

-------------------------------------
Example (Using react-bootstrap):
-------------------------------------
import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container className="mt-4">
      <h1 className="text-primary">Hello React-Bootstrap</h1>
      <Button variant="success">Click Me</Button>
    </Container>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Bootstrap is like **pre-fabricated building materials**:  
  - You don’t have to design bricks or windows from scratch.  
  - React is the architect placing these materials into your app structure.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use Bootstrap without react-bootstrap in React?  
A1: Yes, by importing CSS and using class names directly in JSX.

Q2: How do you customize Bootstrap styles in React?  
A2: Override classes in your CSS/SCSS or use SCSS variables for theming.

Q3: What are the benefits of react-bootstrap over plain Bootstrap?  
A3: Provides React components for Bootstrap elements, better integration with JSX and state.

Q4: Can Bootstrap CSS conflict with your own styles?  
A4: Yes, use careful class naming or CSS modules to avoid conflicts.
*/
