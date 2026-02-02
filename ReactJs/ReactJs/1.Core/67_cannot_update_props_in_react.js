/*
=====================================
Cannot Update Props in React
=====================================

Definition:
Props (short for properties) are read-only data passed from a parent 
component to a child component in React.  
They are immutable inside the child component; a child cannot directly 
modify its props.

-------------------------------------
Key Points:
-------------------------------------
- Props are controlled by the parent; children should not change them.  
- Attempting to modify props directly is an anti-pattern and may lead to errors.  
- To change data, lift state up to the parent or use callbacks passed via props.  
- This ensures unidirectional data flow and predictable UI behavior.  

-------------------------------------
Example 1: Incorrect – Trying to Modify Props
-------------------------------------
function Child({ name }) {
  // name = "Bob"; // ❌ Cannot modify props directly
  return <div>{name}</div>;
}

-------------------------------------
Example 2: Correct – Using Callback to Update Parent State
-------------------------------------
function Parent() {
  const [name, setName] = React.useState("Alice");

  return (
    <div>
      <Child name={name} changeName={() => setName("Bob")} />
    </div>
  );
}

function Child({ name, changeName }) {
  return (
    <div>
      <p>{name}</p>
      <button onClick={changeName}>Change Name</button>
    </div>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Props are like instructions 📝 given to a chef.  
- Chef (child component) must follow them and cannot change the recipe.  
- To change instructions, someone outside (parent component) must update them.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can props ever be changed inside a component?
A1: No, props are immutable; only parent can change them.

Q2: What if you need temporary local changes?
A2: Copy the prop to local state using useState and modify the state.

Q3: Why does React enforce this immutability?
A3: To maintain predictable, unidirectional data flow and avoid unexpected side effects.

Q4: Can you pass functions as props?
A4: Yes, functions can be passed and used to update parent state.

Q5: What happens if you try to reassign props directly?
A5: JavaScript allows assignment but React may ignore it, and it’s considered an anti-pattern.
*/
