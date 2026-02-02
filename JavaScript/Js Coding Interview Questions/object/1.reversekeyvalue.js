const sampleObject = {
  name: "Alice",
  age: 30,
  city: "Wonderland",
  contact: {
    email: "alice@example.com",
    phone: "123-456-7890",
    others: {
      fax: "123456789",
    },
  },
  preferences: {
    color: "blue",
    food: "pizza",
  },
};

const reverseObj = (obj) => {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object") {
      result[value] = key;
    } else {
      result[key] = reverseObj(value);
    }
  });
  return result;
};
const result = reverseObj(sampleObject);
console.log(result);
