/*
=====================================
Component Names Must Start with Capital Letter in React
=====================================

Definition:
In React, component names must start with a capital letter.  
React treats lowercase names as native HTML elements (like <div>, <span>) 
and capitalized names as custom React components.

-------------------------------------
Key Points:
-------------------------------------
- Capitalized names → React recognizes it as a component.  
- Lowercase names → React renders as standard HTML tags.  
- Failing to capitalize a component will result in it not rendering correctly.  
- Naming convention helps React distinguish between built-in elements and custom components.

-------------------------------------
Example 1: Correct Component Name
-------------------------------------
function MyButton() {
  return <button>Click Me</button>;
}

function App() {
  return <MyButton />; // Renders correctly
}

-------------------------------------
Example 2: Incorrect Component Name
-------------------------------------
function myButton() {
  return <button>Click Me</button>;
}

function App() {
  return <myButton />; // React treats <myButton> as a DOM element
  // Warning: Unknown DOM property 'myButton'.
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Capital letters for components are like naming your pet 🐶 "Fido" instead 
of "fido" — React knows it's special (custom) vs normal HTML tags.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can component names have numbers or underscores?
A1: Yes, e.g., MyComponent2 or My_Component is valid, but must start with a capital letter.

Q2: What happens if a component is lowercase inside JSX but capitalized in import?
A2: JSX will still treat it as a DOM element; naming must match capitalization.

Q3: Are function names and file names related?
A3: Not strictly, but conventionally the file name matches the component name for clarity.

Q4: Does this rule apply to class components?
A4: Yes, class component names must also start with a capital letter.

Q5: Can you use PascalCase vs CamelCase?
A5: PascalCase (MyComponent) is preferred, CamelCase works but PascalCase is standard.
*/
