/* 19_fast_refresh */
/*
Key Points (Interviewer Keywords + Explanation):
1. Fast Refresh – Next.js feature that updates the UI instantly
   when code changes without losing component state.

2. Developer Experience – Provides a smooth and efficient
   workflow during development.

3. Hot Reload vs Fast Refresh – Fast Refresh preserves state,
   unlike older hot reload which may reset components.

4. Automatic – Enabled by default in Next.js development mode.

5. Common Use Cases – Editing React components, styling changes,
   and seeing updates immediately in the browser.
*/

/*
Definition (Using Specific Terms):
Fast Refresh is a Next.js development feature that allows
instant updates to the UI when a React component or module
is edited, while preserving the component’s state.
It combines the benefits of hot reloading and error recovery
for a better development experience.
*/

/*
Code Example (Usage):
// No special code required
// Just run the dev server
npm run dev

// Any changes to React components are reflected immediately
// without losing component state
*/

/*
Important Notes:
- Only works in development mode.
- Helps maintain local state while editing components.
- Supports both functional and class components.
- Automatically enabled; no configuration needed.
*/

/*
Follow-up Questions + Answers:

Q1: What is Fast Refresh in Next.js?
A1: A feature that updates UI instantly during development
    without losing component state.

Q2: How is it different from hot reload?
A2: Fast Refresh preserves component state, hot reload may reset it.

Q3: Do we need to enable Fast Refresh manually?
A3: No, it is enabled by default in development mode.

Q4: Does Fast Refresh work in production?
A4: No, it only works during development.

Q5: Why is Fast Refresh important?
A5: It improves developer experience by providing
    instant feedback while coding.
*/
