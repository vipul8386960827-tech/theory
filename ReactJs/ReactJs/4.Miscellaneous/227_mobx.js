/* 227_mobx.js */
/* 227_mobx.js

=====================================
MobX in React
=====================================

Definition:
**MobX** is a reactive state management library for JavaScript applications, often used 
with React. It allows automatic tracking of state changes and efficient UI updates using 
**observable state**, **actions**, and **computed values**.

-------------------------------------
Key Points:
-------------------------------------
1. **Observable State**: Variables marked as observable automatically trigger UI updates 
   when they change.  
2. **Actions**: Functions that modify the state in a controlled manner.  
3. **Computed Values**: Derived values automatically updated when underlying observables change.  
4. Promotes **minimal boilerplate** and **reactive programming**.  
5. Integrates seamlessly with React via `mobx-react` or `mobx-react-lite`.

-------------------------------------
Guidelines:
-------------------------------------
- Use MobX for applications that need **reactive and fine-grained state management**.  
- Keep actions pure and concise.  
- Avoid overusing observables for trivial state; local React state is sufficient for simple cases.

-------------------------------------
Example:
-------------------------------------
import React from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

// MobX store
class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }
}

const store = new CounterStore();

// React component observing MobX store
const Counter = observer(() => (
  <div>
    <h2>Count: {store.count}</h2>
    <button onClick={() => store.increment()}>Increment</button>
  </div>
));

export default Counter;

-------------------------------------
Analogy:
-------------------------------------
- Observable state = **thermometer**  
- UI = **people reading temperature**  
- When temperature changes, the UI updates automatically without explicit notifications.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is MobX different from Redux?  
A1: MobX uses reactive programming and observable state; Redux uses a single immutable store 
   and reducers.

Q2: Can MobX be used with functional components?  
A2: Yes, using `mobx-react-lite` and `observer`.

Q3: What is `makeAutoObservable` in MobX?  
A3: It automatically makes all properties observable and all functions actions.

Q4: When should you prefer MobX over Redux?  
A4: When you want **less boilerplate**, fine-grained reactivity, and simpler state management 
   for medium-sized apps.
*/
