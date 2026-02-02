const nestedObj = {
  user: {
    name: "Alice",
    contact: {
      email: "alice@example.com",
      phone: "123-456-7890",
      work: {
        phone: "999-888-7777",
      },
    },
  },
  phone: "000-000-0000",
};

const deleteKeyWithPath = (obj, keyToDelete, path) => {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null) {
      result[key] = value;
    } else {
      if (path.length > 0) {
        const [first, ...remaining] = path;
        if (key === first) {
          result[key] = deleteKeyWithPath(value, keyToDelete, remaining);
        } else {
          result[key] = deleteKeyWithPath(value, keyToDelete, []);
        }
      } else {
        if (key === keyToDelete) return;
        result[key] = deleteKeyWithPath(value, keyToDelete, []);
      }
    }
  });
  return result;
};

const path = ["user", "contact"];
const keyToDelete = "phone";
const result = deleteKeyWithPath(nestedObj, keyToDelete, path);
console.log(result.user.contact);
