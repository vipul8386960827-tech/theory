/*
Comments in React – Interview-Ready Answer:

"In React, comments are used to explain code or temporarily disable code. The syntax 
depends on whether you are inside JavaScript or JSX."

// 1️⃣ JavaScript Comments (outside JSX):
// - Single-line comment
// This is a single-line comment

/* 
   - Multi-line comment
   This is a multi-line comment
*/

// Example in JS:
const name = "React"; // declaring a variable

/*
 Multi-line JS comment
 explaining the function
*/
function greet() {
    console.log("Hello " + name);
}

// 2️⃣ JSX Comments (inside JSX):
// - Standard JS comments do NOT work directly inside JSX
// - Use curly braces with JS comment inside: {/* comment */}
function Example() {
    return (
        <div>
            {/* This is a single-line JSX comment */}
            <h1>Hello World</h1>
            {/*
              Multi-line JSX comment
              inside JSX
            */}
        </div>
    );
}

// 3️⃣ Rules:
// - JS comments work in logic, hooks, or outside JSX.
// - JSX comments must be inside curly braces {}.
// - Multi-line JSX comments require opening and closing braces around /* */.

// 4️⃣ Real-life Analogies:
// - Global: Notes in a recipe explaining a step without affecting the cooking.
// - India-specific: Sticky notes on a notice board explaining instructions without changing the notice content.
// - Web: Comments in JSX using {/* comment */} to explain structure for developers.

// 5️⃣ Possible Follow-Up Questions & Answers:

// Q1: Can you use JS comments inside JSX directly?  
// A1: No, they must be wrapped in curly braces: {/* comment */}

// Q2: Can JSX comments affect rendering?  
// A2: No, comments are ignored during rendering.

// Q3: Are there tools to enforce comment standards in React projects?  
// A3: Yes, ESLint and Prettier can enforce consistent commenting styles.

// Q4: Can you comment out multiple JSX elements at once?  
// A4: Yes, wrap them in a fragment and use multi-line JSX comment syntax.

// Q5: Why are JSX comments needed?  
// A5: To explain code inside JSX without causing syntax errors.
