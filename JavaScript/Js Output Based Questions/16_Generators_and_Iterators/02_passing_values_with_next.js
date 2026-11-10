/*
==========================================================================================
QUESTION 2: Passing values into a generator with next(arg)
Topic: Generators and Iterators   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function* calc() {
  const x = yield 1;
  console.log('x =', x);
  const y = yield x * 2;
  console.log('y =', y);
  return x + y;
}

const it = calc();
console.log(it.next('ignored').value);
console.log(it.next(10).value);
console.log(it.next(5).value);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
x = 10
20
y = 5
15

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The value you pass to next(arg) becomes the RESULT of the yield expression where the
generator is currently paused.

1. it.next('ignored'): the generator starts and runs to `yield 1`. There is no paused
   yield yet to receive 'ignored', so the first argument is thrown away.
   Returns value 1.
2. it.next(10): resumes the paused `yield 1` - that expression evaluates to 10, so x = 10.
   Logs 'x = 10', then pauses at `yield x * 2` -> value 20.
3. it.next(5): the paused `yield 20` evaluates to 5, so y = 5. Logs 'y = 5', then
   `return x + y` -> value 15 (done: true).

KEY RULE: next(arg) resumes the generator and makes the CURRENT paused yield evaluate to
arg. The argument of the very first next() is always ignored.
COMMON MISTAKE: Thinking x = 'ignored' (or x = 1). The yielded value goes OUT; the next()
argument comes IN.
FOLLOW-UP: What if the second call is it.next() with no argument? -> x is undefined,
and x * 2 is NaN.
*/
