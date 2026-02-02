const obj = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: 12345,
  },
  contact: {
    email: "alice@example.com",
    zip: 12345,
  },
  hobbies: ["gaming", "gaming"],
};

function swapUniqueKeyValues(obj, parentkey = "") {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    let fullKey = parentkey ? `${parentkey}.${key}` : key;
    if (typeof value !== "object") {
      result[value] = fullKey;
    } else {
      const nested = swapUniqueKeyValues(value, fullKey);
      for (let i in nested) {
        result[i] = nested[i];
      }
    }
  });
  return result;
}

const result = swapUniqueKeyValues(obj);
console.log(result);


/* if needed to preserve duplicate keys 


const obj = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: 12345,
  },
  contact: {
    email: "alice@example.com",
    zip: 12345,
  },
  hobbies: ["swimming", "swimming"],
}

function dotNotation(obj, parentKey = "", result = {}) {
  Object.entries(obj).forEach(([key, value]) => {
    let fullKey = parentKey ? `${parentKey}.${key}` : key
    if (typeof value !== "object" || value === null) {
      result[fullKey] = value
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${fullKey}.${index}`
        result[arrayKey] = item
      })
    } else {
      dotNotation(value, fullKey, result)
    }
  })
  return reverseObj(result)
}

function reverseObj(obj) {
  let result = {}
  Object.entries(obj).forEach(([key, value]) => {
    if(result.hasOwnProperty(value)) result[value].push(key)
    else result[value] = [key]
  })
  return result
}

const result = dotNotation(obj)
console.log(result)




*/
