/*
==========================================================================================
QUESTION 4: event.target vs event.currentTarget (and after a timeout)
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <div id="card">
    <button id="save"><span id="icon">*</span> Save</button>
  </div>

Assume the user clicks directly on the <span id="icon"> inside the button.
What will be the output of the following code?
*/

const card = document.getElementById('card');

card.addEventListener('click', function (e) {
  console.log(e.target.id);
  console.log(e.currentTarget.id);
  console.log(this.id);

  setTimeout(() => {
    console.log(e.target.id);
    console.log(e.currentTarget);
  }, 0);
});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
icon
card
card
icon
null

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. e.target is the element where the event ORIGINATED - the deepest element the user
   actually clicked: the <span id="icon">.
2. e.currentTarget is the element whose listener is CURRENTLY running - the card div
   (the event bubbled up from the span through the button to the card).
3. In a regular (non-arrow) function listener, `this` === e.currentTarget -> 'card'.
4. Inside the setTimeout (which runs after dispatch is finished):
   - e.target still points to the span -> 'icon'.
   - e.currentTarget is reset to null once the event has finished dispatching, because
     the event is no longer "currently" at any element -> null.

KEY RULE: target = where it started (stays the same); currentTarget = where the listener
is attached (only valid during dispatch). this in a normal function = currentTarget.
COMMON MISTAKE: Answering 'save' or 'card' for e.target, or expecting currentTarget to
still be the card inside the timeout.
FOLLOW-UP: Need it later? Save it first: const el = e.currentTarget;
*/
