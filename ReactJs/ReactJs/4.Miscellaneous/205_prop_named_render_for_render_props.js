/* 205_prop_named_render_for_render_props.js

=====================================
Prop Named "render" for Render Props Pattern
=====================================

Definition:
- The **render props pattern** in React is a technique where a component 
  accepts a **function as a prop** that tells the component what to render.  
- This function is commonly passed via a prop named **`render`** (though any name can be used, 
  e.g., `children`, `component`, `renderContent`).

-------------------------------------
Why "render" Prop is Used:
-------------------------------------
1. **Convention & Readability**
   - The prop is literally a function that returns JSX → naming it "render" makes sense.
   - Improves readability for other developers.

2. **Reusability**
   - Components can define logic (e.g., fetching data, managing state) 
     and delegate **UI rendering** to the function passed via `render`.

3. **Separation of Concerns**
   - Logic stays inside the reusable component.
   - Presentation stays outside, provided by the consumer.

-------------------------------------
Example:
-------------------------------------
function DataProvider({ render }) {
  const data = { user: "Alice", age: 25 };
  return render(data); // calling the render prop function
}

// Usage:
<DataProvider render={(data) => (
  <div>{data.user} - {data.age}</div>
)} />

-------------------------------------
Alternative: Using children as function
-------------------------------------
<DataProvider>
  {(data) => <div>{data.user} - {data.age}</div>}
</DataProvider>

-------------------------------------
When to Use:
-------------------------------------
- When you want to share logic between components (like HOCs do) 
  but with more flexibility.
- When UI needs to be highly customizable while keeping logic reusable.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of `render` prop like a **restaurant buffet**:
  - The restaurant (component) prepares the food (logic).
  - The customer (consumer component) decides what to put on their plate (UI).
  - The buffet only provides the resources—it doesn’t decide your meal.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between render props and HOCs?  
A1: HOCs wrap components and inject props, while render props pass a function 
    to decide what to render. Render props avoid the “wrapper hell” of HOCs.

Q2: Why might someone prefer `children` as function instead of `render` prop?  
A2: It looks more natural in JSX and avoids passing multiple render-like props.

Q3: Can hooks replace render props?  
A3: Yes, in many cases. Hooks provide a simpler way to reuse logic 
    without additional nesting.

Q4: What is the drawback of render props?  
A4: They can lead to **nested functions (callback hell)** if overused, 
    making code harder to read.
*/
