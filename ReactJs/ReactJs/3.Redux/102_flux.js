/*
=====================================
Flux.js in React
=====================================

Definition:
Flux.js is an application architecture introduced by Facebook 
to manage the flow of data in React applications.  
It enforces **unidirectional data flow** and helps structure 
large-scale applications where state management 
becomes complex.

-------------------------------------
Key Points to Highlight:
-------------------------------------
1. Flux is not a framework, it's a **pattern/architecture**.  
2. Core idea: **data flows in one direction only**.  
3. Components do not directly update data → they trigger **actions**.  
4. Actions are dispatched through a **dispatcher**.  
5. **Stores** hold the application state and logic.  
6. **Views (React Components)** re-render when stores update.  
7. Flux inspired Redux, which became the most popular 
   state management library for React.

-------------------------------------
Real-Life Analogy:
-------------------------------------
Think of a **railway system in India**:  
- A passenger (user) requests a ticket → **Action**  
- The request goes to the central ticket office (dispatcher).  
- The ticket office checks the database of available seats (store).  
- Once confirmed, the passenger gets the ticket (updated UI).  
Data always flows in one direction → passenger cannot directly 
change the database, must go through the process.

-------------------------------------
Flow Diagram (Conceptual):
-------------------------------------
Action → Dispatcher → Store → View

-------------------------------------
Example (Pseudo-code in comments):
-------------------------------------

// Action
const addTodo = { type: "ADD_TODO", text: "Learn Flux" };

// Dispatcher
Dispatcher.dispatch(addTodo);

// Store
class TodoStore {
  constructor() {
    this.todos = [];
    Dispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    if (action.type === "ADD_TODO") {
      this.todos.push(action.text);
      this.emit("change");
    }
  }
}

// View (React Component listens to store)
function TodoList() {
  // listens to TodoStore for updates
  // renders the list of todos
}

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What problem does Flux solve compared to traditional MVC?
A1: In MVC, data can flow in multiple directions, causing complexity
    in debugging. Flux enforces unidirectional flow, making apps 
    predictable and easier to debug.

Q2: How is Flux different from Redux?
A2: Flux has multiple stores and uses a central dispatcher, while 
    Redux has a single store and no dispatcher (uses pure reducers).

Q3: Why did Redux become more popular than Flux?
A3: Redux simplified the Flux pattern by removing the dispatcher,
    enforcing a single store, and making state predictable through 
    pure functions (reducers).

Q4: Can we use Flux without React?
A4: Yes, Flux is independent of React. It's just an architecture
    that can be applied with any view library.

Q5: Is Flux still used today?
A5: Not widely. Redux became the de-facto standard for state 
    management inspired by Flux.
*/
