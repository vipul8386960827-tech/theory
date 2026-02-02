/* 123_mental_model_of_redux_saga.js */

/*
=====================================
Mental Model of Redux Saga
=====================================

Definition:
Redux Saga is a middleware for Redux that handles side effects using 
generator functions. Understanding it conceptually helps in designing 
predictable, maintainable, and testable async flows.

-------------------------------------
Core Mental Model:
-------------------------------------

1. Actions as Requests
   - Components dispatch actions as requests for something to happen.
   - Example: FETCH_USER_REQUEST

2. Sagas as Middleware Workers
   - Sagas sit between action dispatch and reducer.
   - They listen for certain actions, perform side effects, and dispatch new actions.

3. Effects as Instructions
   - Sagas do not perform side effects directly; they yield effects like call, 
     put, takeEvery, etc.
   - Effects are plain objects describing what to do.

4. Unidirectional Flow
   - Action → Saga (side effect) → Dispatch Success/Failure → Reducer → Store → UI
   - The flow ensures predictability and keeps components pure.

5. Cancellation & Concurrency
   - Sagas can cancel or debounce tasks.
   - takeLatest ensures only the latest action triggers the worker, preventing race conditions.

-------------------------------------
Analogy for Mental Model:
-------------------------------------
- Think of Redux Saga like a restaurant kitchen:
  - Customer (component) places an order (action).
  - Waiter (Redux dispatch) sends it to the kitchen (Saga).
  - Chef (worker saga) cooks the meal (side effect/API call).
  - Food (new action) is served back to the customer via the waiter.
  - Multiple orders can be managed concurrently without blocking the dining area.

-------------------------------------
Example Flow:
-------------------------------------
1. Component dispatches:
   dispatch({ type: "FETCH_USER_REQUEST", payload: { userId: 1 } });

2. Watcher saga listens:
   yield takeLatest("FETCH_USER_REQUEST", fetchUserSaga);

3. Worker saga performs side effect:
   const user = yield call(api.fetchUser, action.payload.userId);
   yield put({ type: "FETCH_USER_SUCCESS", payload: user });

4. Reducer updates store, UI re-renders.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How do you think about sagas conceptually?  
A1: Sagas are background workers that listen for actions and perform side effects in a predictable, testable way.

Q2: Why use generator functions in sagas?  
A2: Generators allow pausing, yielding effects declaratively, and controlling async flow elegantly.

Q3: Can sagas replace all async logic in React?  
A3: They can handle most async needs, especially for complex flows, but simple cases can still use Thunks or hooks.

Q4: How does the mental model help in debugging?  
A4: By visualizing actions → sagas → reducers → UI, developers can trace the state changes and side effects clearly.
*/
