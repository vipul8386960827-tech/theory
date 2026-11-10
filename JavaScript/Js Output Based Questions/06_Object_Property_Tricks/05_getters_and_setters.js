/*
==========================================================================================
QUESTION 5: Getters and setters
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const account = {
  _balance: 100,
  get balance() {
    console.log("getter called");
    return this._balance;
  },
  set balance(value) {
    console.log("setter called with", value);
    if (value < 0) return;
    this._balance = value;
  },
};

account.balance = -50;
console.log(account.balance);
account.balance += 20;
console.log(account._balance);

const temperature = {
  get celsius() {
    return 25;
  },
};
temperature.celsius = 100;
console.log(temperature.celsius);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
setter called with -50
getter called
100
getter called
setter called with 120
120
25

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. account.balance = -50
     Assignment to an accessor property calls the SETTER -> logs "setter called with -50".
     The value is negative, so the setter returns early; _balance stays 100.
2. console.log(account.balance)
     Reading calls the GETTER -> logs "getter called", returns 100 -> logs 100.
3. account.balance += 20
     This is `account.balance = account.balance + 20`, so it calls BOTH:
       getter first (logs "getter called", returns 100) then
       setter with 120 (logs "setter called with 120") -> _balance = 120.
4. account._balance is a normal data property -> 120 (no getter involved).
5. temperature has a getter but NO setter. Assigning to a getter-only property is silently
   ignored in non-strict mode (in strict mode it throws a TypeError), so it is still 25.

KEY RULE: `obj.prop += x` on an accessor calls the getter AND the setter. A getter without a
          setter makes the property effectively read-only.
COMMON MISTAKE: Forgetting the "getter called" log inside `+=`, or expecting
          temperature.celsius to become 100.
*/
