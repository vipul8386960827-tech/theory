/* 
79_detect_caps_lock.js – Interview-Ready Answer

"In JavaScript, you can detect if Caps Lock is active during a keyboard event 
using the `event.getModifierState('CapsLock')` method."

1️⃣ Key Points to Highlight

1. Definition:
- `event.getModifierState('CapsLock')` returns `true` if Caps Lock is on.
- Works on `keydown`, `keypress`, or `keyup` events.

2. Syntax Example

const input = document.querySelector("#password");

input.addEventListener("keydown", (event) => {
    if (event.getModifierState("CapsLock")) {
        console.log("Caps Lock is ON");
    } else {
        console.log("Caps Lock is OFF");
    }
});

3. Real-Life Analogies

- Global Analogy: detecting if a shift lock is on while typing.
- India-specific Analogy: like checking if a typewriter’s caps lock key is engaged.
- Web Analogy: warning users on password fields if Caps Lock is accidentally on.

4. Code Explanation

- Useful in forms to alert users to avoid incorrect input due to caps.
- Works in modern browsers with standard keyboard events.
- Returns boolean value based on Caps Lock state.

5. Example / Usage

const passwordInput = document.getElementById("password");

passwordInput.addEventListener("keyup", function(event) {
    if(event.getModifierState("CapsLock")) {
        console.log("Warning: Caps Lock is on!");
    } else {
        console.log("Caps Lock is off");
    }
});

6️⃣ Follow-Up Interview Questions

Q1: Can you detect Caps Lock on mobile keyboards?  
A1: Usually no; mobile keyboards do not expose Caps Lock state.

Q2: Which event types can detect Caps Lock?  
A2: keydown, keyup, and keypress.

Q3: What does getModifierState return if the key is not active?  
A3: Returns false.

Q4: Can you detect other modifier keys?  
A4: Yes, Shift, Control, Alt, Meta can also be detected.

Q5: Why is this useful in forms?  
A5: Prevents user errors when typing passwords or case-sensitive input.
*/
