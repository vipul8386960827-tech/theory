const obj = {
  name: "Alice",
  age: 30,
  contact: {
    phone: "123-456-7890",
    email: "alice@example.com",
    zip: 12345,
  },
  preferences: {
    food: "pizza",
    color: "blue",
  },
};

function deepSortKeys(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  const sortedKeys = Object.keys(obj).sort();
  const result = {};

  sortedKeys.forEach((key) => {
    result[key] = deepSortKeys(obj[key]);
  });

  return result;
}

const sortedObj = deepSortKeys(obj);
console.log(sortedObj);
