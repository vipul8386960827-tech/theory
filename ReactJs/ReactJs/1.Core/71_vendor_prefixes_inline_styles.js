/*
=====================================
Vendor Prefixes in Inline Styles (React)
=====================================

Definition:
Vendor prefixes are used to add support for CSS properties that may 
not yet be standardized across all browsers.  
In React inline styles, you must use camelCase and explicitly add 
prefixes when needed.

-------------------------------------
Key Points:
-------------------------------------
- React inline styles are JavaScript objects, so properties use camelCase.  
- Vendor-prefixed properties must be included manually (e.g., Webkit, Moz, ms, O).  
- Some CSS properties no longer require prefixes due to modern browser support.  
- For maintainability, consider using CSS-in-JS libraries like styled-components or autoprefixer.

-------------------------------------
Example 1: Basic Vendor Prefix
-------------------------------------
function Box() {
  const style = {
    display: "flex",
    WebkitBoxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Chrome/Safari
    MozBoxShadow: "0 4px 8px rgba(0,0,0,0.2)",    // Firefox
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"        // Standard
  };

  return <div style={style}>Box with shadow</div>;
}

-------------------------------------
Example 2: Using Transform with Prefixes
-------------------------------------
function RotateBox() {
  const style = {
    width: "100px",
    height: "100px",
    backgroundColor: "lightblue",
    WebkitTransform: "rotate(45deg)", // Chrome/Safari
    MozTransform: "rotate(45deg)",    // Firefox
    msTransform: "rotate(45deg)",     // IE
    transform: "rotate(45deg)"        // Standard
  };

  return <div style={style}>Rotated Box</div>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Vendor prefixes are like using different plugs 🔌 for different countries — 
the core style (appliance) is the same, but each browser may require its own format.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Are vendor prefixes always required today?
A1: Most modern browsers support standard properties, but older browsers may need prefixes.

Q2: Can you automate vendor prefixes in React?
A2: Yes, tools like Autoprefixer or CSS-in-JS libraries handle this automatically.

Q3: Why is camelCase used instead of kebab-case?
A3: React inline styles are JS objects; kebab-case is invalid as a JS property.

Q4: Can you mix prefixed and standard properties?
A4: Yes, include standard property last so it overrides if supported.

Q5: Are there performance concerns with inline prefixed styles?
A5: Minimal; performance impact is negligible unless you have hundreds of DOM nodes updating frequently.
*/
