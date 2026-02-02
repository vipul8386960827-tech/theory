/* 110_similarities_between_redux_and_rxjs.js */

/*
=====================================
Similarities Between Redux and RxJS
=====================================

Definition:
- **Redux** is a predictable state container for JavaScript apps.
- **RxJS** (Reactive Extensions for JavaScript) is a library for reactive programming 
  using observables to handle async data streams.

Although they are used for different purposes, Redux and RxJS share some conceptual 
similarities, especially in how they deal with data flow.

-------------------------------------
Key Similarities:
-------------------------------------

1. **Unidirectional Data Flow**
   - Redux: Actions → Reducers → New State → UI.
   - RxJS: Data flows through streams (Observables → Operators → Subscribers).
   - Both enforce a one-way flow, making the system predictable.

2. **Centralized Data Stream**
   - Redux: A single store holds the application state.
   - RxJS: An observable represents a single stream of data.
   - Both provide a centralized source of truth.

3. **Immutable Updates**
   - Redux: Reducers return a new state object without mutating the previous one.
   - RxJS: Operators like `map`, `filter` return new transformed streams instead of 
     changing the original observable.

4. **Subscriptions**
   - Redux: Components subscribe to the store to re-render when state updates.
   - RxJS: Observers subscribe to observables to react to emitted values.

5. **Middleware / Operators**
   - Redux: Middleware (e.g., redux-thunk, redux-saga) processes actions before they 
     reach reducers.
   - RxJS: Operators (`map`, `mergeMap`, `switchMap`) transform and handle streams.
   - Both act as intermediaries that enhance the flow.

6. **Functional Programming Principles**
   - Both rely heavily on pure functions, immutability, and composition.
   - Reducers in Redux and operators in RxJS are functional by design.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of Redux as a **notice board** in a school where:
  - Only the principal (reducers) can update the board.
  - Students (components) read updates by subscribing.
- RxJS is like a **radio station**:
  - It broadcasts (observables emit) information continuously.
  - Listeners (subscribers) tune in and react.

Both systems emphasize **predictable, one-way communication**.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is Redux different from RxJS?  
A1: Redux manages app state synchronously with a single store, while RxJS handles 
    asynchronous streams of events and data.

Q2: Can Redux use RxJS?  
A2: Yes, via `redux-observable`, which uses RxJS to manage async side effects.

Q3: Why do both emphasize immutability?  
A3: To ensure predictability, easier debugging, and no accidental mutations.

Q4: Which is better for async operations, Redux or RxJS?  
A4: RxJS is more powerful for complex async flows; Redux usually relies on middleware 
    like Thunk, Saga, or Observable.  
*/
