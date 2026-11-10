/*
==========================================================================================
QUESTION 7: Static properties and methods
Topic: Prototypes and Classes   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

class Counter {
  static count = 0;

  static increment() {
    return ++this.count;
  }

  constructor() {
    Counter.increment();
  }
}

new Counter();
new Counter();
const c = new Counter();

console.log(Counter.count);
console.log(c.count);
console.log(typeof c.increment);
console.log(c.constructor.count);

class SubCounter extends Counter {}
console.log(SubCounter.count);
SubCounter.increment();
console.log(SubCounter.count, Counter.count);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
undefined
undefined
3
3
4 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`static` members live on the class (constructor function) itself, not on instances or
on Counter.prototype.

1. Each `new Counter()` calls Counter.increment(); inside a static method called as
   Counter.increment(), this = Counter -> Counter.count becomes 1, 2, 3 -> 3.
2. c.count -> instances do not see static properties -> undefined.
3. c.increment -> not on the instance or its prototype -> "undefined".
4. c.constructor is Counter -> Counter.count -> 3.
5. `extends` also links the constructors: Object.getPrototypeOf(SubCounter) === Counter,
   so SubCounter.count is INHERITED -> 3.
6. SubCounter.increment(): this = SubCounter. `++this.count` reads 3 (inherited) and
   WRITES 4 as an OWN static property on SubCounter. Counter.count stays 3 -> "4 3".

KEY RULE: Static members belong to the class, are not accessible from instances, and are inherited by subclasses through the constructor's prototype chain.
COMMON MISTAKE: Expecting c.count to be 3, or expecting SubCounter.increment() to change Counter.count to 4.
*/
