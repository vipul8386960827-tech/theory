const obj = {
  name: ["Alice", "Bob", "Charlie"],
  age: [25, 30, 35],
  city: ["Wonderland", "Builderland", "ChocolateFactory"],
};

function convertToObject(obj) {
  let result = [];
  const keys = [];
  const values = [];
  Object.entries(obj).forEach(([key, value]) => {
    keys.push(key);
    values.push(value);
  });
  for (let i = 0; i < values.length; i++) {
    const item = {};
    for (let j = 0; j < keys.length; j++) {
      item[keys[j]] = values[j][i];
    }
    result.push(item);
  }
  console.log(keys, values);
  return result;
}

const result = convertToObject(obj);
console.log(result);
