/*
==========================================================================================
QUESTION 7: Binding an already bound function
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function show() {
  return this.v;
}

const a = show.bind({ v: 1 });
const b = a.bind({ v: 2 });

console.log(a());
console.log(b());
console.log(b.call({ v: 3 }));

const obj = { v: 4, show: a };
console.log(obj.show());

const arrow = () => this;
const boundArrow = arrow.bind({ v: 5 });
console.log(boundArrow() === arrow());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
1
1
1
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. a = show.bind({v:1}) creates a "bound function" whose this is fixed to {v:1}
   forever. a() -> 1.
2. b = a.bind({v:2}): b wraps a. When b runs, it calls a with this = {v:2}, but a
   ignores the this it receives and always calls show with {v:1}. -> 1.
3. b.call({v:3}) - call cannot override a bound function's this either -> 1.
4. obj.show() - implicit binding (method call) also loses to bind -> 1.
5. Arrow functions ignore bind/call/apply for `this` completely; boundArrow() returns
   the same lexical `this` as arrow() -> true.

Precedence (strongest first): new > bind (hard binding) > call/apply > implicit (obj.fn()) > default.
Only `new` can override bind's this (see the next question).

KEY RULE: The first bind wins; re-binding, call, apply and method calls cannot change the this of a bound function.
COMMON MISTAKE: Answering 2 for b() and 3 for b.call(...), thinking the latest bind/call takes effect.
*/
