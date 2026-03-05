/**
FULL SCREEN VIDEO PLAYER ARCHITECTURE
Transitioning from a hover preview to the full cinematic playback experience
significantly increases both data requirements and system complexity.
*/

/**
1. HLS (HTTP LIVE STREAMING) & THE .M3U8 MANIFEST

HLS is the standard streaming protocol used to deliver large videos efficiently.

Core Idea:
Instead of downloading a single large video file, the movie is divided
into small segments (usually 2–4 seconds each).

Master Manifest (.m3u8):
This acts like a playlist of different quality streams.
For example:
- 4K stream
- 1080p stream
- 720p stream
- 480p stream

Media Manifest:
Once the player chooses a quality level, it loads another manifest
which contains the exact URLs for the video segments at that quality.

The player then downloads these segments sequentially to create
continuous playback.
*/


/**
2. ROLE OF HLS.JS (STREAMING ENGINE)

Most browsers cannot natively parse .m3u8 files.

Solution:
We use a JavaScript streaming engine such as HLS.js.

How it works:

1. HLS.js fetches the master manifest file.
2. It selects a quality level.
3. It begins downloading video segments.
4. These segments are passed to the browser using the
   Media Source Extensions (MSE) API.
5. The browser appends these segments into a SourceBuffer,
   which is then consumed by the <video> element.

This effectively converts multiple small files into a
continuous playable stream.
*/


/**
3. ADAPTIVE BITRATE (ABR)

Adaptive Bitrate ensures smooth playback under varying network conditions.

Throughput Detection:
The player continuously measures download speed while fetching segments.

Example:
If a segment of 2MB downloads in 0.5 seconds,
the estimated throughput is roughly 32 Mbps.

Quality Switching:
If network speed drops, the player automatically switches
to a lower quality stream for the next segment.

Example:
1080p may require ~10 Mbps.
If network drops to 2 Mbps, the player switches to 480p.

Seamless Switching:
All video segments across different quality levels are
time-aligned, allowing quality switching without
interrupting playback.
*/


/**
4. BUFFER MANAGEMENT & RESOURCE PRIORITIZATION

For the full-screen player, stability is the top priority.

Forward Buffer Strategy:
We maintain a forward buffer of roughly 30–60 seconds.

This allows playback to continue even if the network
momentarily slows down or disconnects.

Network Priority:
When the full-screen player is active:
- Video segment downloads receive high priority.
- Background network activity (such as row prefetching)
  is paused to ensure maximum bandwidth is allocated
  to video playback.

This ensures the user experiences uninterrupted streaming.
*/