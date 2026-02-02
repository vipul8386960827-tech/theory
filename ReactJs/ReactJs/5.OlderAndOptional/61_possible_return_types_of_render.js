/* 61_possible_return_types_of_render.js

=====================================================
Possible Return Types of render() in React Class Components
=====================================================

Definition:
The `render()` method of a React class component determines what is displayed on the screen.  
It must return one of the valid React elements, arrays, fragments, or null.  
Returning invalid types will cause errors.

-----------------------------------------------------
Valid Return Types:
-----------------------------------------------------
1. JSX Element
   - The most common return type.
   - Example: `<div>Hello World</div>`

2. `null`
   - No rendering will occur.
   - Useful for conditional rendering where nothing should be displayed.

3. Arrays of Elements
   - Multiple sibling elements can be returned as an array.
   - Example: `[<li key="1">Item 1</li>, <li key="2">Item 2</li>]`

4. React Fragments
   - Wrap multiple elements without adding extra DOM nodes.
   - Example: `<React.Fragment><div>A</div><div>B</div></React.Fragment>`
   - Short syntax: `<>...</>`

5. Portals (advanced)
   - Can return elements rendered outside the component’s DOM hierarchy using `ReactDOM.createPortal`.

-----------------------------------------------------
Invalid Return Types:
-----------------------------------------------------
- Strings, numbers, objects (except React elements) cannot be returned directly.
- Undefined or missing return causes runtime errors.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class Example extends Component {
  render() {
    const show = true;

    // Conditional rendering with null
    if (!show) return null;

    // Return array of elements
    return [
      <h1 key="1">Hello</h1>,
      <p key="2">This is an array of elements.</p>
    ];
  }
}

export default Example;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Returning from `render()` is like **giving React a blueprint of what to display**.
- Returning `null` = "Show nothing."
- Returning multiple elements = "Show several things together."

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can `render()` return a boolean?  
A1: No, it must return a valid React element, array, fragment, or null.

Q2: Can a functional component return the same types?  
A2: Yes, functional components follow the same rules.

Q3: Why use Fragments instead of arrays?  
A3: Fragments provide cleaner syntax and avoid the need for keys if using the short syntax.
*/
