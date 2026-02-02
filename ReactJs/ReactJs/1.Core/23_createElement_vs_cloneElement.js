/* 23_createElement_vs_cloneElement.js */
/*
React.createElement vs React.cloneElement – Interview-Ready Answer:

"In React, both createElement and cloneElement deal with React elements, but they serve 
different purposes."

1️⃣ React.createElement:
- Used to create a new React element from scratch.
- Typically invoked internally by JSX, but can be used manually.
- Syntax: React.createElement(type, props, ...children)
- Example: 
    React.createElement('div', { className: 'box' }, 'Hello World');
- Creates a brand-new element with its own props and children.

2️⃣ React.cloneElement:
- Used to clone an existing React element and optionally modify its props or children.
- Maintains the original element type and key.
- Useful when you want to add or override props on a child passed from parent.
- Syntax: React.cloneElement(element, props, ...children)
- Example:
    const newElement = React.cloneElement(oldElement, { className: 'new-box' });

---

3️⃣ Real-life Analogies:

- Global Analogy:
  - createElement = designing a new house from scratch.
  - cloneElement = taking an existing house and renovating it with new features.

- India-specific Analogy:
  - createElement = constructing a new metro station.
  - cloneElement = upgrading an existing station with additional facilities.

- Web Analogy:
  - createElement = <button>Click</button> created from scratch.
  - cloneElement = take <button>Click</button> and add a new prop like onClick handler.

---

4️⃣ Coding Examples:

// React.createElement example
const element1 = React.createElement(
    'div',
    { className: 'container' },
    'Hello World'
);

// React.cloneElement example
const element2 = React.createElement('button', { onClick: () => alert('Clicked!') }, 'Click Me');
const clonedElement = React.cloneElement(element2, { className: 'primary-btn' });

// In this example:
// - element2 is cloned with a new className prop
// - Original onClick handler remains intact

---

5️⃣ Key Differences:

| Feature           | React.createElement                  | React.cloneElement                        |
|------------------|------------------------------------|-----------------------------------------|
| Purpose          | Create a new element from scratch   | Clone existing element and optionally modify props/children |
| Props            | Set when creating new element       | Can override or extend existing props   |
| Children         | Set when creating new element       | Can override or extend children         |
| Typical Use      | JSX transpilation, manual element creation | Modifying children passed from parent  |

---

6️⃣ Possible Follow-Up Questions & Answers:

Q1: Can cloneElement change the type of the element?  
A1: No, cloneElement keeps the original element type; only props and children can be modified.

Q2: When would you use cloneElement?  
A2: When you need to add props to or modify children passed from parent components.

Q3: Does cloneElement create a deep clone?  
A3: No, it only clones the element itself, not deeply nested children elements.

Q4: Can createElement be used without JSX?  
A4: Yes, createElement is the underlying API JSX transpiles to.

Q5: Is there a performance difference?  
A5: Minimal; cloneElement is used mostly for convenience in prop manipulation.
*/
