/* 183_react_support_all_html_attributes.js

1. Definition:
Yes, React supports all standard HTML attributes.  
React closely follows the HTML and DOM specifications, so any attribute that a valid HTML element supports  
can also be used in React components. However, the attribute names in React follow the camelCase convention  
for consistency with JavaScript (e.g., `className` instead of `class`, `htmlFor` instead of `for`).

2. Key Points to Highlight:
- React DOM elements support all standard, and even non-standard, HTML attributes.  
- Attribute names are camelCased to align with JavaScript naming conventions.  
- Some attributes are slightly renamed (e.g., `tabIndex`, `readOnly`, `maxLength`).  
- React passes unknown attributes directly to the DOM (from React v16 onward).  
- Helps ensure React components behave just like native HTML elements.

3. Example:
function Example() {
  return (
    <input
      type="text"
      maxLength={10}   // instead of maxlength
      readOnly         // instead of readonly
      className="input-box" // instead of class
      tabIndex={0}
    />
  );
}

4. Possible Follow-up Interview Questions:
- Why does React use `className` instead of `class`?  
- What changed in React v16 regarding unknown HTML attributes?  
- Can React handle custom `data-*` and `aria-*` attributes?  
- How does React ensure consistency between HTML attributes and DOM properties?

*/
