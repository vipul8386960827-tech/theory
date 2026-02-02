/*
=====================================
Exceptions to Component Naming in React
=====================================

Definition:
React enforces that component names must start with an uppercase 
letter to differentiate them from HTML tags.  
However, there are exceptions where lowercase names or unconventional 
names may still work under certain conditions.

-------------------------------------
Key Points:
-------------------------------------
- **Default Rule**: Component names must start with an uppercase letter.  
- **Why**: React treats lowercase tags as native HTML elements and 
  uppercase tags as custom components.  
- **Exceptions**:  
  1. **Dynamic Component Names** using variables:  
     ```js
     const MyComponent = () => <div>Hello</div>;
     const tagName = MyComponent;
     <tagName /> // Works
     ```  
  2. **React.createElement()**: Component name doesn’t need to be capitalized; 
     you can pass the component function directly.  
  3. **Third-party components** may use lowercase if rendered with `React.createElement`.  

- **Best Practice**: Always start component names with uppercase to avoid confusion.

-------------------------------------
Example 1: Standard Component Naming
-------------------------------------
function MyButton() {
  return <button>Click</button>;
}

// Usage
<MyButton /> // Correct

-------------------------------------
Example 2: Lowercase Component Fails
-------------------------------------
function myButton() {
  return <button>Click</button>;
}

// Usage
<myButton /> // ❌ Treated as HTML tag, not React component

-------------------------------------
Example 3: Using Variable with Lowercase Name
-------------------------------------
const myButton = () => <button>Click</button>;
const Tag = myButton;

// Usage
<Tag /> // ✅ Works, React treats Tag as component

-------------------------------------
Real-Life Analogy:
-------------------------------------
Uppercase = Custom LEGO block 🧱  
Lowercase = Standard LEGO block 🟦  
React needs to know if you are using a custom block (component) or native block (HTML element).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why does React differentiate uppercase and lowercase?
A1: To distinguish between native HTML tags and custom components.

Q2: Can React automatically fix lowercase component usage?
A2: No, it will render it as a DOM element, not a component.

Q3: What happens if you import a default export with lowercase?
A3: Still works if you use the imported variable with uppercase in JSX.

Q4: Are there edge cases with dynamic imports?
A4: Yes, dynamic imports or lazy-loaded components may have variable names; React relies on the variable used in JSX.

Q5: Is it ever recommended to use lowercase for components?
A5: No, stick to uppercase for readability and maintainability.
*/
