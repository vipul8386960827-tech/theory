import React, { useEffect, useRef } from "react";
import Hls from "hls.js"; // Library used to play HLS streaming videos (.m3u8) in browsers that don't support it natively

export function VideoPlayer({ src, isVisible }) {
  // useRef gives us direct access to the actual <video> DOM element
  const videoRef = useRef(null);

  useEffect(() => {
    // Get the actual video element from the ref
    const video = videoRef.current;

    // If video element is not available, stop execution
    if (!video) return;

    // Check if the browser supports HLS.js playback
    if (Hls.isSupported()) {
      // Create a new HLS instance
      const hls = new Hls();

      // Load the streaming source (usually a .m3u8 playlist)
      // .m3u8 contains multiple video segments for adaptive streaming
      hls.loadSource(src);

      // Attach the HLS stream to the video element
      // After this the video element will start receiving the stream
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari has native support for HLS
      // So we don't need Hls.js, we can directly set the source
      video.src = src;
    }
  }, [src]);
  // This effect runs whenever the src changes
  // Example: when user scrolls to another video and a new stream URL is provided

  // 🟢 AUTO PLAY / PAUSE BASED ON VISIBILITY
  useEffect(() => {
    // If the video is currently visible in the viewport
    if (isVisible) {
      // Attempt to play the video
      // Some browsers block autoplay unless muted
      videoRef.current.play().catch(() => {});
    } else {
      // If the video is not visible (user scrolled away)
      // pause it to save bandwidth and CPU
      videoRef.current.pause();
    }
  }, [isVisible]);
  // This effect runs whenever visibility changes
  // Usually controlled by IntersectionObserver

  return (
    <video
      ref={videoRef} // Connects this DOM element to videoRef
      muted // Required for autoplay in most browsers
      loop // Video restarts automatically when finished
      playsInline // Prevents iOS from forcing fullscreen
      className="meme-video"
      // Basic styling
      style={{
        width: "100%",
        borderRadius: "8px",
      }}
    />
  );
}
