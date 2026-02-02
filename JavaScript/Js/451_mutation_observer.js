/* 451_mutation_observer.js

=====================================================
MutationObserver API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The MutationObserver API allows you to **observe changes in the DOM tree**, such as addition or removal of nodes, attribute changes, or text content modifications. 
   It provides an efficient, event-driven alternative to constantly polling the DOM, making it useful for dynamic UI updates, monitoring third-party content, and building reactive frameworks."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **MutationObserver Constructor**
   - `new MutationObserver(callback)` → Creates an observer.
   - `callback(mutationsList, observer)` → Called when mutations occur.
   - `mutationsList` contains `MutationRecord` objects describing each change.

2. **observe(target, options)**
   - Starts observing a target element.
   - `options` object can include:
     - `childList` → Observe addition/removal of child nodes.
     - `attributes` → Observe attribute changes.
     - `characterData` → Observe text content changes.
     - `subtree` → Observe all descendants.
     - `attributeOldValue` / `characterDataOldValue` → Capture previous values.

3. **disconnect()**
   - Stops observing all mutations.

4. **takeRecords()**
   - Returns an array of pending mutations that have not yet been delivered to the callback.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const targetNode = document.getElementById('myElement');

const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Child nodes changed:', mutation);
    } else if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
    }
  });
});

observer.observe(targetNode, {
  attributes: true,
  childList: true,
  subtree: true
});

// To stop observing
// observer.disconnect();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Reacting to dynamic DOM changes (e.g., content injected by third-party scripts).
- Implementing custom data-binding or reactive frameworks.
- Watching for attribute or text changes in UI components.
- Tracking modifications in rich text editors.
- Debugging or auditing DOM changes in testing tools.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. MutationObserver is asynchronous; callbacks are invoked after the current call stack completes.
2. Avoid observing large subtrees without filtering, as it may impact performance.
3. Older API `Mutation Events` (`DOMNodeInserted`, `DOMAttrModified`) is deprecated; MutationObserver is preferred.
4. Multiple observers can watch the same target independently.
5. Use `disconnect()` when no longer needed to free resources.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of MutationObserver as a **security camera for the DOM**:
  - It watches for changes and notifies you without you having to constantly check manually.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between MutationObserver and old DOM mutation events?  
A1: MutationObserver is asynchronous, more efficient, and preferred over deprecated synchronous DOM mutation events.

Q2: Can you observe attribute changes only?  
A2: Yes, set `attributes: true` in options.

Q3: What does `subtree: true` do?  
A3: Observes all descendants of the target node, not just immediate children.

Q4: Is MutationObserver synchronous?  
A4: No, it is asynchronous and batches changes to reduce overhead.

Q5: How do you stop observing changes?  
A5: Use `observer.disconnect()`.
*/
