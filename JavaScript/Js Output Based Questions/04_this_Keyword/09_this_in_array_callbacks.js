/*
==========================================================================================
QUESTION 9: this inside forEach callbacks
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

const group = {
  title: "Team",
  members: ["Ann", "Bob"],

  showRegular() {
    this.members.forEach(function (m) {
      console.log(this.title + ": " + m);
    });
  },

  showArrow() {
    this.members.forEach((m) => {
      console.log(this.title + ": " + m);
    });
  },

  showThisArg() {
    this.members.forEach(function (m) {
      console.log(this.title + ": " + m);
    }, this);
  },
};

group.showRegular();
group.showArrow();
group.showThisArg();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined: Ann
undefined: Bob
Team: Ann
Team: Bob
Team: Ann
Team: Bob

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. showRegular: `this.members` is fine (this = group inside the method). But the
   callback is a regular function that forEach invokes as a plain call, so its this is
   the global object (non-strict). globalThis.title is undefined, and
   undefined + ": Ann" -> "undefined: Ann".
2. showArrow: the arrow callback takes `this` from showArrow -> group -> "Team: ...".
3. showThisArg: forEach (like map, filter, some, every, find) accepts an optional
   second argument `thisArg`, used as this for the callback -> "Team: ...".

KEY RULE: Callbacks are called by someone else, so a regular callback's this is not your object. Use arrow functions or the thisArg parameter.
COMMON MISTAKE: Answering "Team" for all six lines.
*/
