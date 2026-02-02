const flatObj = {
  name: "Alice",
  age: 30,
  "contact.email": "alice@example.com",
  "contact.phone.home": "123-456-7890",
  "contact.phone.mobile": "987-654-3210",
  "preferences.color": "blue",
  "preferences.food": "pizza",
  "hobbies.0": "cricket",
  "hobbies.1": "football",
};

function reverseDotNotation(obj) {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    const parts = key.split(".");
    assign(parts, value, result);
  });
  return result;
}
function assign(parts, value, result) {
  const first = parts[0];
  const remaining = parts.slice(1);
  if (remaining.length === 0) {
    result[first] = value;
    return;
  }
  if (!result.hasOwnProperty(first)) {
    result[first] = !isNaN(Number(remaining[0])) ? [] : {};
  }
  assign(remaining, value, result[first]);
}

const result = reverseDotNotation(flatObj);
console.log(result);
