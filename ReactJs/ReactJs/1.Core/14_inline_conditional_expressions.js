/* 14_inline_conditional_expressions.js */
/*
Inline conditional expressions in React allow you to conditionally render JSX 
directly within the return statement using JavaScript expressions like ternary operators, 
logical AND (`&&`), or immediately invoked functions.  
This helps keep the JSX concise and readable.

---

📌 Real-life Examples:

- **Global analogy (Traffic light):**
  Show green or red light depending on condition:  
  `isGreen ? "Go" : "Stop"` → inline decision-making.

- **India-specific analogy (Weather alert app):**
  Display umbrella icon only if it’s raining:  
  `isRaining && <UmbrellaIcon />` → inline conditional rendering.

- **Web analogy:**
  `{isLoggedIn ? <LogoutButton /> : <LoginButton />}`
  `{notifications.length > 0 && <NotificationBadge count={notifications.length} />}`

---

📌 Possible Follow-Up Questions & Answers:

Q1: Can you use `if` statements directly inside JSX?  
A1: No, `if` statements cannot be used directly inside JSX. Use ternary or logical operators instead.

Q2: What is the difference between `&&` and ternary operator?  
A2: `&&` renders the right-hand side only if the condition is true.  
   Ternary allows specifying both true and false cases.

Q3: Can you chain multiple inline conditionals?  
A3: Yes, but keep it readable. For complex conditions, extract into variables or helper functions.

Q4: Are inline conditionals efficient?  
A4: Yes, they are just JavaScript expressions evaluated during rendering.

Q5: Can inline conditionals include JSX elements?  
A5: Yes, you can return any valid JSX from inline expressions.
*/
