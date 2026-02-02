/* 
2_prototype_chain.js – Interview-Ready Answer:

"In JavaScript, the prototype chain is a mechanism that allows objects to inherit 
properties and methods from other objects through their prototype links. 
It is the backbone of JavaScript’s inheritance system."

Key Points:

1️⃣ Prototype:
- Every JavaScript object has an internal property called [[Prototype]].
- Can be accessed using Object.getPrototypeOf(obj) or __proto__ (legacy).

2️⃣ Prototype Chain:
- If a property/method is not found in the object itself,
  JavaScript looks up the chain (its prototype, then its prototype’s prototype, etc.)
- This continues until it reaches Object.prototype, the top of the chain.
- If not found even there, JavaScript returns undefined.

3️⃣ Object.prototype:
- It is the root of the prototype chain.
- Contains common methods like toString(), hasOwnProperty().

4️⃣ ES6 Classes & Functions:
- Functions in JavaScript have a prototype property.
- When used with 'new', created objects inherit from that function’s prototype.
- Classes in ES6 are syntactic sugar over prototype-based inheritance.

5️⃣ Real-life Analogies:
- Global Analogy: Looking for a book in your room → if not found, search in your house → then in the city library.
- India-specific Analogy: Asking your elder sibling a doubt → if they don’t know, you ask your parents → then grandparents.
- Web Analogy: Searching for a CSS rule in an element → if not found, check its parent → then the global stylesheet.

6️⃣ Coding Example:

Object.prototype.greet = function(){
  console.log('hello',this.name)
}
const person = {
  name:"neha"
}

person.greet(person.name)
7️⃣ Possible Follow-Up Questions & Answers:

Q1: What is the difference between prototype and __proto__?  
A1: prototype is a property of functions (used for inheritance), 
while __proto__ is the actual reference to the prototype of an object.

Q2: Can you break the prototype chain?  
A2: Yes, by setting an object’s prototype to null → Object.create(null).

Q3: What happens if you access a property not present in the chain?  
A3: JavaScript returns undefined.

Q4: What is prototypal inheritance?  
A4: A mechanism where objects inherit properties and methods from other objects through the prototype chain.

Q5: How do classes in ES6 relate to prototypes?  
A5: ES6 classes are syntactic sugar; they still use prototypes internally for inheritance.
*/
