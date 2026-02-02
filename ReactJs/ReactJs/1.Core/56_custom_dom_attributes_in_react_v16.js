/*
=====================================
Custom DOM Attributes in React v16
=====================================

Definition:
React v16 introduced support for custom DOM attributes.  
Previously, React would ignore unknown attributes on DOM elements, 
but v16 allows you to pass arbitrary attributes and they will appear 
in the rendered HTML.

-------------------------------------
Key Points:
-------------------------------------
- Any attribute not recognized by React is now passed through to the DOM.  
- Useful for data-* attributes or custom attributes for CSS/JS frameworks.  
- Still avoid passing internal props that should not reach the DOM.  
- Helps improve integration with third-party libraries without hacks.

-------------------------------------
Example 1: Using custom data attributes
-------------------------------------
function CustomDiv() {
  return <div data-user-id="123" data-role="admin">Hello User</div>;
}
// Rendered HTML:
// <div data-user-id="123" data-role="admin">Hello User</div>

-------------------------------------
Example 2: Using completely custom attributes
-------------------------------------
function CustomInput() {
  return <input my-custom-attr="abc" />;
}
// Rendered HTML:
// <input my-custom-attr="abc" />

-------------------------------------
Real-Life Analogy:
-------------------------------------
Custom DOM attributes are like writing a personalized note 📝 on a product:  
React will keep it intact when sending it to the DOM instead of discarding it.

-------------------------------------
Advantages:
-------------------------------------
1. Easier integration with third-party libraries that rely on custom attributes.  
2. Supports HTML5 custom attributes like data-* directly.  
3. No need for workarounds or manually manipulating the DOM.  

-------------------------------------
Limitations / Best Practices:
-------------------------------------
- Only use attributes that are meaningful; avoid passing internal props.  
- Be cautious with reserved or invalid HTML attribute names.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Were custom attributes supported in React v15?
A1: No, React v15 ignored unknown attributes; they would not appear in the DOM.

Q2: Can you use non-data-* attributes safely?
A2: Yes, React v16+ supports any attribute, but using data-* is recommended 
    for custom data.

Q3: How does this affect performance?
A3: Minimal impact, but cleaner than manually manipulating DOM elements.

Q4: What happens if you pass internal props as custom attributes?
A4: They will appear in the DOM, potentially leaking internal implementation details.

Q5: How does this differ from props spreading?
A5: Spreading props may unintentionally pass internal props; custom attributes 
    are explicit and controlled.
*/
