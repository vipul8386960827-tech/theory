/* 233_eslint_plugin_for_hooks.js

=====================================
ESLint Plugin for React Hooks
=====================================

Definition:
The ESLint plugin for React Hooks (eslint-plugin-react-hooks) enforces the Rules of Hooks
in React applications. It ensures hooks are used correctly, preventing bugs and unexpected behavior.

-------------------------------------
Key Points:
-------------------------------------
1. Rules Enforced:
   - Hooks must be called at the top level: Don’t call hooks inside loops, conditions, or nested functions.
   - Hooks must be called from React functions: Only call hooks from functional components or custom hooks.

2. Installation:
npm install eslint-plugin-react-hooks --save-dev

3. Configuration:
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
   - rules-of-hooks: Checks hook usage rules.
   - exhaustive-deps: Ensures dependencies in useEffect and similar hooks are complete.

4. Benefits:
   - Prevents runtime errors due to incorrect hook usage.
   - Helps maintain predictable component behavior.
   - Improves code quality and adherence to React best practices.

-------------------------------------
Example:
-------------------------------------
import React, { useState, useEffect } from "react";

function Counter({ step }) {
  const [count, setCount] = useState(0);

  // Correct usage
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + step), 1000);
    return () => clearInterval(timer);
  }, [step]); // exhaustive-deps ensures 'step' is included

  return <div>{count}</div>;
}

-------------------------------------
Analogy:
-------------------------------------
- ESLint plugin = safety inspector
- Hooks rules = safety guidelines
- Ensures the building (React app) is structurally sound and avoids accidents (bugs).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What does react-hooks/rules-of-hooks check?
A1: Ensures hooks are only called at the top level and from React functional components or custom hooks.

Q2: What does react-hooks/exhaustive-deps do?
A2: Warns if dependencies in hooks like useEffect are missing, preventing stale closures.

Q3: Can you disable these rules?
A3: Yes, but it’s not recommended as it may introduce hard-to-debug errors.

Q4: Why is this plugin important for React apps using hooks?
A4: Hooks are sensitive to call order; violating rules can break component state and cause unexpected behavior.
*/
