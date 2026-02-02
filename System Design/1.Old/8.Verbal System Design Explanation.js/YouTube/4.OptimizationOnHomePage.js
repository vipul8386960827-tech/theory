/**
For the YouTube homepage, the goal is a fast, responsive, and seamless user experience.

First, all video thumbnails are initially images to keep the DOM light. 
Hover previews are handled using a single reusable HTML5 <video> element that moves over the hovered 
thumbnail 
and plays a short, muted, low-resolution clip. 
This avoids creating one video player per thumbnail, which would overburden the UI.

Second, while the homepage loads, I’d preload full video page data for the videos currently in the viewport. 
This allows users to click a video and see the page instantly using cached data, 
improving perceived performance.

Additionally, for streaming videos or movies, we can preload the first few chunks of the actual video stream 
using adaptive streaming protocols like HLS or DASH. 
This ensures that when the user clicks on a video, playback starts immediately, 
even before the entire video is loaded, and reduces buffering delays.

Third, to avoid wasting network and CPU, I’d halt preloads for videos scrolled out of view. 
I’d achieve this using IntersectionObserver to track visible thumbnails 
and abortable fetches to cancel ongoing preloading tasks for videos that leave the viewport.

Finally, when a user clicks on a video, I’d cancel all remaining preloading tasks for other videos 
and focus only on fetching the clicked video page, its metadata, and the initial video chunks. 
This ensures resources are efficiently used and the clicked video plays seamlessly.
HLS knows to load the next chunk because the player constantly monitors the buffered content in memory.
Each video is split into small chunks listed in a playlist (.m3u8).
When the buffered video falls below a certain threshold, the player requests the next chunk from the playlist.
This continues until the video ends. The player can also switch to a different quality playlist dynamically based on network speed.

Together, these strategies — lazy hover video previews, background preloading of metadata and streaming 
chunks,
halting preloads on scroll, and canceling on click — create a smooth, high-performance YouTube 
homepage experience.
*/
