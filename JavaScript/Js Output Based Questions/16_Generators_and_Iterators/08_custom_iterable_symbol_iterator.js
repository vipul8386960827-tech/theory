/*
==========================================================================================
QUESTION 8: Custom iterable with Symbol.iterator
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const range = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next: () =>
        current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true },
    };
  },
};

console.log([...range].join(','));
console.log(Array.from(range, x => x * 10).join(','));
console.log(Math.max(...range));

const plain = { a: 1, b: 2 };
try {
  for (const v of plain) console.log(v);
} catch (e) {
  console.log(e.name + ': ' + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1,2,3,4
10,20,30,40
4
TypeError: plain is not iterable

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. An object is "iterable" if it has a [Symbol.iterator]() method that returns an
   iterator - an object with next() returning { value, done }.
2. Every spread / Array.from / for...of calls range[Symbol.iterator]() AGAIN, getting a
   fresh iterator with its own `current`. That is why range can be iterated many times.
3. [...range] -> 1,2,3,4.
4. Array.from(range, mapFn) -> maps each value -> 10,20,30,40.
5. Math.max(...range) -> Math.max(1,2,3,4) -> 4.
6. A plain object has no Symbol.iterator, so for...of throws TypeError
   ("plain is not iterable" in V8; wording differs per engine).

KEY RULE: for...of / spread / destructuring require Symbol.iterator. Plain objects are
NOT iterable (use Object.keys/values/entries).
COMMON MISTAKE: Expecting for...of over a plain object to loop its values or keys.
FOLLOW-UP: Write the same iterable with a generator:
[Symbol.iterator]: function* () { for (let i = this.from; i <= this.to; i++) yield i; }
*/
