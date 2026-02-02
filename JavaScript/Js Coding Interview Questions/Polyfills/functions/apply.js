function greet(location) {
  return console.log(`Hello ${this.name} and is from ${location}`);
}
const person = {
  name: "vipul",
};

Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  context.temp = this;
  const result = context.temp(...args);
  delete context.temp;
  return result;
};
greet.myApply(person, ["rajasthan"]);
/*
Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;          // default to global object
  const uniqueKey = Symbol();               // unique temporary property
  context[uniqueKey] = this;                // attach function to context
  const result = context[uniqueKey](...args); // call function with arguments
  delete context[uniqueKey];                // remove temporary property
  return result;                            // return function result
};

// Example Usage
function greet(location) {
  console.log(`Hello ${this.name} and is from ${location}`);
}

const person = { name: "Vipul" };

greet.myApply(person, ["Rajasthan"]); 
// Output: "Hello Vipul and is from Rajasthan"



*/