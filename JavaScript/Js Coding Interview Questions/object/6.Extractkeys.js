const obj3 = {
  name: "fruits",
  items: ["apple", "banana"],
  info: {
    count: 2,
    types: ["fruit"],
  },
};

const extractKeys = (obj) => {
  let result = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      result.push(key);
    } else {
      result.push(key);
      result.push(...extractKeys(value));
    }
  });
  return result;
};

const result = extractKeys(obj3);
console.log(result);
