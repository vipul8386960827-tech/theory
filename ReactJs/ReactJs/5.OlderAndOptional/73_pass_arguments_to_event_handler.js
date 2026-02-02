/* 73_pass_arguments_to_event_handler.js

=====================================================
Passing Arguments to Event Handlers in React
=====================================================

Definition:
In React, you can pass arguments to event handler functions by using **arrow functions** or **Function.prototype.bind**. 
This allows you to send additional parameters along with the event object.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Arrow Function
   - Inline arrow functions can pass arguments directly:
     onClick={() => this.handleClick(id)}

2. Bind Method
   - Use `.bind` to pre-bind arguments:
     onClick={this.handleClick.bind(this, id)}

3. Event Object
   - The first argument is the event object by default.
   - Custom arguments follow after the event object when using bind or arrow functions.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class ItemList extends Component {
  handleClick = (id, event) => {
    console.log("Clicked item id:", id);
    console.log("Event type:", event.type);
  };

  render() {
    const items = [1, 2, 3];
    return (
      <div>
        {items.map(id => (
          <button 
            key={id} 
            onClick={(e) => this.handleClick(id, e)}
          >
            Click Item {id}
          </button>
        ))}
      </div>
    );
  }
}

export default ItemList;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like telling a waiter "bring me dish #3" instead of just "bring me a dish".  
- You pass additional info (dish number) along with the action (click).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is it okay to use arrow functions in render?  
A1: Yes, but it may create a new function on every render; for performance-critical apps, pre-bind functions in constructor.

Q2: Can you pass multiple arguments?  
A2: Yes, either via bind or arrow function syntax.

Q3: How does using bind differ from arrow function?  
A3: Arrow functions are defined inline, creating a new function on each render. Bind can pre-bind once, usually in constructor, which may be more efficient.

Q4: What happens if you forget to pass the event object?  
A4: The event object won’t be available inside your handler unless explicitly passed.
*/
