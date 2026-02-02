/*
Static Type Checking in React – Interview-Ready Answer:

"React applications benefit from static type checking because it helps catch bugs 
at compile-time rather than runtime. React itself doesn’t enforce type checking, 
but it supports popular tools for it."

------------------------------------------------
1️⃣ Methods of Static Type Checking in React
------------------------------------------------
1. PropTypes (Built-in, Runtime Checking)
   - React provides `PropTypes` for validating props passed to components.  
   - Not true static typing (checked at runtime, not compile-time).  
   - Still useful for catching errors during development.  

   Example:
   import PropTypes from 'prop-types';

   function Button({ label, onClick }) {
     return <button onClick={onClick}>{label}</button>;
   }

   Button.propTypes = {
     label: PropTypes.string.isRequired,
     onClick: PropTypes.func.isRequired
   };

   // If a wrong type is passed, React gives a warning in development mode.

2. TypeScript (Compile-Time Checking)
   - Most popular static type checker for React.  
   - Enforces types during development, catches errors before runtime.  
   - Provides autocompletion, better tooling, and stricter contracts.  

   Example:
   type ButtonProps = {
     label: string;
     onClick: () => void;
   };

   function Button({ label, onClick }: ButtonProps) {
     return <button onClick={onClick}>{label}</button>;
   }

   // If label is passed as a number, TypeScript will throw a compile-time error.

3. Flow (Facebook’s Static Type Checker)
   - Created by Facebook (like React), but less popular now compared to TypeScript.  
   - Requires adding `// @flow` at the top of files.  
   - Provides static analysis, but has smaller ecosystem than TypeScript.  

   Example:
   // @flow
   type ButtonProps = {
     label: string,
     onClick: () => void
   };

   function Button({ label, onClick }: ButtonProps) {
     return <button onClick={onClick}>{label}</button>;
   }

------------------------------------------------
2️⃣ Real-Life Analogy
------------------------------------------------
- TypeScript = Passport check before entering airport ✈️ (errors caught before you board).  
- PropTypes = Security check at boarding gate 🛂 (issues caught later, during runtime).  
- Flow = Regional ID check 🪪 (works, but not as widely adopted as Passport/TypeScript).  

------------------------------------------------
3️⃣ Possible Follow-Up Questions
------------------------------------------------
Q1: Which method is most commonly used today?  
A1: TypeScript is the industry standard because it provides true static checking and a strong ecosystem.  

Q2: Why still use PropTypes if TypeScript exists?  
A2: PropTypes is lightweight, requires no setup, and works in plain JS projects where TypeScript is not used.  

Q3: Can PropTypes and TypeScript be used together?  
A3: Yes, some teams use both — TypeScript for compile-time checks and PropTypes for runtime safety.  

Q4: What’s the main difference between TypeScript and Flow?  
A4: Both provide static type checking, but TypeScript has a larger community, better tooling, and is now the preferred option.  
*/
