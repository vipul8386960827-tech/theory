/**
HOVER EXPAND ARCHITECTURE (NETFLIX STYLE CARD PREVIEW)
How I would design the expanding hover card interaction.
*/

/**
1. PORTAL BASED RENDERING
Problem:
Cards sit inside horizontally scrollable rows which usually use
'overflow-x: scroll' or 'overflow: hidden'. If we simply scale the
card inside that container, the expanded content would get clipped.

Solution:
Instead of expanding the card inside the row, we render an expanded
version of the card into a global React Portal (attached to document.body).

Implementation Idea:
When hover intent is confirmed (after a small debounce),
we render a duplicate "preview card" in the portal layer.

UX Stability:
The original card remains in the grid but is hidden using
'visibility: hidden' so the row layout does not shift.
*/

/**
2. COORDINATE ANCHORING
Problem:
Since the portal exists outside the row layout,
it doesn't know where the original card is positioned.

Solution:
We capture the exact position of the card using
getBoundingClientRect().

Data Captured:
- X position
- Y position
- Width
- Height

Execution:
The portal card is initially rendered at the same position
and size as the original card.

Animation:
We then animate the card using GPU accelerated transforms
(e.g. scale transform) to create the expansion effect.
*/

/**
3. EDGE-AWARE EXPANSION
Problem:
If the card expands symmetrically, cards near the viewport edges
can overflow outside the screen.

Solution:
We make the expansion viewport-aware.

Logic:
Before animating, we check whether the card is close to the
left or right side of the viewport.

Adjustment:
If it is near the right edge, we shift the transform-origin
so the expansion grows inward instead of outward.

Result:
The expanded preview always stays fully visible.
*/

/**
4. POSTER TO VIDEO TRANSITION
Problem:
If we immediately show the video player, users may see
a black frame or loading spinner.

Solution:
We first render the static poster image inside the portal.

Execution:
The video player initializes behind the image.
Once the video fires the 'canplay' event,
we fade the poster out.

Visual Flow:
Static Poster → Expanding Poster → Seamless Video Playback
*/
