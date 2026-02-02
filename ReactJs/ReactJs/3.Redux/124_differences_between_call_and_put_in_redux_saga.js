/* 124_differences_between_call_and_put_in_redux_saga.js */

/*
=====================================
Differences Between call and put in Redux Saga
=====================================

Definition:
- **call**: An effect used to invoke a function (usually async like an API call)
  and pause the saga until it resolves.
- **put**: An effect used to dispatch an action to the Redux store.

-------------------------------------
Key Differences:
-------------------------------------

1. **Purpose**
   - call: Used to execute functions and handle async tasks.
   - put: Used to dispatch actions (like dispatch in Redux).

2. **Return Value**
   - call: Returns the result of the function call.
   - put: Returns an effect object representing the dispatch; it does not return
     the result of reducer.

3. **Behavior**
   - call: Pauses the saga until the function resolves (blocking behavior).
   - put: Non-blocking; saga continues immediately after dispatch.

4. **Typical Use Case**
   - call: Fetching data from API, reading from local storage, or any async logic.
   - put: Sending SUCCESS or FAILURE actions to update the store.

-------------------------------------
Example:
-------------------------------------
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUserSuccess, fetchUserFailure } from "./actions";
import api from "../api";
import { FETCH_USER_REQUEST } from "./actionTypes";

// Worker saga
function* fetchUserSaga(action) {
  try {
    // call effect pauses saga until api.fetchUser resolves
    const user = yield call(api.fetchUser, action.payload.userId);
    // put effect dispatches action to store
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

// Watcher saga
function* watchFetchUser() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}

export default watchFetchUser;

-------------------------------------
Analogy:
-------------------------------------
- call: Like **placing an order in a restaurant** and waiting for the chef to finish.
- put: Like **sending a waiter to deliver the finished dish** to the customer (store).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use call for synchronous functions?  
A1: Yes, but it’s mainly useful for async; for sync, normal function call works too.

Q2: Can you dispatch actions without put?  
A2: Not in sagas; put is the correct declarative way to dispatch actions from sagas.

Q3: Can call and put be combined?  
A3: Yes, typically you call an API with call, then dispatch the result using put.

Q4: Why not directly call API in component instead of call effect?  
A4: Using call keeps the saga declarative, testable, and handles blocking/concurrency properly.
*/
