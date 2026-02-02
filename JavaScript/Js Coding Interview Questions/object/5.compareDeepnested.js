const obj1 = {
  name: "Alice",
  age: 30,
  contact: {
    email: "alice@example.com",
  },
};

const obj2 = {
  name: "Alice",
  age: 30,
  contact: {
    email: "alice@example.com",
  },
};

const obj3 = {
  name: "Alice",
  age: 30,
  contact: {
    email: "alice@wonderland.com", // different email
  },
};

function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every(
    (key) =>
      obj2.hasOwnProperty(key) &&
      (typeof obj1[key] === "object" && obj1[key] !== null
        ? isEqual(obj1[key], obj2[key])
        : obj1[key] === obj2[key])
  );
}
isEqual(obj1, obj2);

console.log(isEqual(obj1, obj1));
