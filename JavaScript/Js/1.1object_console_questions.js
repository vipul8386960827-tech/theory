// Question 1
const a = {};
const b = { key: "b" };
const c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]);

// Question 2
// What is the difference between Object.freeze(), Object.seal(), and Object.preventExtensions()?
// Include how they affect properties, values, and nested objects.

// Question 3
const user = {
  name: "Vipul",
  address: {
    city: "Jaipur",
  },
};
Object.freeze(user);
user.name = "Deepika";
user.address.city = "Udaipur";
user.address = { city: "Delhi" };
console.log(user.name);
console.log(user.address.city);
console.log(user.address);

// Question 4
// (Same as Question 3 — shallow freeze focus)

// Question 5
// (Asked again for repetition) — shallow freeze with nested objects (same code as Question 3)

// Question 6
const obj = { a: { b: 1 } };
const clone = { ...obj };
clone.a.b = 2;
console.log(obj.a.b);
console.log(clone.a.b);

// Question 7
const a2 = {};
const b2 = { key: "b" };
const c2 = { key: "c" };
a2[b2] = 123;
a2[c2] = 456;
console.log(a2[b2]);
console.log(a2[c2]);

// Question 8
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(+0 === -0);
console.log(Object.is(+0, -0));

// Question 9
const obj2 = { a: { b: 1 } };
const clone2 = JSON.parse(JSON.stringify(obj2));
clone2.a.b = 2;
console.log(obj2.a.b);
console.log(clone2.a.b);

// Question 10
const obj3 = { a: { b: 1 } };
const clone3_1 = { ...obj3 };
const clone3_2 = Object.assign({}, obj3);
clone3_1.a.b = 2;
clone3_2.a.b = 3;
console.log(obj3.a.b);
console.log(clone3_1.a.b);
console.log(clone3_2.a.b);

// Question 11
const obj4 = Object.defineProperties(
  {},
  {
    a: { value: 1, writable: false, enumerable: true, configurable: false },
    b: { value: 2, writable: true, enumerable: false, configurable: true },
  }
);
// 1. What will Object.keys(obj4) return?
// 2. What will Object.getOwnPropertyNames(obj4) return?
// 3. Can we modify obj4.a? Can we delete obj4.a?
// 4. Can we modify obj4.b? Can we delete obj4.b?

// Question 12
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { d: 3 };
const merged = Object.assign(obj2, obj1);
merged.b.c = 42;
console.log(obj1.b.c);
console.log(merged.b.c);
console.log(obj2.b.c);

// Question 13
const proto = { greeting: "Hello" };
const obj5 = Object.create(proto);
obj5.greeting = "Hi";
delete obj5.greeting;
console.log(obj5.greeting);
console.log(obj5.hasOwnProperty("greeting"));
console.log(proto.greeting);
