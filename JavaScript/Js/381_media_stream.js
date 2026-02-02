/* 381_media_stream.js

=====================================================
MediaStream API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The MediaStream API represents a **stream of media content**, such as audio and video, 
   typically obtained from a user's microphone, camera, or other media sources. 
   It is used in real-time communication, video conferencing, live streaming, and recording applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Represents a **live stream of audio and/or video tracks**.
2. Each stream contains **MediaStreamTrack** objects for audio or video.
3. Can be obtained using `navigator.mediaDevices.getUserMedia()`.
4. Supports **real-time processing, recording, and playback**.
5. Can be **connected to WebRTC, AudioContext, or HTML media elements**.
6. Tracks can be **added, removed, or cloned** dynamically.

-----------------------------------------------------
Basic Example (Get User Media)
-----------------------------------------------------
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const videoElement = document.querySelector('video');
      videoElement.srcObject = stream; // Assign stream to video element
      videoElement.play();
      console.log('MediaStream obtained:', stream);
    })
    .catch((error) => {
      console.error('Error accessing media devices:', error);
    });
} else {
  console.log('MediaStream API not supported in this browser.');
}

-----------------------------------------------------
Manipulating MediaStream
-----------------------------------------------------
// Access tracks
const audioTracks = stream.getAudioTracks();
const videoTracks = stream.getVideoTracks();

// Stop tracks
audioTracks.forEach(track => track.stop());
videoTracks.forEach(track => track.stop());

// Add or remove tracks dynamically
const newTrack = someMediaStreamTrack;
stream.addTrack(newTrack);
stream.removeTrack(audioTracks[0]);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Video conferencing applications (Zoom, Google Meet, etc.).
- Live streaming platforms and social media apps.
- Audio/video recording in the browser.
- WebRTC peer-to-peer communication.
- Integrating media streams with Web Audio API for processing.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Requires **user permission** to access camera and microphone.
2. Streams are **live**, so stopping tracks is necessary to conserve resources.
3. Works only in **secure contexts (HTTPS)**.
4. Can be combined with **MediaRecorder** for recording or WebRTC for real-time communication.
5. Tracks can be **manipulated individually** without affecting the entire stream.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of MediaStream as a **live TV broadcast feed**:
  - Each track is like a separate channel (audio or video).
  - You can attach it to a screen (video element), modify it, or send it to other users in real-time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you obtain a MediaStream from the user?  
A1: Using `navigator.mediaDevices.getUserMedia({ audio: true, video: true })`.

Q2: Can you manipulate tracks within a MediaStream?  
A2: Yes, tracks can be added, removed, cloned, or stopped individually.

Q3: How can you use MediaStream with WebRTC?  
A3: The stream can be sent over a WebRTC peer connection using `addTrack` or `addStream`.

Q4: What permissions are required to access MediaStream?  
A4: Explicit user permission to access the camera and/or microphone.
*/
