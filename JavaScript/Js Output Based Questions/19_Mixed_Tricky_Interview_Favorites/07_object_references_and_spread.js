/*
==========================================================================================
QUESTION 7: Object references, shallow spread and function arguments
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const user = { name: 'A', address: { city: 'X' }, tags: ['t1'] };

const copy = { ...user };
copy.name = 'B';
copy.address.city = 'Y';
copy.tags.push('t2');
console.log(user.name, user.address.city, user.tags.length);

const list = [user];
const listCopy = [...list];
listCopy[0].name = 'C';
console.log(user.name, list === listCopy);

let a = { v: 1 };
let b = a;
a = { v: 2 };
console.log(b.v);

function mutate(o) {
  o.v = 10;
  o = { v: 20 };
  o.v = 30;
}
mutate(b);
console.log(b.v);

const merged = { ...user, name: 'D', ...{ name: 'E' } };
console.log(merged.name, merged.address === user.address);

const deep = structuredClone(user);
deep.address.city = 'Z';
console.log(user.address.city);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A Y 2
C false
1
10
E true
Y

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. { ...user } is a SHALLOW copy: top-level properties are copied, but nested objects
   are copied by reference. copy.name is its own (user.name stays 'A'), but copy.address
   and copy.tags are the SAME objects as user's -> city 'Y', tags length 2.
2. [...list] makes a new array (list !== listCopy) but its element is the same user
   object -> renaming through listCopy[0] changes user.name to 'C'.
3. b = a copies the reference. Then `a = { v: 2 }` makes a point to a new object;
   b still points to the old one -> 1.
4. JavaScript passes object references BY VALUE. Inside mutate, o.v = 10 mutates the
   shared object (b.v becomes 10). Then `o = {...}` only rebinds the local parameter;
   b is unaffected -> 10.
5. In object spread/literals, later properties win: name 'A' -> 'D' -> 'E'. address is
   still the same reference -> true.
6. structuredClone makes a DEEP copy, so changing deep.address does not affect user
   (city is still 'Y' from step 1).

KEY RULE: Assignment and spread copy references for nested objects. Reassigning a
variable/parameter never affects other references; mutating the object does.
COMMON MISTAKE: Answering 'A X 1' (thinking spread is a deep copy) or 20/30 for b.v.
*/
