/*
1_object_vs_map.js — Interview-Ready Answer

"In JavaScript, both Objects and Maps store key-value pairs,
but they differ in their key types, APIs, and use cases."

1. Object vs Map — Comparison Table

| Feature             | Object {}                         | Map                         |
|---------------------|-----------------------------------|-----------------------------|
| Key types           | Strings and Symbols               | Any type                    |
| Add / update        | obj[key] = value                  | map.set(key, value)         |
| Retrieve            | obj[key]                           | map.get(key)                |
| Check key           | Object.hasOwn(obj, key)           | map.has(key)                |
| Delete key          | delete obj[key]                   | map.delete(key)             |
| Get size            | Object.keys(obj).length           | map.size                    |
| Iteration           | Object.keys/values/entries        | for...of, map.forEach       |
| Insertion order     | Defined property-ordering rules   | Insertion order             |
| Inherited properties| Usually inherits Object.prototype | No inherited user entries   |
| Best use case       | Structured data and JSON          | Dynamic key-value storage   |
| Performance         | Depends on workload and engine    | Depends on workload/engine  |

Note:
- Object.keys(obj).length counts only own, enumerable string keys.
  It excludes Symbol keys.
- Map preserves insertion order when iterating.
- Objects have defined property-ordering rules; they are not simply
  unordered.
- Neither Object nor Map is universally faster. Performance depends
  on the workload and JavaScript engine.

2. Definition

Object:
- A collection of properties whose keys are strings or Symbols.
- Commonly used for structured data, entities, and configuration.
- Ordinary objects inherit from Object.prototype by default.

Map:
- A built-in key-value collection that accepts keys of any type,
  including objects, functions, and primitive values.
- Provides built-in methods such as set(), get(), has(), and delete().
- Provides a size property and preserves insertion order.

3. Examples

// Using Object
const obj = {
  name: "Alice",
  age: 25
};

console.log(obj.name); // Alice

// Using Map
const map = new Map();

map.set("name", "Alice");
map.set("age", 25);
map.set(true, "boolean key");

console.log(map.get("name")); // Alice
console.log(map.get(true));   // boolean key
console.log(map.size);        // 3

4. When to Use Which?

- Object:
  Use for structured data, configuration, and JSON-compatible data.

- Map:
  Use for dynamic key-value collections, non-string keys,
  convenient iteration, and frequent additions or deletions.

5. Important Interview Questions

Q1. Why use Map instead of Object?

A. Map supports keys of any type and provides convenient methods
   for adding, retrieving, checking, and deleting entries.
   It also exposes the number of entries through size.

Q2. Can an Object have an object as a key?

A. Not as an ordinary property key. Object property keys are
   strings or Symbols. Map can use an object itself as a key.

Q3. How do you convert an Object to a Map?

A. const map = new Map(Object.entries(obj));

Note: Object.entries() includes only own, enumerable string-keyed
properties, excluding Symbol keys.

Q4. How do you convert a Map to an Object?

A. const obj = Object.fromEntries(map);

Note: Map keys are converted to property keys when creating an
Object, so non-string keys may be converted to strings.

Q5. Which is faster, Object or Map?

A. It depends on the workload and JavaScript engine.
   Choose based on the use case and benchmark if performance matters.

6. Interview Conclusion

"Objects are best suited for structured records, whereas Maps are
useful for dynamic key-value collections, especially when keys can
be of any type. I choose the data structure based on the requirements
rather than assuming one is always faster."
*/