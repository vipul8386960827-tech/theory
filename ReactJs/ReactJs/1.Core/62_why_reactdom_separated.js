/*
=====================================
Why ReactDOM is Separated from React
=====================================

Definition:
ReactDOM is separated from React to maintain a clear distinction 
between UI logic (React) and platform-specific rendering (ReactDOM).

-------------------------------------
Key Points:
-------------------------------------
1. **Platform Agnostic Core**:  
   - React focuses on describing the UI and managing state, props, and 
     component lifecycle.  
   - It doesn’t assume a specific platform (web, mobile, VR).

2. **Different Renderers**:  
   - ReactDOM handles browser DOM updates.  
   - React Native has its own renderer for mobile apps.  
   - Other renderers (like React Three Fiber for 3D) can exist.  

3. **Code Reusability & Testing**:  
   - React components can be tested without a browser DOM.  
   - Separation allows reusing components across platforms without 
     changing core logic.  

4. **SSR & Performance**:  
   - ReactDOM provides DOM-specific methods like `render` and `hydrate` 
     optimized for web.  
   - Core React doesn’t include these DOM operations to remain lightweight.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- React = blueprint 🏗️ for building any structure.  
- ReactDOM = construction team 👷‍♂️ for web; React Native = construction 
  team for mobile.  
Separation allows the same blueprint to be used in multiple contexts.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can React work without ReactDOM?
A1: Yes, in React Native or custom renderers, ReactDOM is not needed.

Q2: Why not combine React and ReactDOM?
A2: Combining would tie React to the DOM, reducing flexibility and platform independence.

Q3: Does separation affect performance?
A3: No, it actually improves maintainability and allows platform-specific optimizations.

Q4: Can ReactDOM render on non-DOM platforms?
A4: No, ReactDOM is specific to browser DOM. Other platforms need their own renderer.

Q5: How does this separation help in SSR?
A5: Core React can render virtual DOM on the server, and ReactDOM.hydrate attaches 
    it on the client efficiently.
*/
