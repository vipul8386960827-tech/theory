/* 122_redux_saga.js */

/*
=====================================
Redux Saga
=====================================

Definition:
Redux Saga is a middleware library for Redux that manages side effects 
(asynchronous actions like API calls, timeouts, or complex logic) in a predictable, 
testable, and declarative way using generator functions.

-------------------------------------
Core Concepts:
-------------------------------------

1. **Saga**: A generator function that listens for specific actions and performs 
   side effects.
2. **Effects**: Plain JavaScript objects that describe what to do (e.g., call an API, 
   dispatch an action).
3. **watcher saga**: Watches for specific actions and triggers worker sagas.
4. **worker saga**: Performs the actual side effect (API call, async logic).
5. **takeEvery / takeLatest**: Redux Saga helpers for handling actions.
   - `takeEvery`: Runs saga for every dispatched action.
   - `takeLatest`: Cancels previous saga if a new one arrives.

-------------------------------------
Why Use Redux Saga:
-------------------------------------
- Handles complex asynchronous flows in a clean and maintainable way.
- Improves testability by separating side effects from components and reducers.
- Can cancel, debounce, throttle, and manage concurrent tasks.
- Works well for large applications with multiple async operations.

-------------------------------------
Basic Example:
-------------------------------------
import { takeEvery, call, put } from "redux-saga/effects";
import { fetchUserSuccess, fetchUserFailure } from "./actions";
import { FETCH_USER_REQUEST } from "./actionTypes";
import api from "../api";

// Worker Saga
function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload.userId);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

// Watcher Saga
function* watchFetchUser() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}

export default watchFetchUser;

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Imagine Redux Saga as a **personal assistant**:
  - You (component) request a task (action).
  - Assistant (saga) handles the async work in the background (API calls, delays).
  - Returns the result (dispatches success/failure) without blocking your main workflow.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is Redux Saga different from Redux Thunk?  
A1: Redux Thunk allows simple async actions by returning a function, but Redux Saga 
    uses generator functions for declarative, testable, and more complex async flows.

Q2: Can sagas cancel tasks?  
A2: Yes, sagas can cancel running tasks using `cancel`, `takeLatest`, or custom logic.

Q3: Why use `call` and `put` in sagas instead of directly calling API or dispatching?  
A3: They return declarative effects, making sagas testable and easy to control.

Q4: Can sagas interact with the Redux store?  
A4: Yes, using `select` effect to read the current state without breaking unidirectional flow.
*/
