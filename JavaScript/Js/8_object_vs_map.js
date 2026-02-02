/* 
8_object_vs_map.js – Interview-Ready Answer:

"In JavaScript, both Objects and Maps are used to store key–value pairs, 
but they differ in terms of functionality, performance, and use cases."

1️⃣ Definition:
- Object → A collection of key–value pairs where keys are usually strings or symbols.
- Map → A built-in object specifically designed for key–value storage, 
        allowing any type of key (object, function, primitive).

2️⃣ Key Points to Highlight:
- Key Types → Object keys are limited to strings & symbols, Map keys can be of any type.
- Order → Object properties are not strictly ordered, Maps maintain insertion order.
- Size → Objects need manual counting of keys, Maps have `.size` property.
- Performance → Maps are optimized for frequent additions/removals, Objects are slower.
- Iteration → Easier with Maps (`map.forEach`, `for..of`), Objects require `Object.keys/values/entries`.
- Default Keys → Objects inherit from `Object.prototype`, may cause key collisions, Maps do not.

3️⃣ Examples:

// Using Object
let obj = {};
obj["name"] = "Alice";
obj["age"] = 25;
console.log(obj);              // { name: "Alice", age: 25 }

// Using Map
let map = new Map();
map.set("name", "Alice");
map.set("age", 25);
map.set(true, "booleanKey");   // Allowed in Map
console.log(map);              // Map(3) { "name" => "Alice", "age" => 25, true => "booleanKey" }

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - Object = dictionary where all words (keys) must be text.
  - Map = dictionary where words can be text, numbers, or even images.
- India-specific Analogy: 
  - Object = government form where only text entries are allowed in fields.
  - Map = modern app form where you can upload text, images, and even audio.
- Web Analogy: 
  - Object = old HTML table where all keys are strings.
  - Map = JSON-like structure where keys can be of any type.

5️⃣ Code Explanation:
- Object: Good for structured data, JSON, fixed schema.
- Map: Better for dynamic data storage, frequent updates, and when non-string keys are needed.

6️⃣ Example / Usage:

// Iterating over Object
for (let key in obj) {
  console.log(key, obj[key]);
}
// Output: name Alice, age 25

// Iterating over Map
for (let [key, value] of map) {
  console.log(key, value);
}
// Output: name Alice, age 25, true booleanKey

console.log(map.size);   // 3 (easy to get size)
console.log(Object.keys(obj).length); // 2 (manual count for objects)

7️⃣ Follow-Up Interview Questions:

Q1: Which one should you use for JSON data representation?  
A1: Object, since JSON is based on objects.

Q2: Why are Maps generally faster than Objects for large key-value storage?  
A2: Maps are internally optimized for insertions/deletions and maintain order.

Q3: How do you convert an Object to a Map?  
A3: `new Map(Object.entries(obj))`.

Q4: How do you convert a Map to an Object?  
A4: `Object.fromEntries(map)`.

Q5: Can an Object have a key of type object?  
A5: No, non-string keys get converted to strings. For that use Map.
*/
