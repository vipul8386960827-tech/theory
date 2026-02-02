/* 
3_call_apply_bind.js – Interview-Ready Answer:

"In JavaScript, call, apply, and bind are methods available on functions that allow you 
to explicitly set the value of 'this' when invoking a function. 
They are commonly used when we are borrowing a function from other object.

call, apply, and bind are used for function borrowing and to **explicitly control the this context. 
callandapply invoke the function immediately—calltakes comma-separated arguments,applytakes an array. 
binddoes not execute immediately; it returns a new function withthispermanently fixed. 
We mainly use these to borrow methods across objects or to set the correctthis` in callbacks."

Key Points:

1️⃣ call():
- Immediately invokes the function with a specified 'this' context.
- Arguments are passed individually (comma-separated).

2️⃣ apply():
- Similar to call(), but arguments are passed as an array (or array-like object).
- Useful when arguments are already in array form.

3️⃣ bind():
- Does NOT invoke the function immediately.
- Returns a new function with 'this' permanently bound to the provided context.
- Useful for callbacks, event handlers, and preserving context.

4️⃣ Real-life Analogies:
- Global Analogy: Borrowing someone else’s bike → call/apply = ride it immediately, bind = reserve it for later.
- India-specific Analogy: Ordering food → call/apply = eating it immediately, bind = packing it for later.
- Web Analogy: call/apply = executing an API call right now, bind = saving API configuration for later use.

5️⃣ Coding Examples:
*/
const obj1 = {
  name:'deepika',
  age:30,
  greet:function(location='Mumbai'){
    console.log(`hello ${this.name}. Your age is ${this.age} and your location is ${location}`)
  }
}
// obj1.greet()

const person={
  name:'vipul',
  age:30
}

// obj1.greet.call(person,'Rajasthan')
// obj1.greet.apply(person,['rajasthan'])
const personGreet=obj1.greet.bind(person)
personGreet('India')
/*
6️⃣ Possible Follow-Up Questions & Answers:

Q1: Difference between call and bind?  
A1: call invokes immediately, bind returns a new function for later use.

Q2: When would you use apply over call?  
A2: When arguments are in an array or array-like structure (e.g., Math.max.apply(null, arr)).

Q3: Can bind be used for partial application?  
A3: Yes, bind can preset some arguments, creating a partially applied function.

Q4: Why is bind often used in React?  
A4: To ensure 'this' refers to the correct component instance when passing methods as callbacks.

Q5: What happens if you pass null or undefined as the 'this' value?  
A5: In non-strict mode, 'this' defaults to the global object (window in browsers). In strict mode, it remains null/undefined.
*/
