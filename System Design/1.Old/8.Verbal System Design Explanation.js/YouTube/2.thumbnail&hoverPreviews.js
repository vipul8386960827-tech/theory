/* 
---------------------------------------------------------
VIDEO THUMBNAILS & HOVER PREVIEWS IMPLEMENTATION
---------------------------------------------------------

1) Purpose:
"Hover previews improve UX by letting users quickly preview a video
without opening it fully."

2) Basic idea:
- "Video thumbnails are static images initially."
- "When the user hovers over a thumbnail, show a short, low-res, muted video preview."

3) Frontend implementation:

- Reusable video element:
  - "Use a single hidden <video> element that gets attached to the hovered thumbnail."
  - "This avoids creating multiple video elements for all thumbnails, saving resources."

- Throttle hover events:
  - "Use debounce/throttle to prevent firing hover events too frequently."
  - "If the user quickly moves the mouse across thumbnails, cancel previous preview requests."

- Steps:
  1) On mouse enter:
     - Cancel any previous preview loading.
     - Set source of reusable video element to the preview URL.
     - Play video muted.
  2) On mouse leave:
     - Pause the video.
     - Hide or detach it from the thumbnail.
  3) Optionally preload low-res preview videos in the background for faster playback.

4) Optimization tips:
- Use short, low-res clips to save bandwidth.
- Throttle events to reduce unnecessary network requests.
- Reuse a single video element instead of multiple elements for all thumbnails.
- Lazy-load preview only when user hovers.

5) How to explain in interview:
- "We display static thumbnails by default.
- On hover, we attach a single reusable <video> element to the hovered thumbnail,
play a short, muted, low-res preview.
- Hover events are throttled and previous previews are cancelled
to optimize performance.
- This improves UX while minimizing resource usage."

---------------------------------------------------------
END OF VIDEO THUMBNAIL & HOVER PREVIEW EXPLANATION
---------------------------------------------------------
*/
