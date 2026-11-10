/*
==========================================================================================
QUESTION 1: Prototype chain lookup and property shadowing
Topic: Prototypes and Classes   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function Animal() {}
Animal.prototype.sound = "generic";

const dog = new Animal();
console.log(dog.sound);

dog.sound = "woof";
console.log(dog.sound);
console.log(Animal.prototype.sound);

delete dog.sound;
console.log(dog.sound);

console.log(dog.hasOwnProperty("sound"));
console.log("sound" in dog);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
generic
woof
generic
generic
false
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. dog has no own `sound`. Reading a property walks the prototype chain:
   dog -> Animal.prototype (found "generic").
2. `dog.sound = "woof"` WRITES an OWN property on dog. It does not modify the
   prototype; the own property now SHADOWS the inherited one -> "woof".
3. Animal.prototype.sound is unchanged -> "generic".
4. `delete dog.sound` removes only the own property; the prototype's value becomes
   visible again -> "generic".
5. hasOwnProperty checks only the object itself -> false.
6. The `in` operator checks the whole prototype chain -> true.

KEY RULE: Reads go up the prototype chain; writes (assignments) create/update own properties on the object itself.
COMMON MISTAKE: Thinking `dog.sound = "woof"` changes the prototype for all instances, or that delete removes the inherited value.
*/
