/*
==========================================================================================
QUESTION 3: Replacing vs modifying the prototype after creating instances
Topic: Prototypes and Classes   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function Person() {}
Person.prototype.greet = function () {
  return "hello";
};

const p1 = new Person();

Person.prototype.wave = function () {
  return "wave";
};

Person.prototype = {
  greet: function () {
    return "hi";
  },
};

const p2 = new Person();

console.log(p1.greet());
console.log(p1.wave());
console.log(p2.greet());
console.log(typeof p2.wave);
console.log(p1 instanceof Person);
console.log(p2 instanceof Person);
console.log(p2.constructor === Person);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
hello
wave
hi
undefined
false
true
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. p1 is created -> p1.[[Prototype]] = the ORIGINAL Person.prototype object (call it P_old).
2. Adding `wave` to Person.prototype MUTATES P_old - p1 sees it, because the link is
   live (lookup happens at access time).
3. `Person.prototype = {...}` does not change P_old; it points the constructor's
   prototype property at a brand-new object P_new. p1 still links to P_old.
4. p2 is created after the swap -> p2.[[Prototype]] = P_new.

Results:
  p1.greet()       -> P_old.greet -> "hello"
  p1.wave()        -> P_old.wave  -> "wave"
  p2.greet()       -> P_new.greet -> "hi"
  typeof p2.wave   -> P_new has no wave -> "undefined"
  p1 instanceof Person -> instanceof checks whether Person.prototype (now P_new) is in
                          p1's chain. It is not -> false
  p2 instanceof Person -> true
  p2.constructor   -> P_new is a plain object literal with no own `constructor`, so the
                      lookup reaches Object.prototype.constructor = Object -> false

KEY RULE: Instances keep a link to the prototype object that existed when they were created; mutating that object affects them, reassigning Constructor.prototype does not.
COMMON MISTAKE: Answering "hi" for p1.greet() or true for p1 instanceof Person; forgetting that replacing prototype loses the constructor property.
*/
