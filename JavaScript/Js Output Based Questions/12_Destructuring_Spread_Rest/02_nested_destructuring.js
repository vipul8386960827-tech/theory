/*
==========================================================================================
QUESTION 2: Nested destructuring
Topic: Destructuring, Spread and Rest   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const user = {
  id: 1,
  info: {
    name: "Sam",
    address: { city: "Pune" },
  },
};

const {
  info: {
    name,
    address: { city },
  },
} = user;
console.log(name, city);

try {
  console.log(info);
} catch (e) {
  console.log(e.name + ": " + e.message);
}

const { profile: { age } = {} } = user;
console.log(age);

try {
  const { settings: { theme } } = user;
} catch (e) {
  console.log(e.name);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Sam Pune
ReferenceError: info is not defined
undefined
TypeError

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
In a nested pattern, "info: { ... }" means "go INTO user.info and destructure it".
The left-hand "info:" is only a PATH, it does not create a variable called info.

const { info: { name, address: { city } } } = user
  name -> user.info.name          = "Sam"
  city -> user.info.address.city  = "Pune"
  Variables created: name, city  (NOT info, NOT address)

console.log(info)
  info was never declared -> ReferenceError: info is not defined

const { profile: { age } = {} } = user
  user.profile is undefined, so the default {} is used, and then age is read from {}
  -> undefined (no error). This "= {}" trick is the standard way to make nested
  destructuring safe.

const { settings: { theme } } = user
  user.settings is undefined and there is no default -> the engine tries to destructure
  undefined -> TypeError (V8: "Cannot read properties of undefined (reading 'theme')").

KEY RULE: In { a: { b } }, only b becomes a variable; a is just the path. Destructuring undefined/null throws a TypeError, so give nested patterns a default "= {}".
COMMON MISTAKE: Expecting info (or address) to be available as variables too.
FOLLOW-UP: How do you get both info and name?  const { info, info: { name } } = user; -- the same property can be listed twice.
*/
