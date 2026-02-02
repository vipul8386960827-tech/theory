obj1 = {
  name: "Alice",
  profile: {
    age: 25,
    location: { city: "New York", country: "USA" },
  },
  preferences: { theme: "light" },
};

obj2 = {
  profile: {
    location: { city: "Los Angeles" },
    hobbies: ["reading", "music"],
  },
  preferences: { notifications: true },
};

function mergeTwoObject(obj1, obj2) {
  const result = { ...obj1 };
  Object.entries(obj2).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      obj1[key] &&
      typeof obj1[key] === "object" &&
      !Array.isArray(obj1[key])
    ) {
      result[key] = mergeTwoObject(obj1[key], value);
    } else if (Array.isArray(value) && Array.isArray(obj1[key])) { /////reuqired only if he asks me to concat the arrays
      // Concatenate arrays if both sides are arrays
      result[key] = obj1[key].concat(value);
    } else {
      result[key] = value;
    }
  });
  return result;
}

const result = mergeTwoObject(obj1, obj2);
console.log(result);
