/* 64_setstate_in_componentwillunmount.js

=====================================================
Calling setState in componentWillUnmount
=====================================================

Definition:
In React class components, componentWillUnmount is a lifecycle method
called just before a component is removed from the DOM.  
Calling setState inside componentWillUnmount is not recommended and will 
trigger a warning because the component is about to unmount and updating state is meaningless.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Purpose of componentWillUnmount
   - Cleanup timers, subscriptions, or event listeners.
   - Avoid memory leaks and dangling references.

2. setState Behavior
   - Since the component is unmounting, updating state has no effect.
   - React will show a warning: 
     "Warning: Can't perform a React state update on an unmounted component."

3. Correct Usage
   - Cancel async operations, clear intervals, or unsubscribe from services.
   - Do not attempt to update state during unmount.

-----------------------------------------------------
Example (Incorrect Usage):
-----------------------------------------------------
class Timer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    // ❌ Incorrect: updating state on unmount
    this.setState({ seconds: 0 });
    clearInterval(this.interval);
  }

  render() {
    return <h2>Seconds: {this.state.seconds}</h2>;
  }
}

-----------------------------------------------------
Example (Correct Usage):
-----------------------------------------------------
class Timer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    // ✅ Correct: only cleanup
    clearInterval(this.interval);
  }

  render() {
    return <h2>Seconds: {this.state.seconds}</h2>;
  }
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
Trying to set state in componentWillUnmount is like writing on a whiteboard after leaving the room—nobody will see it and it’s pointless.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you update state safely after unmounting?  
A1: No, you should cancel or clean up any ongoing async operations to prevent updates after unmount.

Q2: What are common tasks in componentWillUnmount?  
A2: Clearing timers, cancelling network requests, unsubscribing from event listeners or stores.

Q3: How do functional components handle cleanup?  
A3: Using useEffect with a cleanup function:
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);

Q4: Why does React warn when calling setState on unmounted component?  
A4: To prevent memory leaks and unexpected behavior since the component is no longer rendered.

*/
