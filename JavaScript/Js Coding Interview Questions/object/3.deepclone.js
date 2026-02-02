const nestedObject = {
  gender: "female",
  user: {
    name: "Alice",
    age: 25,
    contact: {
      email: "alice@example.com",
      phone: {
        home: "123-456-7890",
        work: "987-654-3210",
      },
    },
  },
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      sms: false,
    },
  },
  favorites: ["reading", "painting", { movies: ["Inception", "Interstellar"] }],
};

function deepCopy(obj) {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (
      typeof value !== "object" ||
      value === null ||
      typeof value === "boolean"
    ) {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null ? deepCopy(item) : item
      );
    } else if (value && typeof value === "object") {
      result[key] = deepCopy(value);
    }
  });

  return result;
}

const result = deepCopy(nestedObject);
console.log(result);
