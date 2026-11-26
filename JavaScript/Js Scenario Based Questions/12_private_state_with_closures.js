/* 12_private_state_with_closures.js

=====================================================
Scenario: Build a wallet whose balance cannot be changed from outside
=====================================================

The Question (how the interviewer asks it):
- "Build a wallet (or counter) module. Other code can deposit, withdraw and read
   the balance, but nobody should be able to write wallet.balance = 1000000."

What the interviewer is checking:
- Do you understand closures and how they create private state?
- Do you know the module pattern / factory function?
- Do you know modern class #private fields as an alternative?
- Do you validate input inside the public methods?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the problem: a normal object property like wallet.balance is public,
   so any code can change it and skip all the rules.
2. I use a factory function. The balance is a local variable inside the function,
   not a property. Only the inner functions can see it, because of the closure.
3. I return an object with only the public methods: deposit, withdraw, getBalance.
4. Every method validates input (positive number, enough money) before changing
   the balance. This is the whole point of hiding the state.
5. I show the class version with #balance, which is real language-level privacy.
6. Optionally I call Object.freeze on the returned object, so nobody can replace
   the methods.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Buggy: balance is public
const badWallet = { balance: 0 };
badWallet.balance = 1_000_000; // anyone can do this

// Fix 1: closure / module pattern
function createWallet(initial = 0) {
  let balance = initial; // private, lives in the closure

  return Object.freeze({
    deposit(amount) {
      if (amount <= 0) throw new Error("Amount must be positive");
      balance += amount;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Not enough money");
      balance -= amount;
    },
    getBalance: () => balance,
  });
}

const w = createWallet(100);
w.deposit(50);
w.balance = 999;  // ignored (TypeError in strict mode): object is frozen
console.log(w.getBalance()); // 150

// Fix 2: class with #private field (ES2022)
class Wallet {
  #balance = 0;
  deposit(amount) { if (amount > 0) this.#balance += amount; }
  get balance() { return this.#balance; } // read-only getter
}
const w2 = new Wallet();
w2.deposit(20);
// w2.#balance = 5; // SyntaxError outside the class

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I keep the balance in a local variable inside a factory function and return
   only methods like deposit, withdraw and getBalance. Because of the closure,
   these methods can still read and change the balance, but outside code cannot
   reach it. Every change goes through validation. In modern code I can also use a
   class with a #balance private field, which the language enforces."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using an underscore like this._balance and calling it private. It is only a
  naming convention; anyone can still change it.
- Returning the balance object itself (for example an array or object) so outside
  code can mutate it by reference. Return a copy instead.
- Thinking closures create a copy of the variable. They keep a live reference.
- Forgetting validation, so the private state can still become invalid.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Closure pattern vs class #private: which one do you choose?
A1: Both give real privacy. Classes share methods on the prototype, so they use
    less memory with many instances, and they work with instanceof. The closure
    pattern is simple and has no "this" problems. For many objects I prefer a class.

Q2: Does each wallet from createWallet have its own balance?
A2: Yes. Each call to createWallet creates a new scope, so each wallet has its own
    balance variable and its own copies of the methods.

Q3: Can you check if an object has a private field?
A3: Yes, inside the class you can write #balance in obj. It returns true or false
    without throwing. This is called an ergonomic brand check (ES2022).
*/
