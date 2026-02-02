/* 88_get_redux_scaffolding_with_create_react_app.js

=====================================================
Get Redux Scaffolding with Create React App
=====================================================

Definition:
Create React App (CRA) provides a way to quickly bootstrap a React application. 
Although CRA does not include Redux by default, you can integrate Redux easily 
to manage global state using official Redux packages and scaffolding tools.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Installing Redux in CRA
   - Core packages:
     npm install redux react-redux
   - Optional middleware (for async operations):
     npm install redux-thunk redux-saga

2. Project Structure Example:
   src/
   ├── app/
   │   └── store.js           // Configure Redux store
   ├── features/
   │   └── counter/
   │       ├── counterSlice.js // Reducers and actions
   │       └── Counter.js      // React component
   ├── App.js
   └── index.js

3. Steps to Scaffold Redux:
   - Create store.js and configure reducers.
   - Wrap <App /> with <Provider store={store}> in index.js.
   - Use useSelector and useDispatch hooks or connect HOC in components.
   - Optionally, use Redux Toolkit for simplified syntax.

4. Benefits:
   - Faster setup for React + Redux apps.
   - Encourages modular folder structure (features or ducks pattern).
   - Ready to scale with middleware and devtools integration.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- CRA = pre-built foundation for a house.
- Redux scaffolding = adding plumbing and wiring (state management) on top.
- Without scaffolding, you’d manually set up all pipes (store, reducers, actions).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you use Redux Toolkit with CRA?  
A1: Yes, Redux Toolkit simplifies store, slice, and reducer creation.

Q2: Is Redux mandatory in CRA?  
A2: No, CRA works without Redux; internal state is sufficient for small apps.

Q3: How do you structure multiple features in CRA + Redux?  
A3: Using the features folder with slices or the ducks pattern for modularity.

Q4: How does CRA handle middleware integration?  
A4: Middleware can be added in store.js during store configuration with applyMiddleware.
*/
