/* 15_key_prop_and_benefit_in_arrays.js */
/*
In React, the `key` prop is used to give a unique identifier to each element in a list.  
It helps React identify which items have changed, been added, or removed,  
allowing efficient updates and minimizing unnecessary re-renders.

Real-life Examples:
- Global analogy (Name tags at a conference): Each attendee has a unique name tag (key).  
- India-specific analogy (Railway PNR numbers): Each train ticket has a unique PNR (key).  
- Web analogy: Rendering a list of items using `key` to help React track changes.

Possible Follow-Up Questions & Answers:

Q1: Can you use index as a key?  
A1: Yes, but only if items are static and do not change order. Using indexes for dynamic lists can cause rendering bugs.

Q2: What happens if you don’t provide a key?  
A2: React uses the array index by default, which may lead to inefficient updates and UI bugs.

Q3: Should keys be unique globally?  
A3: No, keys only need to be unique among siblings in the same list.

Q4: Can keys be strings or numbers?  
A4: Yes, both strings and numbers are valid as keys.

Q5: Do keys get passed as props to child components?  
A5: No, React uses keys internally and they are not accessible inside the child component.

Coding Example:

const fruits = ["Apple", "Banana", "Cherry"];

// Using keys for list items
function FruitList() {
    return (
        <ul>
            {fruits.map((fruit) => (
                <li key={fruit}>{fruit}</li> // unique key = fruit name
            ))}
        </ul>
    );
}

// Dynamic list example
function DynamicList({ items }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li> // unique key from item.id
            ))}
        </ul>
    );
}
*/



// \\---------------

/*
In React, if a `key` prop is not defined for list items, React may incorrectly reuse DOM elements, 
causing inconsistent UI updates when the list changes dynamically.

Example Scenario:

Suppose you have a list of input fields where users can type text:

const items = [{ id: 1, value: "A" }, { id: 2, value: "B" }, { id: 3, value: "C" }];

function InputList() {
    const [inputs, setInputs] = React.useState(items);

    const shuffle = () => {
        // Shuffle the array
        setInputs([...inputs].sort(() => Math.random() - 0.5));
    };

    return (
        <div>
            {inputs.map((item, index) => (
                <input
                    // key is missing or using index incorrectly
                    value={item.value}
                    onChange={(e) => {
                        const newInputs = [...inputs];
                        newInputs[index].value = e.target.value;
                        setInputs(newInputs);
                    }}
                />
            ))}
            <button onClick={shuffle}>Shuffle</button>
        </div>
    );
}

Issue without proper keys:
- If a user types in the first input and then clicks "Shuffle",  
  React may reuse the wrong DOM elements because it tracks them by index.  
  The typed value might appear in the wrong input field, causing inconsistency.

Solution:
- Assign a unique `key` from the item itself:

{inputs.map((item) => (
    <input
        key={item.id} // Unique key ensures correct mapping
        value={item.value}
        onChange={(e) => {
            const newInputs = [...inputs];
            const index = newInputs.findIndex(i => i.id === item.id);
            newInputs[index].value = e.target.value;
            setInputs(newInputs);
        }}
    />
))}

---

Real-life Analogy:
- Imagine seats in a theater: if seats aren’t numbered (key), people might sit in the wrong seat when rows are rearranged.
- India-specific: Railway train seats without unique PNR tracking may cause passengers to end up in wrong berths after rearrangement.

Follow-Up Questions & Answers:

Q1: Why can using index as key cause problems in dynamic lists?  
A1: Index-based keys can change when items are added, removed, or reordered, leading to React reusing wrong DOM elements.

Q2: Are keys mandatory in React?  
A2: Keys are required for list rendering to help React track elements efficiently.

Q3: Can using object IDs as keys solve all problems?  
A3: Yes, as long as the IDs are unique and stable, React can reliably match elements.

Q4: What kind of bugs can arise without keys?  
A4: Incorrect input values, wrong animations, duplicated elements, or improper component state updates.
*/
