/* 203_rules_covered_by_diffing_algorithm.js

=====================================
Rules Covered by React’s Diffing Algorithm
=====================================

Definition:
React’s **diffing algorithm** (reconciliation) is guided by a set of heuristics 
that help it update the virtual DOM and real DOM efficiently.  
These rules reduce the complexity of comparing trees from O(n^3) → O(n).

-------------------------------------
Main Rules:
-------------------------------------

1. **Different Element Types → Destroy & Recreate**
   - If two elements have different types, React tears down the old tree 
     and builds a new one.
   Example:
     Old: <div>Hello</div>
     New: <span>Hello</span>
     → Entire <div> replaced with <span>.

2. **Same Type Elements → Update Attributes & Keep DOM Node**
   - If two elements are of the same type, React keeps the DOM node 
     and only updates changed attributes/props.
   Example:
     Old: <button disabled={true}>Click</button>
     New: <button disabled={false}>Click</button>
     → React only updates "disabled".

3. **Component Types → Treated Like Elements**
   - If the component type is the same, React updates with new props.
   - If type differs, React destroys the old component and mounts a new one.
   Example:
     Old: <MyButton />
     New: <MyInput />
     → React destroys <MyButton> instance.

4. **Child List Diffing → Key-Based Matching**
   - When comparing lists of children:
     - React matches elements using **keys**.
     - If no keys are provided, React falls back to index.
   Example:
     Old: <ul><li key="A">A</li><li key="B">B</li></ul>
     New: <ul><li key="B">B</li><li key="A">A</li></ul>
     → React swaps elements instead of re-rendering them.

5. **Reordering Without Keys → Inefficient**
   - If keys are missing and the order changes, React will re-render 
     all children instead of reusing them.
   Example:
     Old: <li>A</li><li>B</li>
     New: <li>B</li><li>A</li>
     → Both <li> re-render unnecessarily.

6. **Keys Must Be Unique Among Siblings**
   - Keys help React identify elements within the same parent list.
   - Duplicate keys can cause unpredictable behavior.

-------------------------------------
Summary of Rules:
-------------------------------------
- Rule 1: Different type → destroy & recreate.
- Rule 2: Same type → update in place.
- Rule 3: Components follow same rules as elements.
- Rule 4: Children compared with keys.
- Rule 5: Missing keys = inefficient re-rendering.
- Rule 6: Keys must be unique per list.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Imagine updating a **class attendance sheet**:
  - If a student has the same ID (key), just update their details.
  - If a new student joins, add them.
  - If a student leaves, remove them.
  - If IDs are missing, you may confuse one student for another (inefficient).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why are keys important in React’s diffing algorithm?  
A1: Keys help React uniquely identify elements across renders, enabling efficient updates.

Q2: What happens when you don’t use keys in a list?  
A2: React defaults to using index, which may cause unnecessary re-renders or bugs 
    when list order changes.

Q3: Why does React replace entire subtrees for different element types?  
A3: Because React assumes completely different structure & behavior when type changes, 
    so it avoids partial reuse to prevent inconsistencies.

Q4: Can React do deep comparison of children props to avoid re-renders?  
A4: No, React does shallow comparison only to keep diffing fast (O(n)).

Q5: How does React Fiber enhance these rules?  
A5: React Fiber breaks reconciliation into smaller units of work and schedules them, 
    making UI updates smoother and interruptible.
*/
