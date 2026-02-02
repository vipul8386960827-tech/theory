/* 215_use_css_in_js_technique.js

=====================================
Use CSS-in-JS Technique in React
=====================================

Definition:
CSS-in-JS is a technique where CSS is written **inside JavaScript files** and scoped 
to components instead of using separate CSS files.  
Popular libraries include **styled-components**, **emotion**, and **JSS**.

-------------------------------------
Key Points:
-------------------------------------
1. Styles are **component-scoped**, avoiding global CSS conflicts.  
2. Allows **dynamic styling** based on props or state.  
3. Can leverage JavaScript logic, variables, and functions inside styles.  
4. Enhances **maintainability** in large applications.  
5. Works seamlessly with React’s **component-based architecture**.

-------------------------------------
Guidelines:
-------------------------------------
- Use for component-specific styles to avoid global CSS issues.  
- Prefer libraries like **styled-components** for easier syntax and theming.  
- Avoid overusing inline `style={{}}` for complex styles; CSS-in-JS is more scalable.

-------------------------------------
Example (styled-components):
-------------------------------------
import React from "react";
import styled from "styled-components";

// Styled button
const Button = styled.button`
  background-color: ${props => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function App() {
  return (
    <div>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- CSS-in-JS is like **designing furniture directly while building the house**:  
  - Styles live with the component (furniture) rather than in a separate room (global CSS).  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is CSS-in-JS different from traditional CSS?  
A1: Styles are scoped to components and can use JS logic; avoids global conflicts.

Q2: Can you use CSS-in-JS with existing CSS files?  
A2: Yes, you can mix approaches, but component-specific styles benefit the most.

Q3: Is there a performance cost to CSS-in-JS?  
A3: Slightly due to runtime style generation, but modern libraries optimize it.

Q4: When should you avoid CSS-in-JS?  
A4: For very large static styles or legacy CSS-heavy projects where traditional CSS is simpler.
*/
