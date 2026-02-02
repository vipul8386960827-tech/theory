/*
"React is a JavaScript library created by Facebook.  
It helps in building user interfaces that are fast and scalable.  
Instead of writing the whole UI in one place, React lets you split it  
into small, reusable components.  

It uses something called a virtual DOM, which makes updates efficient  
because only the parts that actually change get re-rendered.  
React also follows a declarative style, so I just describe how  
the UI should look, and React takes care of updating it.  

Another key point is that React enforces one-way data flow,  
which makes applications more predictable and easier to debug."  
*/


/*
How to explain React's Declarative Approach in an interview:

1. Start with a simple definition:
Declarative means you describe *what you want the UI to look like*,  
and React figures out *how to update it*.  

In contrast, an imperative approach means you manually tell the DOM  
what steps to take each time something changes.  

-----------------------------------
2. Use an example:

Imperative (vanilla JS):
- Suppose I want to show a button that toggles between "ON" and "OFF".
- In plain JavaScript, I would write code like:
    - Get the button element.
    - Check its current text.
    - If it's "ON", change it to "OFF".
    - If it's "OFF", change it to "ON".
- Here I’m giving step-by-step instructions to the DOM.

Declarative (React):
- In React, I just write a component:
    function ToggleButton() {
        const [isOn, setIsOn] = useState(true);
        return (
            <button onClick={() => setIsOn(!isOn)}>
                {isOn ? "ON" : "OFF"}
            </button>
        );
    }
- Here I don’t care about *how* the DOM changes.  
- I just declare: "If state is true, show ON. Otherwise, show OFF."  
- React takes care of updating the DOM whenever state changes.

-----------------------------------
3. How to speak this naturally:
"In React, we use a declarative style.  
That means I don’t manually write steps to update the DOM.  
Instead, I just describe what the UI should look like for a given state.  
For example, in a toggle button, I simply say —  
if the state is true, show 'ON', else show 'OFF'.  
React automatically updates the UI when the state changes.  
This makes code simpler and less error-prone compared to imperative DOM updates."  

-----------------------------------
✅ Tip:
Always contrast declarative vs imperative with a simple example  
(toggle button, counter, todo app). This makes your explanation clear.  
*/
