/* 167_render_arrays_strings_numbers_in_react_v16.js

=================================================
Rendering Arrays, Strings, and Numbers in React v16
=================================================

Definition:
- Before React v16, components had to return a **single element** (usually wrapped 
  inside a `<div>` or `React.Fragment`).
- From **React v16 onwards**, you can directly render **arrays, strings, and numbers** 
  without wrapping them.

-------------------------------------
Key Points:
-------------------------------------
1. **Strings and Numbers**
   - Can be returned directly from a component or rendered inside JSX.
   Example: return "Hello World"; or return 42;

2. **Arrays**
   - You can return an array of elements directly, as long as each element 
     has a **unique key**.
   Example: return [<li key="1">A</li>, <li key="2">B</li>];

3. **Fragments**
   - Arrays often serve as an alternative to fragments for rendering multiple elements 
     without extra DOM nodes.

4. **Falsy Values**
   - `null`, `undefined`, and `false` are ignored in rendering (they render nothing).
   - Numbers like `0` do render.

-------------------------------------
Examples:
-------------------------------------

// ✅ Rendering Strings and Numbers
function StringNumberExample() {
  return (
    <div>
      <p>{'Hello React v16+'}</p>
      <p>{2025}</p>
    </div>
  );
}

// ✅ Rendering Arrays
function ArrayExample() {
  const items = ["Apple", "Banana", "Cherry"];
  return items.map((item, index) => <li key={index}>{item}</li>);
}

// ✅ Directly Returning an Array
function DirectArrayReturn() {
  return [
    <h1 key="1">Title</h1>,
    <p key="2">This is a paragraph</p>,
    <button key="3">Click Me</button>
  ];
}

-------------------------------------
Real-Life Analogy: 
-------------------------------------
- Think of a React component as a **plate**:
  - Before React v16: You could only put one dish (element) on the plate at a time, 
    so you needed another container to hold multiple.
  - From React v16: You can directly put multiple dishes (array of elements), 
    or even just one item like a slice of bread (string/number).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why were wrappers like `<div>` or `<span>` used before React v16?  
A1: Because React components were required to return a single parent element.

Q2: What is the difference between rendering an array vs a fragment?  
A2: Both allow multiple children, but arrays require **keys**, while fragments don’t.

Q3: What happens if you render `false` or `null` in React?  
A3: Nothing gets rendered to the DOM.

Q4: Is there any performance impact when rendering arrays?  
A4: Not significant, but always use **keys** to help React’s reconciliation algorithm.
*/
