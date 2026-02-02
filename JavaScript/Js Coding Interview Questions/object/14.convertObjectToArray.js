const obj = {
  name: "Alice",
  address: {
    city: "Wonderland",
    geo: {
      lat: 12.34,
      long: 56.78,
    },
  },
  contact: {
    email: "alice@example.com",
    phone: "123-456",
  },
};

function arrayPairs(obj, parentKey = "") {
  let result = [];

  Object.entries(obj).map(([key, value]) => {
    let fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value !== "object" || value === null) {
      result.push({ key: fullKey, value: value });
    } else {
      result.push(...arrayPairs(value, fullKey));
    }
  });
  return result;
}

const result = arrayPairs(obj);
console.log(result);
