/*
=====================================
React Mixins
=====================================

Definition:
Mixins are a pattern used in older React versions (pre-ES6 classes) 
to share reusable functionality between components.  
They allow multiple components to "mix in" methods, state, or lifecycle logic.

-------------------------------------
Key Points:
-------------------------------------
- Only available in React.createClass (deprecated).  
- Not supported in ES6 class components.  
- Mixins can include methods, lifecycle hooks, and shared state.  
- Often replaced today with HOCs, Render Props, or Custom Hooks.  
- Using mixins can lead to naming conflicts and unpredictable behavior.

-------------------------------------
Example 1: Classic React.createClass Mixin
-------------------------------------
const LoggerMixin = {
  componentDidMount() {
    console.log('Component mounted');
  },
  log(message) {
    console.log(message);
  }
};

const MyComponent = React.createClass({
  mixins: [LoggerMixin],
  render() {
    this.log('Rendering MyComponent');
    return <div>Hello World</div>;
  }
});

-------------------------------------
Modern Replacement: Custom Hook
-------------------------------------
function useLogger(message) {
  React.useEffect(() => {
    console.log(`${message} mounted`);
  }, [message]);

  const log = (msg) => console.log(msg);
  return log;
}

function MyComponent() {
  const log = useLogger("MyComponent");
  log("Rendering MyComponent");
  return <div>Hello World</div>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Mixins are like ingredients 🍳 added to multiple recipes to give the same flavor.  
Hooks are now a cleaner way to get the same effect without mixing raw ingredients everywhere.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why are mixins deprecated in React?
A1: They cause naming collisions, unclear dependencies, and are hard to maintain.

Q2: What should you use instead of mixins in modern React?
A2: Use Hooks, HOCs, or Render Props to share logic.

Q3: Can ES6 classes use mixins directly?
A3: No, ES6 classes do not support mixins natively; you need workarounds.

Q4: Are there libraries that mimic mixins in modern React?
A4: Yes, some utility libraries provide HOC-based mixin patterns, 
    but Hooks are the preferred approach.

Q5: When might you encounter mixins today?
A5: Mostly in legacy codebases built with React.createClass (pre-ES6).  
*/
