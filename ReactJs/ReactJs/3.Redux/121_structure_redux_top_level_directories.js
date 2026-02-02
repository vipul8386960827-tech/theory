/* 121_structure_redux_top_level_directories.js */

/*
=====================================
Recommended Top-Level Directory Structure for Redux
=====================================

Definition:
Organizing Redux files in a clean directory structure improves maintainability, 
scalability, and collaboration in large applications.

-------------------------------------
Typical Top-Level Redux Directories:
-------------------------------------

1. **actions/**  
   - Contains all action creators.  
   - Optional subfolders for feature-based grouping.
   - Example: `authActions.js`, `todoActions.js`

2. **actionTypes/**  
   - Stores all constants used as action types.  
   - Helps avoid typos and provides a single source of truth.
   - Example: `authTypes.js`, `todoTypes.js`

3. **reducers/**  
   - Contains all reducer functions.  
   - Can be organized feature-wise or using `combineReducers`.
   - Example: `authReducer.js`, `todoReducer.js`, `index.js` (combines all reducers)

4. **store/**  
   - Configuration of Redux store.
   - Applying middleware like `redux-thunk` or `redux-saga`.
   - Example: `store.js`, `middleware.js`

5. **selectors/** (Optional but recommended)  
   - Functions to extract and compute data from the store.  
   - Improves reusability and readability.
   - Example: `authSelectors.js`, `todoSelectors.js`

6. **middlewares/** (Optional)  
   - Custom Redux middlewares for logging, analytics, or side-effects.

7. **slices/** (If using Redux Toolkit)  
   - Combines reducers, actions, and initial state in one file for each feature.
   - Example: `authSlice.js`, `todoSlice.js`

-------------------------------------
Example Project Layout:
-------------------------------------
src/
├── redux/
│   ├── actions/
│   │   ├── authActions.js
│   │   └── todoActions.js
│   ├── actionTypes/
│   │   ├── authTypes.js
│   │   └── todoTypes.js
│   ├── reducers/
│   │   ├── authReducer.js
│   │   ├── todoReducer.js
│   │   └── index.js
│   ├── selectors/
│   │   ├── authSelectors.js
│   │   └── todoSelectors.js
│   ├── store/
│   │   └── store.js
│   └── middlewares/
│       └── logger.js

-------------------------------------
Best Practices:
-------------------------------------
- Group files by feature if the app is large.
- Keep actions, reducers, and types clearly separated.
- Use Redux Toolkit slices for simpler structure in modern projects.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of Redux directories like a **library**:
  - Actions = books being requested.
  - Reducers = librarians who process requests.
  - Store = the main library catalog.
  - Selectors = librarians helping you find the correct books efficiently.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you structure Redux by feature instead of by type?  
A1: Yes, feature-based structure can improve maintainability in large apps.

Q2: What files are mandatory in Redux?  
A2: At minimum: actions, reducers, and store configuration.

Q3: Why use selectors directory?  
A3: To centralize data retrieval logic and avoid repeating computation in multiple components.

Q4: How does Redux Toolkit change directory structure?  
A4: Slices combine actions and reducers in one file, reducing boilerplate and simplifying structure.
*/
