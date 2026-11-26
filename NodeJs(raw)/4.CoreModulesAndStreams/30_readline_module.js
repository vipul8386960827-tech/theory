/* 30_readline_module.js

=====================================================
readline Module
=====================================================

Definition (What I should say in the interview):
- "The readline module reads data from a Readable stream **one line at a time**. I use it in two
   situations: building interactive **CLI prompts** on top of process.stdin and process.stdout,
   and **processing large text files line by line** - for example parsing a multi-GB log file -
   without loading it into memory. The readline interface is async iterable, so for await...of
   over it is the cleanest way to read lines."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. readline.createInterface({ input, output, crlfDelay: Infinity }).
2. 'line' event per line; 'close' when input ends.
3. rl.question(query, cb), or readline/promises (Node 17+) -> await rl.question().
4. crlfDelay: Infinity -> treat \r\n as a single line break (Windows files).
5. Always rl.close() when done, or the process stays alive waiting for stdin.

-----------------------------------------------------
Example 1 - interactive CLI
-----------------------------------------------------
const readline = require('readline/promises');

async function ask() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const name = await rl.question('Your name? ');
  const age = Number(await rl.question('Your age? '));
  console.log(`Hello ${name}, next year you will be ${age + 1}`);
  rl.close();
}

-----------------------------------------------------
Example 2 - big log file line by line
-----------------------------------------------------
const fs = require('fs');
const { createInterface } = require('readline');

async function countErrors(file) {
  const rl = createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  let errors = 0;
  for await (const line of rl) {
    if (line.includes('ERROR')) errors++;
  }
  return errors;
}

countErrors('app.log').then((n) => console.log('errors:', n)).catch(console.error);
// ask();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- readline handles chunks that end in the middle of a line - it buffers the partial line until
  the next chunk, which is why it is better than chunk.split('\n').
- Doing slow async work per line inside a 'line' handler does not pause input; for await...of
  handles flow better.
- Errors from the input file stream (ENOENT) must be handled on that stream or via try/catch.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you read a 10 GB CSV line by line?
A1: fs.createReadStream + readline.createInterface + for await...of; memory stays small.

Q2: Why does my CLI script not exit?
A2: The readline interface still holds stdin open - call rl.close().
*/
