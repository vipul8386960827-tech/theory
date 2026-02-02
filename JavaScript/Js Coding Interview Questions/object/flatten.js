const sampleObject = {
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
};

const flattenObject = (obj, parentKey = "", result = {}) => {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      flattenObject(value, newKey, result); // recurse for nested objects
    } else {
      result[newKey] = value; // assign primitive value
    }
  });
  return result;
};

const flat = flattenObject(sampleObject);
console.log(flat);
