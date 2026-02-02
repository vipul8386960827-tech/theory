/* 47_spreading_props_on_dom_elements.js */
/*
Spreading Props on DOM Elements in React – Interview-Ready Answer

Definition:
Spreading props on DOM elements means using the JavaScript spread operator `...`
to pass all properties of an object to a React element at once,
instead of writing each prop individually.

------------------------------------------------
Key Points:
- It is a shorthand way to apply multiple props at once.
- Syntax: <Component {...props} />
- Useful when passing down a large number of props.
- But, it can cause problems if unintended props are spread onto
  DOM elements → React will warn about invalid attributes.

------------------------------------------------
Example 1: Spreading Props on Custom Component
------------------------------------------------
function Button(props) {
  return <button {...props}>{props.label}</button>;
}

/*
Usage:
<Button label="Click Me" onClick={() => alert("Clicked!")} />
Here, "label" and "onClick" are automatically applied
to the <button> element via {...props}.
*/

// ------------------------------------------------
// Example 2: Spreading Props on DOM Element (❌ Bad Practice)
// ------------------------------------------------
function Input(props) {
  return <input {...props} />;
}

/*
If props = { type: "text", placeholder: "Name", random: "oops" }
React will warn: "Received 'random' prop on a DOM element"

<Input {...{ type: "text", placeholder: "Name", random: "oops" }} />

Problem:
- The 'random' prop is not valid for <input>.
- React strips invalid props but logs warnings.
*/
/*
------------------------------------------------
Best Practice:
- Spread only **known props** to DOM elements.
- For custom components, spreading is safe because you control
  which props are valid.

Example:
function SafeInput({ type, placeholder }) {
  return <input type={type} placeholder={placeholder} />;
}

------------------------------------------------
Real-Life Analogy:
- Think of spreading props like handing someone your entire bag 🎒.
  If they only need a pen and a notebook, they might accidentally
  get your lunch too! Instead, only give what they need.

------------------------------------------------
Possible Follow-Up Questions with Answers:

Q1: Why should we avoid blindly spreading props on DOM elements?
A1: Because invalid props may cause warnings or unexpected behavior.

Q2: Is it safe to spread props on custom components?
A2: Yes, since you control which props are passed down
    and how they're used.

Q3: What are the benefits of spreading props?
A3: Cleaner syntax, less repetition, useful for higher-order
    components or when passing many props.

Q4: How can we avoid invalid props when spreading?
A4: Destructure only the props you need before spreading,
    or filter out unnecessary props.

Q5: When would you prefer explicit props over spreading?
A5: When you want clarity, better readability,
    and stricter control over what gets passed.
*/
