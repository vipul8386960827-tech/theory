/* 109_drawbacks_of_mvw_pattern.js */

/*
=====================================
Drawbacks of MVW Pattern (MVC / MVVM / MVP etc.)
=====================================

Definition:
MVW stands for **Model-View-Whatever** (like MVC, MVVM, MVP).  
It’s a set of design patterns where:
- **Model** handles the data and business logic.
- **View** handles the UI.
- **Whatever (Controller / Presenter / ViewModel)** manages communication between them.

Redux is sometimes seen as an alternative to MVW because it centralizes state 
and enforces unidirectional data flow.

-------------------------------------
Key Drawbacks of MVW Pattern:
-------------------------------------

1. **Tight Coupling**
   - Views often become too dependent on Controllers/Presenters.
   - Changes in one layer (e.g., model) can ripple through other layers.

2. **Complexity in Large Apps**
   - When applications grow, the number of controllers/presenters explodes.
   - Hard to maintain and scale due to interdependent layers.

3. **Difficult State Management**
   - In MVW, state can be scattered across models, views, and controllers.
   - This makes debugging and tracking state changes harder.

4. **Two-Way Data Binding Issues (MVVM)**
   - Automatic sync between View ↔ Model can cause:
     - Hidden side effects.
     - Hard-to-trace bugs.
     - Performance bottlenecks in large apps.

5. **Poor Predictability**
   - Since multiple entities can change state (Model, Controller, View), 
     it’s harder to predict the "single source of truth".

6. **Scaling Team Development**
   - Multiple developers working on different controllers/views 
     may accidentally introduce duplicate logic or inconsistent flows.

-------------------------------------
Redux vs MVW (Why Redux Became Popular):
-------------------------------------
- Redux enforces **unidirectional data flow**, avoiding two-way binding pitfalls.
- Centralized **single store** improves debugging (time-travel, logging).
- Pure functions (reducers) → predictable and testable logic.
- Middleware handles side effects in a clear way.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- MVW is like a classroom where:
  - Students (View) talk directly to the Teacher (Controller).
  - Teacher directly updates the Notes (Model).
  - Sometimes students update notes directly too.
  - Chaos happens when the class size grows.
- Redux is like a single Notice Board (Store) in the classroom:
  - Teacher updates the board (dispatch).
  - Students read from the board (selectors).
  - No chaos—clear single source of truth.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is unidirectional data flow preferred over two-way data binding?  
A1: It ensures predictability, easier debugging, and fewer hidden side effects.  

Q2: Can MVW still be used in modern apps?  
A2: Yes, small apps may benefit from its simplicity, but large apps struggle with complexity.  

Q3: What problems does Redux solve that MVW doesn’t?  
A3: Centralized state management, predictable pure reducers, time-travel debugging.  

Q4: Why is testability harder in MVW compared to Redux?  
A4: Because Controllers/Presenters often contain side effects and mixed responsibilities, 
     unlike Redux reducers which are pure functions.  
*/
