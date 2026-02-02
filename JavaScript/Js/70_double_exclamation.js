/* 
70_double_exclamation.js – Interview-Ready Answer

"The double exclamation mark (!!) in JavaScript is used to convert any 
value to its Boolean equivalent (true or false)."

1️⃣ Key Points to Highlight

1. Definition:
- First `!` negates the value (truthy → false, falsy → true).
- Second `!` negates again, producing the actual Boolean equivalent.

2. Truthy & Falsy Values:
- Falsy: false, 0, "", null, undefined, NaN
- Truthy: all other values

3. Syntax Example

let value = "Hello";
console.log(!!value); // true

let value2 = 0;
console.log(!!value2); // false

4. Real-Life Analogies

- Global Analogy: !! = light switch: on/off; converts any ambiguous input to yes/no.
- India-specific Analogy: !! = checking if an account is active (true) or inactive (false).
- Web Analogy: Converting API response to a boolean: null → false, string → true.

5. Code Explanation

- !!value converts any value to true/false explicitly.
- Useful for conditional checks or when Boolean type is required.
- Avoids implicit type coercion pitfalls.

6. Example / Usage

const userInput = "some text";
if(!!userInput) { 
    console.log("Input provided"); 
} else {
    console.log("No input");
}

const emptyInput = "";
if(!!emptyInput) { 
    console.log("Input provided"); 
} else {
    console.log("No input"); // Executed
}

7️⃣ Follow-Up Interview Questions

Q1: Why use !! instead of Boolean()?  
A1: !! is shorthand and often faster; Boolean() is explicit.

Q2: What does !!null evaluate to?  
A2: false

Q3: What does !![] evaluate to?  
A3: true (arrays are truthy)

Q4: Can !! be chained more than twice?  
A4: Yes, but unnecessary; !! is sufficient.

Q5: Does it modify the original value?  
A5: No, it returns a Boolean without changing the original variable.
*/
