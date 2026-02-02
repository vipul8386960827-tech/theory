const obj1 = {
  name: "Alice",
  age: 30,
  contact: {
    email: "alice@example.com",
    phone: {
      home: "123-456-7890",
      mobile: "987-654-3210",
    },
  },
  preferences: {
    color: "blue",
    food: "pizza",
  },
  hobbies: ["reading", "gaming", "traveling"],
};

function dotNotation(obj, parentKey = "", result = {}) {
  Object.entries(obj).forEach(([key, value]) => {
    let fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value !== "object" || value === null) {
      result[fullKey] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${fullKey}.${index}`;
        result[arrayKey] = item;
      });
    } else {
      dotNotation(value, fullKey, result);
    }
  });
  return result;
}

const result = dotNotation(obj1);
console.log(result);
