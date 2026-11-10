/*
==========================================================================================
QUESTION 8: Object.keys vs for...in with inherited properties
Topic: Object Property Tricks   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const parent = { inherited: "from parent" };
const child = Object.create(parent);
child.own = "mine";
Object.defineProperty(child, "hidden", { value: "secret", enumerable: false });

console.log(Object.keys(child).join(","));

const forInKeys = [];
for (const key in child) {
  forInKeys.push(key);
}
console.log(forInKeys.join(","));

console.log(child.hasOwnProperty("inherited"));
console.log("inherited" in child);
console.log("hidden" in child);
console.log(JSON.stringify(child));
console.log(Object.getOwnPropertyNames(child).join(","));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
own
own,inherited
false
true
true
{"own":"mine"}
own,hidden

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`child` has two OWN properties (own - enumerable, hidden - non-enumerable) and one
INHERITED property (inherited, on its prototype `parent`).

                                own enumerable   own non-enumerable   inherited enumerable
  Object.keys                        yes               no                    no
  for...in                           yes               no                    YES
  JSON.stringify                     yes               no                    no
  Object.getOwnPropertyNames         yes               YES                   no
  `in` operator                      yes               yes                   yes
  hasOwnProperty                     yes               yes                   no

So:
  Object.keys(child)              -> own
  for...in                        -> own, inherited  (walks up the prototype chain; own keys
                                                      are visited before inherited ones)
  hasOwnProperty("inherited")     -> false
  "inherited" in child            -> true  (`in` checks the whole chain)
  "hidden" in child               -> true  (`in` ignores enumerability)
  JSON.stringify(child)           -> {"own":"mine"}
  getOwnPropertyNames             -> own, hidden

KEY RULE: for...in includes inherited enumerable keys; Object.keys only own enumerable keys.
COMMON MISTAKE: Using for...in to copy/count an object's properties and getting the
          prototype's properties too. Guard with Object.hasOwn(obj, key) or use Object.keys.
*/
