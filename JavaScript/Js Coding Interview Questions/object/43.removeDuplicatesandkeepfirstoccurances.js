const obj = {
  name: "Alice",
  nickname: "Alice",
  contact: {
    email: "alice@example.com",
    backupEmail: "alice@example.com",
  },
  age: 25,
};

function uniqueFirstOccurances(obj, keysPresent = []) {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" && !keysPresent.includes(value)) {
      result[key] = value;
      keysPresent.push(value);
    } else if (value && typeof value === "object") {
      result[key] = uniqueFirstOccurances(value, keysPresent);
    }
  });
  return result;
}

const result = uniqueFirstOccurances(obj);
console.log(result);
