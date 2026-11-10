/*
==========================================================================================
QUESTION 4: Throwing into a generator with throw()
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function* gen() {
  try {
    yield 'a';
    yield 'b';
  } catch (e) {
    console.log('caught inside:', e);
    yield 'recovered';
  }
  yield 'end';
}

const it = gen();
console.log(it.next().value);
console.log(it.throw('boom').value);
console.log(it.next().value);
console.log(it.next().done);

const it2 = gen();
try {
  it2.throw('too early');
} catch (e) {
  console.log('caught outside:', e);
}
console.log(it2.next().done);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
a
caught inside: boom
recovered
end
true
caught outside: too early
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
it.throw(err) resumes the generator, but instead of giving the paused yield a value, it
makes that yield THROW err at that spot.

1. it.next() -> runs to `yield 'a'` (inside try) -> 'a'.
2. it.throw('boom') -> `yield 'a'` throws 'boom'. We are inside try, so the catch block
   handles it: logs 'caught inside: boom', then pauses at `yield 'recovered'`.
   throw() returns that yield result -> 'recovered'. ('b' is skipped!)
3. it.next() -> continues after the try/catch -> `yield 'end'` -> 'end'.
4. it.next() -> body ends -> done: true.
5. it2 was never started, so it is not inside the try. throw() on a fresh generator
   closes it and the error comes straight back out to the caller ->
   'caught outside: too early'. The generator is now finished -> next().done is true.

KEY RULE: throw(err) injects an exception at the paused yield. If the generator catches
it, throw() returns the next yielded value; if not, the error propagates to the caller
and the generator is closed.
COMMON MISTAKE: Expecting it.throw('boom').value to be 'b' or undefined, or thinking the
generator's catch can handle a throw() made before the first next().
*/
