const obj3 = {
  name: "fruits",
  items: ["apple", "banana"],
  info: {
    count: 2,
    types: ["fruit"],
  },
};

const extractValues = (obj) => {
  const result = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      result.push(value);
    } else result.push(...extractValues(value));
  });
  return result;
};

const result = extractValues(obj3);
console.log(result);
