/* 240_prop_drilling.js

=====================================
Prop Drilling in React
=====================================

Definition:
Prop Drilling occurs when you pass data from a parent component down through multiple
layers of child components, even if intermediate components do not need the data,
just to reach a deeply nested component.

Key Points:
1. Data is passed via props through every intermediary component.
2. Can lead to verbose and hard-to-maintain code in large applications.
3. Intermediate components only act as pass-throughs.
4. Often addressed using Context API, Redux, or other state management solutions.

Example:
function GreatGrandchild({ message }) {
  return <p>{message}</p>;
}

function Grandchild({ message }) {
  return <GreatGrandchild message={message} />;
}

function Child({ message }) {
  return <Grandchild message={message} />;
}

function Parent() {
  const message = "Hello from Parent";
  return <Child message={message} />;
}

Analogy:
- Like passing a secret message through multiple people just to reach the intended recipient.
- Each person in between doesn’t use the message but must carry it.

Follow-Up Interview Questions:
Q1: Why is prop drilling considered a problem?
A1: It creates unnecessary boilerplate, reduces code clarity, and makes maintenance harder.

Q2: How can prop drilling be avoided?
A2: Use Context API, Redux, or other global state management to provide data directly where needed.

Q3: Can small applications ignore prop drilling issues?
A3: Yes, in small apps with shallow component trees, prop drilling is often acceptable.

Q4: Does prop drilling affect performance?
A4: Slightly, as more components re-render when props change, but main concern is code maintainability.

*/
