/*
=====================================
Downsides of Redux vs Flux
=====================================

Definition:
Both Redux and Flux are state management approaches with 
unidirectional data flow.  
Flux came first (Facebook), Redux simplified and improved it.  
However, Redux also has some downsides compared to Flux.

-------------------------------------
Downsides of Redux Compared to Flux
-------------------------------------

1. Boilerplate Code
- Redux requires actions, reducers, constants, store configuration.
- This can feel heavier than Flux, which allows multiple stores and 
  sometimes less setup.

2. Single Store Limitation
- Redux enforces a single store for the entire app.  
- In very large applications, managing one global state object 
  can become complicated.  
- Flux allows multiple stores, sometimes making domain-specific 
  state management easier.

3. Learning Curve
- Redux concepts (reducers, immutability, middleware, thunks/sagas) 
  can be overwhelming.  
- Flux’s approach with multiple stores and dispatcher may feel more 
  intuitive for some developers.

4. Async Handling is Indirect
- In Redux, async logic cannot go into reducers.  
- Developers must use middleware (redux-thunk, redux-saga), 
  adding extra complexity.  
- Flux allows handling async logic more directly inside stores.

5. Verbosity
- Even small features require creating action creators, defining 
  constants, writing reducers.  
- Flux sometimes allows a shorter path since stores can directly 
  handle actions.

-------------------------------------
Real-Life Analogy (India-specific):
-------------------------------------
Imagine **managing a railway station**:
- Redux = **one central control room** (single store). Everything 
  must go through it. Predictable, but slow when the station grows huge.  
- Flux = **multiple control offices** (multiple stores) for 
  tickets, security, announcements. Faster in some cases, but 
  harder to coordinate.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why did Redux become more popular despite these downsides?
A1: Because Redux made state predictable, testable, and worked 
    better with developer tools.  

Q2: In which case would you prefer Flux over Redux?
A2: In very large enterprise apps with many independent domains, 
    multiple stores might reduce complexity compared to a 
    single massive Redux store.  

Q3: How can Redux boilerplate be reduced?
A3: By using Redux Toolkit, which simplifies reducers, actions, 
    and store configuration.  

Q4: Why does Redux avoid multiple stores?
A4: To maintain predictability and a single source of truth.  
*/
