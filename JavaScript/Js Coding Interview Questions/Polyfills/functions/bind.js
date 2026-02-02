Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;

  function boundFunction(...args) {
    const thisArg =
      this instanceof boundFunction ? this : context || globalThis;
    return fn.apply(thisArg, [...boundArgs, ...args]);
  }

  boundFunction.prototype = Object.create(fn.prototype);

  return boundFunction;
};

function Person(name, city) {
  this.name = name;
  this.city = city;
}

Person.prototype.sayHi = function () {
  return `Hi, I am ${this.name} from ${this.city}`;
};

const BoundPerson = Person.myBind({});
const p = new BoundPerson("Vipul", "Rajasthan");

console.log(p.name);
console.log(p.city);
console.log(p instanceof Person);
console.log(p instanceof BoundPerson);

function greet(greeting, location) {
  return `${greeting}, ${this.name} from ${location}`;
}

const boundGreet = greet.myBind({ name: "Vipul" }, "Hello");
console.log(boundGreet("Jaipur"));
