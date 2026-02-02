const obj = {
  name: "Alice",
  age: null,
  contact: {
    email: "alice@example.com",
    phone: undefined,
    address: {
      city: "Wonderland",
      zip: null,
    },
  },
  preferences: {
    color: "blue",
    food: undefined,
  },
  hobbies: [null, "reading", undefined, "gaming"],
};

function removeUndefinedNull(obj) {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object") {
      if (value !== undefined && value !== null) {
        result[key] = value;
      }
    } else if (Array.isArray(value)) {
      result[key] = value.filter((item) => {
        if (item !== null || item !== undefined) return item;
      });
    } else if (value && typeof value === "object") {
      result[key] = removeUndefinedNull(value);
    }
  });
  return result;
}

const result = removeUndefinedNull(obj);
console.log(result);
