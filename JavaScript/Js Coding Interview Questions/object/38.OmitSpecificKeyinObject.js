const obj = {
  name: "vipul",
  age: 30,
  college: {
    id: "college",
    institute: "skit",
  },
  school: {
    id: "school",
    institute: "seven",
  },
};
function pickKey(obj, keyToPick) {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null) {
      if (key === keyToPick) return;
      else result[key] = value;
    } else result[key] = pickKey(value, keyToPick);
  });

  return result;
}

const result = pickKey(obj, "id");
console.log(result);
