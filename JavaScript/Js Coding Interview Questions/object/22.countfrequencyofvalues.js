const obj = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: 12345,
    area: "Central",
  },
  contact: {
    email: "alice@example.com",
    phone: 12345,
  },
  location: { coordinates: { lat: 99, lng: 99 } },
  hobbies: ["reading", "gaming", "reading"],
};

function extractValues(obj) {
  let result = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null) result.push(value);
    else result.push(...extractValues(value));
  });

  return result;
}
function countFrequency(arr) {
  const frequency = {};
  arr.forEach((ele) => {
    if (!frequency.hasOwnProperty(ele)) frequency[ele] = 1;
    else frequency[ele]++;
  });
  return frequency;
}

let result = extractValues(obj);
result = countFrequency(result);
console.log(result);
