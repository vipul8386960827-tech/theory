/* 
---------------------------------------------------------
FEED / INFINITE SCROLL WITH CURSOR-BASED PAGINATION
---------------------------------------------------------

1) Purpose:
"Infinite scroll allows users to continuously scroll through videos
without page reloads.
Lazy loading ensures that only visible content is rendered,
improving performance."

2) Key techniques:

- Lazy load:
  - "Only render thumbnails and video cards when they appear in the viewport."
  - "Helps reduce initial load time and memory usage."

- Prefetch next set:
  - "When the user scrolls near the bottom, prefetch the next batch of videos
so that scrolling feels smooth without delays."

- Cursor-based pagination (explained in detail):

  a) Definition:
  - "Cursor-based pagination is a way to fetch the next set of data
using a cursor instead of page numbers."
  - "The cursor is usually the ID, timestamp, or unique property
of the last item in the current batch."

  b) How it works:
  - Client requests first N videos: `/videos?limit=20`
  - Server returns:
    - The first 20 videos
    - A cursor representing the last video ID or timestamp
  - Client requests next 20 videos: `/videos?limit=20&cursor=<last_video_id>`
  - Server returns the next batch after that cursor
  - This repeats as the user scrolls down.

  c) Advantages over offset-based pagination:
  - "Avoids issues with new content being inserted while paginating."
  - "Faster for large datasets because the server doesn't have to skip rows."
  - "Ensures consistent order and no duplicates in the feed."

3) Frontend flow:

- Maintain the last cursor received.
- When the user scrolls near the bottom:
  - Trigger fetch using last cursor.
  - Append new videos to the feed.
- Prefetch next batch slightly before the user reaches the bottom for smooth UX.

4) Optimizations:
- Use IntersectionObserver to detect when to load next batch.
- Combine with lazy-loading images/videos to save bandwidth.
- Cache already loaded videos in memory for faster re-render.

5) How to explain in interview concisely:
- "Infinite scroll uses cursor-based pagination:
  server returns N videos and a cursor for the last video.
  Client requests next batch using that cursor.
- Lazy load thumbnails and video cards for performance.
- Prefetch next set to ensure smooth scrolling.
- Cursor-based pagination is preferred over offset-based because it prevents duplicates,
handles new videos seamlessly, and scales better for large datasets."

---------------------------------------------------------
END OF FEED / INFINITE SCROLL EXPLANATION
---------------------------------------------------------
*/
