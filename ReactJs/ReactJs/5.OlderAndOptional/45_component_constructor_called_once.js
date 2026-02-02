/* 45_component_constructor_called_once.js

=====================================================
Why is the Component Constructor Called Only Once?
=====================================================

Definition:
In React class components, the `constructor` is called only **once** when the component is created (mounted).  
It is **not called again** on updates or re-renders.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Constructor Usage**
   - Used to initialize local state.
   - Used to bind event handler methods.
   - Called before the component mounts.

2. **Why Called Only Once**
   - A React component instance is created only once when it mounts.
   - On re-renders, React does **not recreate the component instance** — it reuses the same instance and updates state/props.

3. **When Constructor is Called Again**
   - Only when the component is completely unmounted and then remounted.

4. **Modern Alternative**
   - With functional components + hooks, constructors are no longer used.
   - Instead, `useState` initializes state and `useEffect` handles setup.

-----------------------------------------------------
Example:
-----------------------------------------------------
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor called");
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

-----------------------------------------------------
Explanation of Example:
-----------------------------------------------------
- The constructor logs "Constructor called" only once when the component first mounts.  
- Clicking the button updates state and re-renders, but the constructor is **not** called again.  

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of the constructor as the **birth of the component**.  
- Re-renders are like the **same person aging or changing clothes** — they don’t get "reborn" each time.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: When will the constructor run again if props change?  
A1: It won’t — only a full unmount + remount triggers the constructor.

Q2: Is it mandatory to use a constructor in class components?  
A2: No, you can set state directly as a class field:  
    state = { count: 0 };

Q3: Why do we call `super(props)` inside a constructor?  
A3: To ensure `this.props` is available inside the constructor.

Q4: What replaced constructors in modern React?  
A4: Functional components with hooks (`useState`, `useEffect`).  
*/
