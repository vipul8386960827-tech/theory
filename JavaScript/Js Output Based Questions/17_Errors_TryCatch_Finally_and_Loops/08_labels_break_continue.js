/*
==========================================================================================
QUESTION 8: Labeled break and continue
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    if (i === 2) break outer;
    console.log(i, j);
  }
}
console.log('loops done');

block: {
  console.log('a');
  break block;
  console.log('b');
}
console.log('c');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
0 0
1 0
loops done
a
c

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`continue outer` skips the rest of BOTH loops' current work and jumps to the next
iteration of the loop labeled `outer`. `break outer` exits the outer loop entirely.

i = 0: j = 0 -> neither condition -> logs "0 0".
       j = 1 -> continue outer -> inner loop abandoned, i becomes 1.
i = 1: j = 0 -> logs "1 0". j = 1 -> continue outer -> i becomes 2.
i = 2: j = 0 -> j === 1? no. i === 2? yes -> break outer -> both loops end.
Then 'loops done'.

Labels also work on plain blocks: `break block` jumps to the end of the labeled block,
so 'b' is skipped -> a, c.

KEY RULE: A plain break/continue affects only the innermost loop; a labeled one targets
the loop (or block, for break) with that label.
COMMON MISTAKE: Treating `continue outer` like a plain `continue` (which would continue
the inner loop and also print "0 2", "1 2").
*/
