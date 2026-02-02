/* 35_stateful_components.js */
/*
Stateful Components in React – Interview-Ready Answer:

"In React, stateful components are components that manage and maintain their own internal 
state. They can respond to user actions, fetch data, and update the UI based on state changes. 
Stateful components are typically implemented as class components or functional components 
using React Hooks."

Key Points:

1️⃣ Purpose:
- Maintain internal state for dynamic data.
- Handle user interactions and events.
- Control component rendering based on state changes.

2️⃣ How It Works:
- Class Component: uses `this.state` and `this.setState()` to manage state.
- Functional Component: uses `useState` or other Hooks to manage state.
- When state changes, React triggers re-render of the component.

3️⃣ Real-life Analogies:

- Global Analogy: A scoreboard that updates dynamically based on the game.
- India-specific Analogy: A water level indicator in a tank that changes as water is added or removed.
- Web Analogy: A form component with input fields that track user input and update the UI accordingly.

4️⃣ Coding Example:

// Stateful Functional Component using Hooks
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

// Stateful Class Component
import React from 'react';

class CounterClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    increment = () => this.setState({ count: this.state.count + 1 });
    decrement = () => this.setState({ count: this.state.count - 1 });

    render() {
        return (
            <div>
                <h2>Count: {this.state.count}</h2>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}

// Explanation:
// - Stateful components hold and update internal state.
// - UI updates automatically when state changes.
// - Functional components achieve stateful behavior using Hooks like useState.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can functional components be stateful?  
A1: Yes, by using React Hooks like useState and useReducer.

Q2: Should all components be stateful?  
A2: No, only components that need to manage dynamic data should be stateful; others should be stateless.

Q3: Can state be passed to child components?  
A3: Yes, state can be passed as props to child components.

Q4: What is the difference between state and props?  
A4: State is internal and mutable, while props are external and read-only.

Q5: Can multiple state variables be used in a functional component?  
A5: Yes, useState can be called multiple times for separate state variables.
*/
