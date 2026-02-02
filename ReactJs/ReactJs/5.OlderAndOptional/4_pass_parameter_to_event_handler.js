/* 4_pass_parameter_to_event_handler.js

=====================================
Passing Parameters to Event Handlers in React
=====================================

Definition:
In React, you often need to pass additional parameters to event handlers. 
Since event handlers are functions, you can pass parameters using arrow functions 
or bind.

-------------------------------------
Key Points:
-------------------------------------

1. Using Arrow Functions in JSX:
   - Arrow functions allow passing parameters directly without losing `this` context.
   Example: <button onClick={() => this.handleClick(id)}>Click</button>

2. Using bind():
   - You can pre-bind parameters while preserving `this`.
   Example: <button onClick={this.handleClick.bind(this, id)}>Click</button>

3. Avoid:
   - Avoid calling the handler directly in JSX like onClick={this.handleClick(id)} 
     because it will execute immediately during render.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from 'react';

class ItemList extends Component {
  handleClick = (id, event) => {
    console.log('Clicked item ID:', id);
    console.log('Event type:', event.type);
  };

  render() {
    const items = [1, 2, 3];
    return (
      <div>
        {items.map(item => (
          // Using arrow function
          <button key={item} onClick={(e) => this.handleClick(item, e)}>
            Item {item}
          </button>
        ))}
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Passing parameters is like giving instructions to a waiter:
  You tell the waiter (event handler) which dish (parameter) to serve 
  when the customer (event) calls.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you pass multiple parameters to an event handler?  
A1: Yes, include them in the arrow function or bind, e.g., (param1, param2).

Q2: Difference between arrow function and bind for passing params?  
A2: Arrow functions create a new function on each render; bind can be used in constructor to avoid this.

Q3: Can you pass parameters to functional component event handlers?  
A3: Yes, the same arrow function syntax works with hooks.

Q4: Why shouldn’t you call the function directly in JSX?  
A4: It executes immediately during render, not on the actual event.
*/
