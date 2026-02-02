/*
=====================================
Import & Export Components in ES6 (React)
=====================================

Definition:
ES6 modules allow you to organize and reuse code by exporting and 
importing components, functions, or variables between files.  
React components can be exported as default or named exports.

-------------------------------------
Key Points:
-------------------------------------
- **Default Export**: A file can have only one default export.  
- **Named Export**: A file can have multiple named exports.  
- **Import Syntax** varies depending on the export type.  
- Helps maintain modular code and easier component reuse.

-------------------------------------
Example 1: Default Export
-------------------------------------
// File: Button.js
import React from "react";

export default function Button() {
  return <button>Click Me</button>;
}

// File: App.js
import React from "react";
import Button from "./Button"; // Import default export

function App() {
  return <Button />;
}

-------------------------------------
Example 2: Named Export
-------------------------------------
// File: Button.js
import React from "react";

export function ButtonPrimary() {
  return <button>Primary</button>;
}

export function ButtonSecondary() {
  return <button>Secondary</button>;
}

// File: App.js
import React from "react";
import { ButtonPrimary, ButtonSecondary } from "./Button"; // Named imports

function App() {
  return (
    <div>
      <ButtonPrimary />
      <ButtonSecondary />
    </div>
  );
}

-------------------------------------
Example 3: Mixed Default & Named Export
-------------------------------------
// File: Button.js
import React from "react";

export default function Button() {
  return <button>Default Button</button>;
}

export function ButtonSecondary() {
  return <button>Secondary</button>;
}

// File: App.js
import React from "react";
import Button, { ButtonSecondary } from "./Button";

function App() {
  return (
    <div>
      <Button />
      <ButtonSecondary />
    </div>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Default export = main product in a box 📦  
- Named exports = additional items in the same box 🧩  
- Import allows you to use only what you need in your project.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you rename imports?
A1: Yes, using `import { ButtonPrimary as Primary } from "./Button"`.

Q2: Can default exports have a name?
A2: Yes, but when importing you can give any name.

Q3: Can you import everything at once?
A3: Yes, `import * as Buttons from "./Button"` and access via `Buttons.ButtonPrimary`.

Q4: Why use named exports over default?
A4: Named exports improve clarity and allow multiple exports per file.

Q5: What happens if you mix default and named incorrectly?
A5: You’ll get a runtime or compile-time error depending on the mismatch.
*/
