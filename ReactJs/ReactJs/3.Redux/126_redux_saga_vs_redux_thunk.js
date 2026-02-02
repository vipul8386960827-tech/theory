/* 126_redux_saga_vs_redux_thunk.js */

/*
=====================================
Redux Saga vs Redux Thunk
=====================================

Definition:
Both Redux Saga and Redux Thunk are middleware libraries for handling side effects 
in Redux applications, but they differ in approach, complexity, and use cases.

-------------------------------------
Key Differences:
-------------------------------------

1. **Implementation Style**
   - Redux Thunk: Uses functions (thunks) returned from action creators.
   - Redux Saga: Uses generator functions and declarative effects.

2. **Complexity**
   - Redux Thunk: Simpler, easier to implement for basic async actions.
   - Redux Saga: More complex but better for managing complex async flows, 
     concurrency, cancellations, and debouncing.

3. **Testability**
   - Redux Thunk: Testing requires mocking async calls and dispatch manually.
   - Redux Saga: Easier to test because sagas yield plain effect objects, 
     making assertions predictable.

4. **Side Effects Handling**
   - Redux Thunk: Handles side effects inside functions; logic mixed with dispatch.
   - Redux Saga: Handles side effects declaratively; separate from components.

5. **Concurrency and Cancellation**
   - Redux Thunk: Limited support for canceling async actions.
   - Redux Saga: Built-in helpers like `takeLatest`, `takeEvery`, and `cancel` 
     for managing concurrency.

6. **Middleware Nature**
   - Redux Thunk: Minimalistic middleware.
   - Redux Saga: Full-featured side-effect management framework.

-------------------------------------
Example Comparison:
-------------------------------------

// Redux Thunk Example
export const fetchUserThunk = (userId) => {
  return async (dispatch) => {
    try {
      const user = await api.fetchUser(userId);
      dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  };
};

// Redux Saga Example
function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload.userId);
    yield put({ type: "FETCH_USER_SUCCESS", payload: user });
  } catch (error) {
    yield put({ type: "FETCH_USER_FAILURE", payload: error.message });
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Redux Thunk: A **personal assistant** who executes tasks immediately when requested.
- Redux Saga: A **kitchen staff team** that coordinates multiple orders, handles 
  concurrency, and ensures each task is executed in a controlled, predictable way.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which is better for simple async actions?  
A1: Redux Thunk, due to its simplicity and minimal boilerplate.

Q2: Which is better for complex async flows with cancellations?  
A2: Redux Saga, because it provides declarative effects and concurrency control.

Q3: Can Thunk and Saga be used together?  
A3: Yes, though usually one middleware is sufficient; combining is rare.

Q4: How does testing differ between the two?  
A4: Saga testing is easier since effects are plain objects; Thunk testing requires 
    mocking dispatch and async calls.
*/
