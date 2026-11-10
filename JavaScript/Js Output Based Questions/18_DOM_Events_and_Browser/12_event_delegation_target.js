/*
==========================================================================================
QUESTION 12: Event delegation - e.target and dynamically added items
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <ul id="list">
    <li data-id="1">One</li>
    <li data-id="2"><b>Two</b></li>
  </ul>

Assume the user first clicks the bold text "Two", then clicks the newly added "Three".
What will be the output of the following code?
*/

const list = document.getElementById('list');

list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  console.log(e.target.tagName, li.dataset.id, e.currentTarget.id);
});

document.querySelectorAll('#list li').forEach((li) => {
  li.addEventListener('click', () => console.log('direct', li.dataset.id));
});

const three = document.createElement('li');
three.dataset.id = '3';
three.textContent = 'Three';
list.appendChild(three);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
direct 2
B 2 list
LI 3 list

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Click on "Two":
1. The deepest clicked element is <b>, so e.target is the B element.
2. The event bubbles: b -> li(2) -> ul. The direct listener on li(2) runs first
   -> 'direct 2'.
3. Then the delegated listener on the ul runs: e.target.tagName is 'B' (tagName is
   upper-case for HTML elements). closest('li') walks up from <b> to the li with
   data-id 2. currentTarget is the ul -> 'B 2 list'.

Click on "Three":
4. The direct listeners were attached with querySelectorAll BEFORE "Three" existed, so
   the new li has no direct listener.
5. The ul's delegated listener still catches the bubbled click: e.target is the new LI
   itself -> 'LI 3 list'.

KEY RULE: Delegation = one listener on a parent + e.target (with closest()) to find the
real item. It works for elements added later; direct listeners don't.
COMMON MISTAKE: Expecting e.target to be the LI when the click is on a child (<b>), or
expecting 'direct 3' for the dynamically added item.
*/
