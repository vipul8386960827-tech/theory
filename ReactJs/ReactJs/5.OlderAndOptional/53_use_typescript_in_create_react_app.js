/* 53_use_typescript_in_create_react_app.js

=====================================================
Using TypeScript in Create React App (CRA)
=====================================================

Definition:
Create React App (CRA) provides built-in support for **TypeScript**, allowing  
developers to write React applications with static typing, better tooling,  
and improved developer experience.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Creating a New CRA Project with TypeScript**
   - Run:
     npx create-react-app my-app --template typescript  

2. **Adding TypeScript to an Existing CRA Project**
   - Install dependencies:
     npm install --save typescript @types/node @types/react @types/react-dom @types/jest  

3. **File Extensions**
   - Use `.ts` for TypeScript files.  
   - Use `.tsx` for TypeScript files containing JSX.  

4. **Benefits**
   - Compile-time type checking.  
   - Autocompletion and IntelliSense.  
   - Detects errors early, improving reliability.  

-----------------------------------------------------
Example: Functional Component with TypeScript
-----------------------------------------------------
import React from "react";

type GreetingProps = {
  name: string;
  age?: number; // optional prop
};

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <h2>
      Hello, {name}! {age && `You are ${age} years old.`}
    </h2>
  );
};

export default Greeting;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Using TypeScript in CRA is like **using a spell-checker while writing an essay**.  
- You still write normally, but errors are caught early, making the final  
  product cleaner and more professional.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why prefer TypeScript over plain JavaScript in React?  
A1: It reduces runtime errors, provides autocompletion, and makes code more maintainable.  

Q2: What’s the difference between `.ts` and `.tsx` files?  
A2: `.tsx` supports JSX inside TypeScript files, while `.ts` does not.  

Q3: Do you need to eject CRA to use TypeScript?  
A3: No, CRA has built-in TypeScript support, no need to eject.  

Q4: Can TypeScript work with existing JavaScript code in CRA?  
A4: Yes, you can gradually adopt TypeScript alongside JavaScript.  
*/
