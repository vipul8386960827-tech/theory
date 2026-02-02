/* 
101_events.js – Interview-Ready Answer

"In JavaScript, events are actions or occurrences that happen in the 
system you are programming, which the system can respond to using event 
listeners."

1️⃣ Key Points to Highlight

1. Definition:
- Events are user interactions (click, hover, input) or system occurrences 
  (load, resize, API response).
- JavaScript can detect events and execute code in response.

2. Types of Events:
- Mouse events: click, dblclick, mouseover, mouseout
- Keyboard events: keydown, keyup, keypress
- Form events: submit, change, focus, blur
- Window events: load, resize, scroll
- Custom events: user-defined using CustomEvent API

Default Syntax of the EventListeners is 
element.addEventLister(eventType,listener(callBackfunction),useCapture)

EventTypes example can be:-
/* 
Mouse Events:
click        → Triggered when an element is clicked
dblclick     → Triggered when an element is double-clicked

Keyboard Events:
keydown      → Triggered when a key is pressed down
keyup        → Triggered when a key is released

Form Events:
submit       → Triggered when form is submitted

Window / Document Events:
scroll       → Triggered when user scrolls
resize       → Triggered when window is resized
load         → Triggered when page fully loads

listen is the callback function 

useCapture is used to determine the phase at which the listener is to be triggered
by default it is true i mean during capture phase and if passed false than on bubbeling phase
{
    once: boolean => runs only once and after that this event listener is removed automatically
    passive: boolean => than listen cannot call prevent default it helps to improve performance in scroll or touch
}


9️⃣ Follow-Up Interview Questions

Q1: What is the difference between bubbling and capturing?  
A1: Bubbling goes from target → ancestor; capturing goes ancestor → target.

Q2: How can you stop event propagation?  
A2: Using event.stopPropagation() or event.stopImmediatePropagation().

Q3: What is the use of event.preventDefault()?  
A3: Prevents default browser behavior (e.g., link navigation, form submission).

Q4: Can you attach multiple event listeners to the same element?  
A4: Yes, all attached listeners execute in order.

Q5: What are custom events?  
A5: User-defined events triggered using `dispatchEvent` with `CustomEvent`.
*/
