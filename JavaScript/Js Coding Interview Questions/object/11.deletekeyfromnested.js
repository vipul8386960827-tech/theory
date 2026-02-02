const nestedObj = {
  user: {
    name: "Alice",
    contact: {
      email: "alice@example.com",
      phone: "123-456-7890",
    },
  },
  isActive: true,
};

function deletedKey(obj, keyToSkip) {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object") {
      if (key === keyToSkip) return;
      else result[key] = value;
    } else {
      if (key === keyToSkip) return;
      result[key] = deletedKey(value, keyToSkip);
    }
  });
  return result;
}

const result = deletedKey(nestedObj, "contact");
console.log(result);
