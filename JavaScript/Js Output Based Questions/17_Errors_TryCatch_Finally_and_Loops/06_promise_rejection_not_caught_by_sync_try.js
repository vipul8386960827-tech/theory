/*
==========================================================================================
QUESTION 6: Promise rejection vs synchronous try/catch
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

async function getData() {
  throw new Error('network');
}

try {
  const p = getData();
  console.log('try done');
  p.catch(e => console.log('.catch got:', e.message));
} catch (e) {
  console.log('sync catch:', e.message);
}

(async () => {
  try {
    await getData();
  } catch (e) {
    console.log('await catch:', e.message);
  }
})();

try {
  new Promise(() => {
    throw new Error('executor');
  }).catch(e => console.log('executor rejected:', e.message));
} catch (e) {
  console.log('sync catch 2:', e.message);
}

console.log('script end');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
try done
script end
.catch got: network
await catch: network
executor rejected: executor

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. getData() is an async function. A throw inside it does NOT throw to the caller - it
   makes the returned promise REJECTED. So the first try block sees no error:
   'try done' is logged, and 'sync catch' never runs.
2. p.catch(...) registers a handler. p is already rejected, so a microtask (job 1) is
   queued to run the handler.
3. The async IIFE calls getData() and `await`s it. await on a rejected promise queues
   the resumption as a microtask (job 2). Inside an async function, a rejected await
   THROWS at the await line, so the local try/catch CAN catch it.
4. A throw inside a Promise executor is caught by the Promise constructor and turns into
   a rejection -> .catch handler queued (job 3). 'sync catch 2' never runs.
5. 'script end' is logged. Then microtasks run in order: job 1, job 2, job 3.

KEY RULE: Promise rejections are delivered asynchronously. A plain try/catch around code
that returns a promise does not catch it - use .catch() or try/catch with await.
COMMON MISTAKE: Answering 'sync catch: network' or putting the .catch logs before
'script end'.
*/
