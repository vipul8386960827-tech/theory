/*
==========================================================================================
QUESTION 11: Method chaining with return this
Topic: this Keyword   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const calc = {
  total: 0,
  add(n) {
    this.total += n;
    return this;
  },
  multiply(n) {
    this.total *= n;
    return this;
  },
  print() {
    console.log("total:", this.total);
  },
};

calc.add(2).multiply(5).add(1).print();
console.log(calc.add(4).total);

const result = calc.print();
console.log(result);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
total: 11
15
total: 15
undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. calc.add(2): this = calc, total = 2, returns calc.
   .multiply(5): called on the returned calc -> total = 10, returns calc.
   .add(1): total = 11, returns calc.
   .print(): prints "total: 11".
2. calc.add(4) -> total = 15, returns calc -> .total -> 15.
3. calc.print() prints "total: 15" and returns nothing -> result is undefined.

Each call in a chain is a method call on whatever the previous call returned, so
returning `this` keeps the same object as the receiver.

KEY RULE: Chaining works because each method returns `this`; a method without return yields undefined and breaks the chain.
COMMON MISTAKE: Calculating 2 * 5 + 1 separately from the state (forgetting the total is shared state that persists between lines), e.g. answering 4 instead of 15.
*/
