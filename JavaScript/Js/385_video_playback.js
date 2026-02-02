/* 385_video_playback.js

=====================================================
Video Playback in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Video playback in JavaScript refers to the ability to **play, control, and manipulate video files or streams** 
   programmatically in web applications. It can be done using HTMLMediaElement APIs, MediaStream sources, 
   or WebRTC for real-time video content."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Uses `<video>` HTML element or MediaStream sources.
2. Provides **playback control**: `play()`, `pause()`, `load()`, `currentTime`.
3. Supports **volume control, muting, looping**, and playback speed adjustment.
4. Handles **events** like `play`, `pause`, `ended`, `timeupdate`, `error`.
5. Can display **remote URLs, local files, or live camera feeds**.
6. Integrates with **MediaStream** for live video or WebRTC for real-time communication.

-----------------------------------------------------
Basic Example (HTMLVideoElement)
-----------------------------------------------------
const video = document.querySelector('video');

// Play video
video.play().then(() => console.log('Video playing')).catch(err => console.error(err));

// Pause video
video.pause();

// Seek to 20 seconds
video.currentTime = 20;

// Set volume and playback rate
video.volume = 0.8;
video.playbackRate = 1.25;

// Event listener
video.addEventListener('ended', () => console.log('Video ended'));

-----------------------------------------------------
Playing Live Camera Feed
-----------------------------------------------------
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const video = document.querySelector('video');
    video.srcObject = stream; // Display live camera feed
    video.play();
  })
  .catch(err => console.error('Error accessing media devices:', err));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Custom video players for web applications.
- Live streaming and video conferencing.
- Displaying user-generated content or recordings.
- Video tutorials and online courses.
- Interactive experiences integrating video with graphics or audio effects.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Autoplay may require **user interaction** due to browser policies.
2. Video element properties allow precise **control over playback and synchronization**.
3. Live streams can be attached using `srcObject` with MediaStream.
4. Works with Web Audio API for audio processing alongside video.
5. Multiple video elements can be controlled simultaneously with JavaScript.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of video playback as **operating a video player programmatically**:
  - You can play, pause, seek, adjust volume, and react to events, just like controlling a physical device or software player.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you play and pause a video programmatically?  
A1: Using `video.play()` to play and `video.pause()` to pause the element.

Q2: Can you play live camera feeds in a video element?  
A2: Yes, by assigning a MediaStream to `video.srcObject`.

Q3: How can you detect when a video ends?  
A3: By listening to the `ended` event on the video element.

Q4: How do you adjust playback speed and volume?  
A4: Using the `playbackRate` and `volume` properties on the video element.
*/
