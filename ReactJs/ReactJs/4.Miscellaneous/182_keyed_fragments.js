/* 182_keyed_fragments.js */
/* 182_keyed_fragments.js

=================================================
Keyed Fragments in React
=================================================

📌 Definition:
- React Fragments (`<></>`) let you group children without adding extra DOM nodes.  
- Normally, fragments cannot have keys.  
- But in **mapped lists**, you may need to assign a `key` to a fragment.  
- This is called a **keyed fragment**.

-------------------------------------------------
✅ Why Use Keyed Fragments?
-------------------------------------------------
1. Avoids unnecessary wrapper `<div>` tags.  
2. Helps React efficiently update lists during reconciliation.  
3. Useful when rendering multiple elements per iteration without extra DOM nodes.  

-------------------------------------------------
✅ Example Without Keyed Fragment:
-------------------------------------------------
items.map(item => (
  <>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </>
))

⚠️ Problem: React warns about missing keys.

-------------------------------------------------
✅ Example With Keyed Fragment:
-------------------------------------------------
items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
))

-------------------------------------------------
⚠️ Important Notes:
-------------------------------------------------
- `key` must be placed on `<React.Fragment>` (not on `<>`).  
- Short syntax `<>...</>` doesn’t allow keys.  
- Always use stable, unique keys (like IDs, not indexes).  

-------------------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------------------
Q1: Why can’t we use `<>...</>` for keyed fragments?  
A1: Because shorthand syntax doesn’t support attributes like `key`.  

Q2: When should you use keyed fragments?  
A2: When mapping lists and returning multiple elements without a wrapper div.  

Q3: What happens if you don’t provide keys in lists?  
A3: React may incorrectly reuse elements, causing UI inconsistencies.  

Q4: Are fragments required to have keys?  
A4: No, only when used inside lists to help React differentiate elements.  

*/
