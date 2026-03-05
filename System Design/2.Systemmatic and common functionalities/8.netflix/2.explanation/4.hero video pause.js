/**
 HERO VIDEO CLEANUP – FRONTEND ARCHITECTURE EXPLANATION
 (How I would explain this in an interview)
 */

/**
 1. STATE MACHINE APPROACH
 Instead of treating the hero video as simply "visible" or "hidden",
 I model it as a small lifecycle state machine driven by scroll position.

 - Active State:
   The hero video is visible in the viewport, so the player is mounted,
   buffering segments, and playing muted.

 - Transition State:
   As the user scrolls, an IntersectionObserver monitors the
   intersectionRatio of the hero container.

 - Cleanup State:
   Once the hero video is mostly out of view, we transition into
   a cleanup phase where the video player instance is destroyed.
 */

/**
 2. WHY WE UNMOUNT INSTEAD OF JUST HIDING
 A senior frontend system should actively manage browser resources.

 We are optimizing for three critical resources:

 - Memory (RAM):
   A 4K trailer buffer can easily consume 50–100MB of memory.
   When the component is unmounted, the browser's garbage collector
   can reclaim that memory.

 - CPU / GPU Hardware Decoder:
   Even paused videos may keep the hardware video decoder locked.
   Devices have a limited number of these decoder slots.
   Unmounting frees that slot for other videos like hover previews.

 - Network Bandwidth:
   Video players continuously prefetch HLS/DASH segments.
   When we unmount the player, the manifest polling stops,
   preventing unnecessary segment downloads.
 */

/**
 3. STATIC POSTER SWAP (UX STABILITY)
 When the player is destroyed, we avoid a visual flicker.

 Before unmounting the video element, we swap it with
 a high-quality static poster image in the exact same layout slot.

 This ensures:
 - no layout shift
 - no black frame
 - a seamless visual transition

 From the user's perspective, the hero video simply becomes
 a still image of the same content.
 */

/**
 4. HANDLING FAST SCROLLING (DEBOUNCE / STABILITY)
 Users often scroll quickly through the page.

 If we immediately mounted the video player whenever the
 hero section becomes visible, we would create unnecessary
 player initialization and cancelled network requests.

 Instead, we introduce a small debounce window (300–500ms).

 The video player only initializes if the user actually
 settles at the top of the page.

 This prevents:
 - excessive network churn
 - multiple player initializations
 - unnecessary CPU usage.
 */
