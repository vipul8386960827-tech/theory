/*
==========================================================================================
QUESTION 9: Symbol keys are hidden from Object.keys, for...in and JSON
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const id = Symbol('id');
const user = { name: 'Ann', [id]: 42 };

console.log(Object.keys(user).join(','));
console.log(JSON.stringify(user));

for (const k in user) {
  console.log('for...in:', k);
}

console.log(Object.getOwnPropertySymbols(user).length);
console.log(Reflect.ownKeys(user).length);
console.log(user[id]);

const spreadCopy = { ...user };
const assignCopy = Object.assign({}, user);
console.log(spreadCopy[id], assignCopy[id]);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
name
{"name":"Ann"}
for...in: name
1
2
42
42 42

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Object.keys returns only own enumerable STRING keys -> ['name'].
2. JSON.stringify skips symbol-keyed properties completely -> {"name":"Ann"}.
3. for...in also iterates only string keys -> just 'name'.
4. Object.getOwnPropertySymbols returns the symbol keys -> [Symbol(id)] -> length 1.
5. Reflect.ownKeys returns ALL own keys (strings + symbols) -> 2.
6. Direct access with the symbol still works -> 42.
7. The tricky part: object spread {...user} and Object.assign DO copy own enumerable
   symbol properties -> both copies have [id] = 42.

KEY RULE: Symbol keys are skipped by Object.keys / for...in / JSON.stringify, but they are
NOT private: spread, Object.assign, getOwnPropertySymbols and Reflect.ownKeys see them.
COMMON MISTAKE: Assuming the spread copy loses the symbol property (undefined undefined),
or that symbols give true privacy.
*/
