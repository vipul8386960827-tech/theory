/* 159_import_svg_as_react_component.js */

/*
=====================================
Import SVG as React Component
=====================================

Definition:
In React, you can import **SVG files** as **React components** to use them 
like regular JSX elements. This allows direct manipulation with props, 
like `className`, `width`, `height`, and `fill`.

-------------------------------------
Usage Example:
-------------------------------------
1. **Importing SVG as React Component**
-------------------------------------
import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Logo width={100} height={100} fill="blue" />
    </div>
  );
}

2. **Important Notes**
- `ReactComponent` import is supported by **Create React App** out of the box.
- Allows adding **props** directly to SVG like `className`, `style`, `onClick`.
- For other setups (Webpack, Vite), ensure proper loader (e.g., `@svgr/webpack`) is configured.

-------------------------------------
Alternative: Import as URL
-------------------------------------
import logoUrl from './logo.svg';

<img src={logoUrl} alt="logo" />  // Only renders image, no React props support

-------------------------------------
Key Points:
-------------------------------------
- Importing as component → fully interactive SVG.
- Importing as URL → static image, cannot directly manipulate SVG elements.

-------------------------------------
Analogy:
-------------------------------------
- SVG as component = **lego piece**: you can resize, color, and attach events.
- SVG as URL = **poster**: just displays image, cannot interact.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you add event handlers to SVG imported as React component?  
A1: Yes, you can use `onClick`, `onMouseEnter`, etc.

Q2: What’s the difference between importing as ReactComponent vs URL?  
A2: ReactComponent → interactive SVG, URL → static image.

Q3: How to support SVG as React component in Webpack/Vite?  
A3: Use `@svgr/webpack` loader or corresponding plugin for ReactComponent import.

Q4: Can you style imported SVG using CSS?  
A4: Yes, `className` prop can be used to apply CSS styles.
*/
