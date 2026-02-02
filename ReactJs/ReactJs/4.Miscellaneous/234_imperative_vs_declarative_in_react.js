/* 234_imperative_vs_declarative_in_react.js

=====================================
Imperative vs Declarative in React
=====================================

Definition:
- Imperative Programming: You explicitly tell the system how to do something, step by step.
- Declarative Programming: You describe what you want the system to do, and the system decides how to achieve it.

In React, components are primarily written in a declarative style, letting React handle DOM updates.

-------------------------------------
Key Points:
-------------------------------------
1. Imperative Example:
   - Traditional DOM manipulation
   - You manually select elements and update them.
const button = document.getElementById('btn');
button.addEventListener('click', () => {
  const list = document.getElementById('list');
  const li = document.createElement('li');
  li.textContent = 'Item';
  list.appendChild(li);
});

2. Declarative Example:
   - React handles DOM updates based on state changes.
function ItemList() {
  const [items, setItems] = React.useState([]);
  return (
    <div>
      <button onClick={() => setItems([...items, 'Item'])}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

3. Benefits of Declarative in React:
   - Cleaner and more readable code.
   - React manages DOM efficiently with virtual DOM.
   - Easier to reason about state changes.
   - Reduces bugs caused by manual DOM manipulation.

-------------------------------------
Analogy:
-------------------------------------
- Imperative = giving step-by-step instructions to a robot (“pick up this, move it here, repeat”).
- Declarative = telling the robot what you want (“I want a stack of blocks here”), and it figures out the steps.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can React support imperative programming?  
A1: Yes, via refs and direct DOM manipulation, but it’s discouraged in most cases.

Q2: Why is declarative style preferred in React?  
A2: It reduces complexity, improves readability, and leverages React's virtual DOM for efficient updates.

Q3: Are there cases where imperative code is necessary in React?  
A3: Rarely, for focus management, animations, or integrating third-party libraries requiring DOM access.

Q4: How does declarative React improve maintainability?  
A4: Developers only update state/props, and React handles UI rendering consistently, reducing manual DOM errors.
*/
