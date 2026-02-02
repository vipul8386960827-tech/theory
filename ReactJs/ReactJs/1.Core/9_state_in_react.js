/*
State in React is an object that stores dynamic data for a component 
and decides how the UI should look at any given time.  
When the state changes, React automatically re-renders the component 
to update the UI.


---

📌 Real-life Examples:

- **Global analogy (Fan regulator):**
  The speed of a fan is its state. Changing the regulator changes the speed, 
  just like updating state changes the UI.

- **India-specific analogy (Traffic signal):**
  The light (red, yellow, green) is the state.  
  When it changes, the whole traffic flow (UI) changes.

- **Web analogy:**
  A counter that increases when you click a button.  
  The number is stored in state, and each click updates it.


---

📌 Possible Follow-Up Questions & Answers:

Q1: How do you create state in class components?  
A1: By initializing `this.state = {}` in the constructor 
and updating with `this.setState()`.

Q2: How do you create state in function components?  
A2: By using the `useState` hook. Example:  
`const [count, setCount] = useState(0);`

Q3: What is the difference between props and state?  
A3: Props are passed from parent to child and are read-only,  
while state is managed inside the component and can be updated.

Q4: Is state synchronous or asynchronous?  
A4: State updates are asynchronous and may be batched by React 
for performance optimization.

Q5: Can we have multiple states in one component?  
A5: Yes, with multiple `useState` calls in function components 
or multiple properties inside `this.state` in class components.

Q6: Where should we avoid storing data in state?  
A6: Don’t store derived/computable values or non-UI data like timers or DOM references 
in state. Keep only the minimal data required for rendering.
*/
