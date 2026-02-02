/* 166_prevent_unnecessary_updates_with_setstate.js

=====================================
Prevent Unnecessary Updates with setState
=====================================

Definition:
- In React class components, `setState()` schedules an update to a component’s state 
  and triggers a re-render.
- However, sometimes calling `setState()` with the same value or redundant updates 
  can cause **unnecessary re-renders**, impacting performance.

-------------------------------------
Ways to Prevent Unnecessary Updates:
-------------------------------------

1. **Check Before Calling setState**
   - Only call `setState()` if the new state is different from the current state.
   Example:
   if (this.state.count !== newCount) {
     this.setState({ count: newCount });
   }

2. **Use PureComponent or shouldComponentUpdate**
   - `React.PureComponent` does a shallow comparison of props/state 
     and skips re-render if nothing changed.
   - For fine-grained control, implement `shouldComponentUpdate()`.

3. **Batching Updates**
   - React batches multiple `setState()` calls in event handlers into a single update.
   - Avoid spreading updates across async tasks without need.

4. **Functional Updates with setState**
   - If new state depends on old state, use functional `setState()` to avoid 
     stale values and redundant re-renders.
   Example:
   this.setState((prevState) => ({ count: prevState.count + 1 }));

5. **Avoid Updating State with Same Value**
   - React will still re-render if you call `setState()` with identical data.
   - Add condition checks to avoid this.

-------------------------------------
Example:
-------------------------------------
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    // Prevent unnecessary re-render
    if (this.state.count !== this.state.count + 1) {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    }
  };

  render() {
    console.log("Rendered!");
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Imagine updating a **school notice board**:
  - If the information hasn’t changed, posting the same notice again 
    wastes time and effort.
  - Only update the board if the content is actually different.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Does React automatically prevent unnecessary renders when state is the same?  
A1: No, React re-renders even if the state is set to the same value. 
    It only skips re-render if `shouldComponentUpdate` or `PureComponent` is used.

Q2: How is this problem handled in functional components?  
A2: By using `React.memo` (for props) and checking conditions before calling `setState` hooks.

Q3: What is the role of `useMemo` and `useCallback` in avoiding re-renders?  
A3: They memoize values and functions so child components don’t re-render unnecessarily.

Q4: Why does React not skip re-renders automatically for identical state updates?  
A4: Because React doesn’t deeply compare state objects—it relies on developers 
    to optimize with PureComponent, memo, or condition checks.
*/
