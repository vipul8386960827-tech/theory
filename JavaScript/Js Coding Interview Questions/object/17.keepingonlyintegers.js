const obj = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: 12345,
    coordinates: {
      lat: 12.34,
      long: 56.78,
      area: "Central",
    },
  },
  contact: {
    email: "alice@example.com",
    phone: 9998887777,
  },
};

const onlyNumberValues = (obj) => {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "number") {
      result[key] = value;
    } else if (typeof value === "object") {
      const nested = onlyNumberValues(value);
      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    }
  });
  return result;
};

const result = onlyNumberValues(obj);
console.log(result.address.coordinates);
