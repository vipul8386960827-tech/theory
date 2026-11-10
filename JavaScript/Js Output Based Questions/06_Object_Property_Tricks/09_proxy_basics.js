/*
==========================================================================================
QUESTION 9: Proxy get / set / has traps
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const target = { name: "Alice", _secret: 42 };

const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : `missing:${prop}`;
  },
  set(obj, prop, value) {
    console.log(`setting ${prop}`);
    obj[prop] = typeof value === "number" ? value * 2 : value;
    return true;
  },
  has(obj, prop) {
    return prop.startsWith("_") ? false : prop in obj;
  },
};

const proxy = new Proxy(target, handler);

console.log(proxy.name);
console.log(proxy.age);
proxy.age = 10;
console.log(proxy.age);
console.log(target.age);
console.log("_secret" in proxy);
console.log(proxy._secret);
target.score = 5;
console.log(proxy.score);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Alice
missing:age
setting age
20
20
false
42
5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A Proxy wraps a target object. Operations done ON THE PROXY go through the handler's traps;
operations done directly on the TARGET bypass the proxy completely. Both share the same
underlying data (the proxy does not copy the target).

  proxy.name          -> get trap, "name" exists -> "Alice"
  proxy.age           -> get trap, "age" missing -> "missing:age"
  proxy.age = 10      -> set trap logs "setting age", stores 10 * 2 = 20 ON THE TARGET
  proxy.age           -> get trap -> 20
  target.age          -> 20 (the set trap wrote to the real target)
  "_secret" in proxy  -> has trap hides keys starting with "_" -> false
  proxy._secret       -> the has trap only affects the `in` operator; `get` is a different
                         trap and it returns the real value -> 42
  target.score = 5    -> direct write on target, NO trap runs (nothing is logged)
  proxy.score         -> get trap sees the new property -> 5

KEY RULE: Each trap intercepts one specific operation (get, set, has, deleteProperty, ...).
          Hiding a key in `has` does not hide it from `get`.
COMMON MISTAKE: Expecting proxy._secret to be hidden, or expecting "setting score" to be
          logged when the target is modified directly.
FOLLOW-UP: If the set trap returned false, a non-strict assignment would silently fail, and in
          strict mode it would throw a TypeError.
*/
