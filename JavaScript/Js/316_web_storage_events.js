/* 316_web_storage_events.js

=====================================================
Web Storage Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Web Storage events allow developers to detect changes to localStorage or 
  sessionStorage, enabling synchronization across different windows or tabs."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Monitor changes in storage (add, update, remove).  
   - Useful for multi-tab synchronization of data.  
   - Only fires in other windows/tabs, not in the same one where change occurs.

2. **Event Type**  
   - `storage` event is triggered on the `window` object.

3. **Event Properties**  
   - `key` → The key changed.  
   - `oldValue` → Previous value of the key.  
   - `newValue` → New value of the key.  
   - `url` → URL of the document that made the change.  
   - `storageArea` → Reference to `localStorage` or `sessionStorage`.

-----------------------------------------------------
Examples:

// Listen for storage changes
window.addEventListener('storage', function(event) {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Changed in URL:', event.url);
});

// Trigger storage change in another tab
localStorage.setItem('theme', 'dark'); // event fires in other tabs

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Event listener listens for `storage` events.  
- Fires only in other tabs/windows sharing the same origin.  
- Useful for real-time synchronization between tabs without polling.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like one person updating a shared whiteboard and others noticing the change immediately.

-----------------------------------------------------
Example / Usage:

// Multi-tab theme sync
window.addEventListener('storage', function(event) {
  if(event.key === 'theme') {
    document.body.className = event.newValue;
  }
});

// Change theme in one tab
localStorage.setItem('theme', 'dark'); // other tabs update automatically

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does the storage event fire in the same tab?  
A1: No, only in other tabs/windows of the same origin.

Q2: Can storage events be used with sessionStorage?  
A2: Yes, but sessionStorage is per-tab, so storage events are rarely useful.

Q3: How to differentiate between localStorage and sessionStorage changes?  
A3: Use the `storageArea` property in the event object.

Q4: Can we stop a storage event from firing?  
A4: No, but we can ignore it programmatically.

Q5: Why are storage events useful in SPAs?  
A5: Synchronize state across multiple tabs/windows without server polling.
*/
