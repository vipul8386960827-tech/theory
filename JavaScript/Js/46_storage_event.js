/* 
46_storage_event.js – Interview-Ready Answer:

"The `storage` event in JavaScript is triggered on other tabs or windows of 
the same origin when localStorage or sessionStorage is modified. It allows 
cross-tab communication and synchronization."

1️⃣ Key Points to Highlight:

1. Event Characteristics:

- Triggered on other windows/tabs, NOT on the same tab where storage changes.
- Works with localStorage (sessionStorage does not trigger cross-tab events).
- Useful for syncing UI or state across multiple tabs.
- Event object properties:
  - `key` → key that changed
  - `oldValue` → previous value
  - `newValue` → new value
  - `url` → URL of the document that made the change
  - `storageArea` → localStorage or sessionStorage reference

2. Syntax:

window.addEventListener("storage", function(event) {
    // handle event.key, event.oldValue, event.newValue
});
.
3. Examples:

// Tab A – listen for storage changes
window.addEventListener("storage", event => {
    console.log("Key changed:", event.key);
    console.log("Old value:", event.oldValue);
    console.log("New value:", event.newValue);
    console.log("Storage type:", event.storageArea);
});

// Tab B – make a change
localStorage.setItem("theme", "dark"); // triggers storage event in Tab A
localStorage.removeItem("theme");       // triggers storage event in Tab A

4️⃣ Real-Life Analogies:

- Global Analogy:
  - storage event = coworkers getting notified when shared spreadsheet is updated.
- India-specific Analogy:
  - storage event = multiple people using a WhatsApp group; one person updates info, others get notified.
- Web Analogy:
  - One tab changes localStorage; other tabs receive event to update UI.

5️⃣ Code Explanation:

- `storage` event allows cross-tab synchronization.
- Only triggered in other tabs; the tab making the change does not receive it.
- Use `event.key`, `event.newValue`, and `event.oldValue` to react appropriately.
- Can detect addition, modification, or deletion of data.

6️⃣ Example / Usage:

// Tab A: listen for changes
window.addEventListener("storage", event => {
    if(event.key === "theme") {
        console.log("Theme changed from", event.oldValue, "to", event.newValue);
        // Update UI accordingly
    }
});

// Tab B: modify storage
localStorage.setItem("theme", "light"); // triggers event in Tab A
localStorage.removeItem("theme");       // triggers event in Tab A

7️⃣ Follow-Up Interview Questions:

Q1: Does storage event trigger in the same tab?  
A1: No, only in other tabs/windows of the same origin.

Q2: Can sessionStorage trigger storage events?  
A2: No, only localStorage triggers cross-tab storage events.

Q3: What properties are available in the storage event object?  
A3: `key`, `oldValue`, `newValue`, `url`, `storageArea`.

Q4: Use cases of storage event?  
A4: Syncing user settings, theme, cart items, or authentication state across tabs.

Q5: How to prevent unintended updates?  
A5: Check `event.key` and `event.newValue` before updating UI or state.
*/
