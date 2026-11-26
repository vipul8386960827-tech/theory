/* 24_event_listeners_on_large_list.js

=====================================================
Scenario: 10,000 list items, each with its own click listener
=====================================================

The Question (how the interviewer asks it):
- "We render a list of 10,000 items and attach a click listener to each item.
  The page is slow to load, uses a lot of memory, and items added later
  (after 'Load more') do not respond to clicks. What is wrong and how do you
  fix it?"

What the interviewer is checking:
- Do I understand event bubbling and event delegation.
- Do I know event.target vs event.currentTarget and closest().
- Do I see that rendering 10,000 DOM nodes is also a problem (virtualization).

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the two problems: 10,000 listeners cost memory and setup time,
   and new items do not respond because listeners were attached only to the
   items that existed at that moment.
2. The fix is event delegation: attach ONE listener to the parent (the ul).
   Click events bubble up from the clicked element to its ancestors, so the
   parent receives every click, including clicks on future items.
3. Inside the handler I use event.target.closest("li[data-id]") to find the
   item, because the user may click a child element like a span or icon.
4. I check that the found item is inside my list (list.contains(item)) and
   read data from data-* attributes instead of closures per item.
5. I also fix rendering: 10,000 DOM nodes are slow by themselves. I use
   pagination, or virtualization (render only the visible ~30 rows), for
   example with react-window or TanStack Virtual.
6. When I add items, I build them with a DocumentFragment or one innerHTML
   update (with escaped data) to avoid many reflows.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: one listener per item, and new items get no listener
document.querySelectorAll("#list li").forEach((li) => {
  li.addEventListener("click", () => openItem(li.dataset.id));
});

// FIXED: one delegated listener on the parent
const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
  const item = event.target.closest("li[data-id]");
  if (!item || !list.contains(item)) return;      // click was not on an item

  if (event.target.closest(".delete-btn")) {
    deleteItem(item.dataset.id);
  } else {
    openItem(item.dataset.id);
  }
});

// Adding new items: they work automatically, no new listeners needed
function appendItems(items) {
  const frag = document.createDocumentFragment();
  for (const it of items) {
    const li = document.createElement("li");
    li.dataset.id = it.id;
    li.textContent = it.name;                     // safe, no XSS
    frag.append(li);
  }
  list.append(frag);                              // one DOM update
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Attaching 10,000 listeners is slow and wastes memory, and items added
  later have no listener. I use event delegation: one click listener on the
  parent, because events bubble up. In the handler I use
  event.target.closest to find the clicked item and read its id from a data
  attribute. I also reduce the DOM itself with pagination or virtualization,
  because rendering 10,000 nodes is slow even without listeners."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using event.target directly: if the user clicks an icon inside the li,
  target is the icon, not the li. Use closest().
- Confusing target (where the click happened) with currentTarget (the element
  the listener is on, here the ul).
- Calling stopPropagation in child handlers, which breaks delegation.
- Thinking delegation fixes slow rendering; it fixes listeners, not DOM size.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which events do not bubble, and how do you delegate them?
A1: focus, blur, mouseenter, mouseleave do not bubble. Use the bubbling
    versions focusin / focusout / mouseover / mouseout, or listen in the
    capture phase with { capture: true }.

Q2: How does React handle this?
A2: React already uses delegation: it attaches listeners at the root
    container (since React 17) and dispatches synthetic events, so onClick on
    each row is fine. The real React problem is rendering too many rows.

Q3: How does virtualization work?
A3: It renders only the rows visible in the viewport plus a small buffer,
    and uses a tall spacer so the scrollbar looks correct. On scroll it
    reuses or replaces rows, so the DOM stays around 30-50 nodes.
*/
