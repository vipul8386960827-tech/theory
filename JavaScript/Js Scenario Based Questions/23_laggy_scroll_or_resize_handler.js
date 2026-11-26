/* 23_laggy_scroll_or_resize_handler.js

=====================================================
Scenario: Scroll / resize handler makes the page laggy
=====================================================

The Question (how the interviewer asks it):
- "We have a scroll listener that shows a 'back to top' button, updates a
  progress bar and loads more items near the bottom. Scrolling feels janky,
  especially on mobile. How would you fix it?"

What the interviewer is checking:
- Do I know scroll and resize fire many times per second.
- Can I implement throttle and explain throttle vs debounce.
- Do I know requestAnimationFrame and passive listeners.
- Do I know modern APIs like IntersectionObserver instead of manual math.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I profile with DevTools > Performance and look for long "scroll" tasks
   and "Forced reflow" warnings (reading layout after writing styles).
2. I reduce how often the work runs: throttle (run at most once every X ms)
   for scroll, debounce (run once after the user stops) for resize-end work
   or search input.
3. For visual updates (progress bar) I use requestAnimationFrame so the
   update happens once per frame, right before the browser paints.
4. I add { passive: true } to scroll/touch listeners, so the browser does
   not wait for my handler before scrolling (I promise not to preventDefault).
5. For "load more near bottom" and lazy images I replace scroll math with
   IntersectionObserver: the browser tells me when a sentinel element is
   visible, and there is no scroll handler at all.
6. I avoid layout thrashing: read values (getBoundingClientRect, scrollY)
   first, then write styles, and prefer transform over top/left.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: heavy work on every scroll event (can fire 100+ times per second)
window.addEventListener("scroll", () => {
  const rect = footer.getBoundingClientRect();      // forces layout
  if (rect.top < window.innerHeight) loadMore();    // called many times
  bar.style.width = (scrollY / document.body.scrollHeight) * 100 + "%";
});

// FIXED 1: simple throttle (leading call, then at most once per wait ms)
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) { last = now; fn.apply(this, args); }
  };
}

// FIXED 2: rAF for visual updates + passive listener
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${scrollY / max})`;
    ticking = false;
  });
}, { passive: true });

// FIXED 3: IntersectionObserver for infinite scroll (no scroll math)
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: "300px" });                       // start loading early
observer.observe(document.querySelector("#sentinel"));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Scroll and resize events fire very often, so heavy work inside them blocks
  the main thread. First I profile to find the expensive part. Then I
  throttle the handler, use requestAnimationFrame for visual updates, and
  mark the listener as passive. For infinite scroll and lazy loading I use
  IntersectionObserver so I do not need a scroll handler at all. Throttle
  runs regularly during the action; debounce runs once after it stops."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using debounce for a progress bar: it only updates after scrolling stops.
- Creating a new throttled function on every render (React), so throttling
  never works. Create it once (useMemo / useRef).
- Reading and writing layout in a loop (layout thrashing).
- Forgetting to disconnect the observer or remove the listener on unmount.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Throttle vs debounce, give one real example of each.
A1: Throttle: scroll position tracking, run every 100 ms while scrolling.
    Debounce: search box, call the API 300 ms after the user stops typing.

Q2: Why is requestAnimationFrame better than setTimeout(fn, 16)?
A2: rAF is synced with the screen refresh and runs right before paint, and it
    pauses in background tabs. setTimeout is not synced, so it can run twice
    in one frame or miss a frame.

Q3: What does a passive listener change?
A3: It tells the browser the handler will not call preventDefault(), so the
    browser can scroll immediately on another thread. Calling preventDefault
    in a passive listener is ignored with a console warning.
*/
