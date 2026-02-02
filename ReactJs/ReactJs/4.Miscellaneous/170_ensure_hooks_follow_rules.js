/* 170_ensure_hooks_follow_rules.js

=================================================
How to Ensure Hooks Follow the Rules
=================================================

React provides **linting tools** and **best practices** to make sure 
you don’t break the rules of hooks.

-------------------------------------
1. ESLint Plugin
-------------------------------------
- Install: `npm install eslint-plugin-react-hooks --save-dev`
- This plugin enforces the **Rules of Hooks**:
  - Checks that hooks are only called at the top level.
  - Ensures dependencies in `useEffect`, `useCallback`, and `useMemo` are correct.

-------------------------------------
2. React DevTools
-------------------------------------
- Shows component state, props, and hooks.
- Helps catch improper hook usage during debugging.

-------------------------------------
3. Custom Hook Naming
-------------------------------------
- Always prefix custom hooks with `use` so the linter can recognize them.

-------------------------------------
4. Team Guidelines
-------------------------------------
- Agree on code review standards:
  - No hooks inside conditions/loops.
  - Proper dependency arrays in effects.

-------------------------------------
Example ESLint Config:
-------------------------------------
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",     // checks top-level usage
    "react-hooks/exhaustive-deps": "warn"      // checks effect deps
  }
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of ESLint rules like a **seatbelt**:
  - They don’t stop you from driving (coding), 
  - but they protect you from accidents (bugs due to broken hook rules).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you call a hook inside a loop?  
A1: React loses track of hook order, causing unpredictable bugs.

Q2: How does `react-hooks/exhaustive-deps` help?  
A2: It warns when dependencies in hooks are missing or incorrect.

Q3: Can we disable these linting rules?  
A3: Yes, but it’s highly discouraged since it increases risk of bugs.
*/
