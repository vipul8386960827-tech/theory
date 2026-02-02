
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
function pickKey(obj, keyToPick, result = []) {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "object" || value === null) {
      if (key === keyToPick) result.push([key, value]);
    } else pickKey(value, keyToPick, result);
  });

  return result;
}

const result = pickKey(obj, "id");
console.log(result);
