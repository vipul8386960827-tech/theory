/* 12_testing_async_code.js

=====================================================
Testing Async Code
=====================================================

Definition (What I should say in the interview):
- "Most Node code is asynchronous, so the test runner has to know when the async work is
   finished, otherwise the test passes before the assertion even runs. In Jest I mark the
   test async and **await** the promise, or return the promise. For callbacks I use the
   **done** argument, and for errors I use **expect(...).rejects**. For timers I use Jest's
   **fake timers** so I don't actually wait in tests."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. async/await -> cleanest; test fails if the promise rejects unexpectedly.
2. Return a promise -> Jest waits for it.
3. Callback style -> test('...', (done) => { ...; done(); }); call done(err) on failure.
4. Errors -> await expect(fn()).rejects.toThrow('msg').
5. Timers -> jest.useFakeTimers() + jest.advanceTimersByTime(ms).
6. expect.assertions(n) -> guarantees n assertions actually ran.

-----------------------------------------------------
Example
-----------------------------------------------------
// async/await
test('fetches user', async () => {
  const user = await getUser(1);
  expect(user.name).toBe('John');
});

// rejected promise
test('throws for unknown id', async () => {
  await expect(getUser(999)).rejects.toThrow('Not found');
});

// callback style
test('reads file', (done) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    try {
      expect(err).toBeNull();
      expect(data).toContain('hello');
      done();
    } catch (e) { done(e); }
  });
});

// fake timers
test('retries after 5s', () => {
  jest.useFakeTimers();
  const retry = jest.fn();
  scheduleRetry(retry);                 // uses setTimeout(retry, 5000)
  jest.advanceTimersByTime(5000);
  expect(retry).toHaveBeenCalled();
  jest.useRealTimers();
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Forgetting await -> test passes "green" even though the assertion fails later.
- Using try/catch for expected errors without expect.assertions(1) -> passes if nothing throws.
- Mixing done with async function -> Jest throws an error; use one style.
- Real setTimeout waits in tests -> slow suites; use fake timers.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you test an EventEmitter?
A1: Wrap it in a promise: const [data] = await once(emitter, 'done') using events.once,
    then assert on data.

Q2: Default Jest timeout?
A2: 5 seconds per test; change with jest.setTimeout(ms) or a third argument to test().
*/
