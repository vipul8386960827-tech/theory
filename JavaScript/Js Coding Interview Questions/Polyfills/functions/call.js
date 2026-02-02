function greet(location) {
  return console.log(`hello ${this.name} and you are from ${location}`);
}
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  context.temp = this;
  const result = context.temp(...args);
  delete context.temp;
  return result;
};
const person = {
  name: "vipul",
};

greet.myCall(person, "rajasthan");

/*
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;          // default to global object if null/undefined
  const uniqueKey = Symbol();               // unique temporary property
  context[uniqueKey] = this;                // attach the function to context
  const result = context[uniqueKey](...args); // call the function with arguments
  delete context[uniqueKey];                // remove temporary property
  return result;                            // return the function result
};

// Example Usage
function greet(greeting, location) {
  console.log(`${greeting}, ${this.name} from ${location}`);
}

const person = { name: "Vipul" };

greet.myCall(person, "Hello", "Rajasthan"); 
// Output: "Hello, Vipul from Rajasthan"
 */