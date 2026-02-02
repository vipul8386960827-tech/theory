/*
Impact of Using Indexes as Keys in React – Interview-Ready Answer

Definition:
In React, the `key` prop helps React identify which items in a list have changed,
been added, or been removed. Using **indexes as keys** can cause problems in
dynamic lists because keys should uniquely identify an element and remain stable
across renders.

------------------------------------------------
Key Points:
- Keys must be **unique and stable**.
- Using array indexes as keys works fine if:
  1. The list is static (no add/remove/reorder).
  2. Items don’t change frequently.
- But in **dynamic lists**, index-based keys lead to bugs because React may reuse
  DOM nodes incorrectly.

------------------------------------------------
Example Showing the Problem:

// ❌ Wrong way (using indexes as keys)
function TodoList() {
  const [todos, setTodos] = React.useState(["Buy Milk", "Pay Bills", "Go Gym"]);

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="text" defaultValue={todo} />
        </li>
      ))}
    </ul>
  );
}

/*
Issue:
- If you insert a new todo at the beginning, indexes shift.
- React reuses DOM nodes because keys changed, so input values may "jump" between items.
- This leads to UI inconsistency and buggy behavior.
*/

// ------------------------------------------------
// Correct Way (Stable Unique Keys):

// ✅ Correct way (using stable IDs)
function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 101, task: "Buy Milk" },
    { id: 102, task: "Pay Bills" },
    { id: 103, task: "Go Gym" }
  ]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="text" defaultValue={todo.task} />
        </li>
      ))}
    </ul>
  );
}

/*
Here, keys are unique IDs that remain stable even if list items are reordered.
This ensures React correctly maps each DOM node to the right item.
*/
/*
------------------------------------------------
Real-Life Analogy:
- Using index as key is like calling everyone in a classroom by their **seat number**.
  If students change seats, the teacher gets confused.
- Using unique ID is like calling students by their **name** → consistent no matter where they sit.

------------------------------------------------
Possible Follow-Up Questions with Answers:

Q1: When is it safe to use indexes as keys?
A1: When the list is static and will never be reordered, filtered, or modified.
    Example: rendering fixed tabs or a static menu.

Q2: What’s the main performance impact of wrong keys?
A2: React will re-render unnecessarily or reuse incorrect DOM nodes,
    causing UI glitches and wasted re-renders.

Q3: Why does React warn about missing keys?
A3: Without keys, React cannot differentiate between items during reconciliation,
    leading to inefficient or incorrect updates.

Q4: Can duplicate keys cause issues?
A4: Yes, duplicate keys break uniqueness. React may render incorrectly
    or skip updates for items with duplicate keys.

Q5: What’s the best practice for keys?
A5: Use unique IDs from your data (like database IDs).
    Avoid using indexes unless you’re absolutely sure the list is static.
*/
