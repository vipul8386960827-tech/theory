/* 383_media_element.js

=====================================================
HTMLMediaElement API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "HTMLMediaElement is the **interface for <audio> and <video> elements** in the DOM. 
   It provides methods and properties to control media playback, manage events, and interact 
   with audio and video content programmatically in web applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Represents `<audio>` and `<video>` HTML elements.
2. Provides **playback control methods**: `play()`, `pause()`, `load()`.
3. Provides **media state properties**: `currentTime`, `duration`, `paused`, `ended`.
4. Handles **volume and playback rate**: `volume`, `muted`, `playbackRate`.
5. Supports **media events**: `play`, `pause`, `timeupdate`, `ended`, `error`, etc.
6. Can be used with **MediaStream** for live playback or Web Audio API for audio processing.

-----------------------------------------------------
Basic Example (Video Control)
-----------------------------------------------------
const video = document.querySelector('video');

// Play video
video.play().then(() => console.log('Video playing')).catch(err => console.error(err));

// Pause video
video.pause();

// Seek to 10 seconds
video.currentTime = 10;

// Adjust volume and playback speed
video.volume = 0.5;
video.playbackRate = 1.25;

// Event listener
video.addEventListener('ended', () => console.log('Video ended'));

-----------------------------------------------------
Using MediaStream with HTMLMediaElement
-----------------------------------------------------
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const video = document.querySelector('video');
    video.srcObject = stream; // Play live camera feed
    video.play();
  })
  .catch(err => console.error('Error accessing media devices:', err));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Controlling audio and video playback in web applications.
- Implementing custom media players with UI controls.
- Playing live streams from camera or microphone.
- Synchronizing media with other web content (animations, graphics).
- Integrating with Web Audio API for audio effects.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Browser autoplay policies may require **user interaction** to start playback.
2. `currentTime` allows **seeking and synchronization**.
3. Supports **event-driven programming** to respond to media state changes.
4. Can play **remote URLs** or **local MediaStreams**.
5. Works seamlessly with **MediaRecorder** and **WebRTC** for recording or streaming.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of HTMLMediaElement as a **remote control for media**:
  - You can play, pause, adjust volume, and monitor the state programmatically.
  - It acts as the bridge between the web page and the media content.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you play and pause a video programmatically?  
A1: Use `video.play()` to play and `video.pause()` to pause the media element.

Q2: Can HTMLMediaElement play live camera feeds?  
A2: Yes, by assigning a MediaStream to `video.srcObject`.

Q3: How can you detect when media ends?  
A3: Listen to the `ended` event on the media element.

Q4: How do you change playback speed?  
A4: Modify the `playbackRate` property of the media element.
*/
