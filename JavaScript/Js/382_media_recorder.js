/* 382_media_recorder.js

=====================================================
MediaRecorder API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The MediaRecorder API allows web applications to **record audio and/or video streams** 
   from MediaStream objects (like those from a user's microphone or camera). 
   It is commonly used for creating recordings, capturing user interactions, and building 
   media-based applications directly in the browser."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Works with **MediaStream** objects obtained via `getUserMedia`.
2. Supports **audio, video, or both**.
3. Provides **event-driven recording** (`dataavailable`, `stop`, `error`, etc.).
4. Allows **specifying MIME type** and codecs for output (`video/webm`, `audio/webm`, etc.).
5. Enables **recording in chunks** or full streams.
6. Recorded data can be saved as **Blob** for playback or upload.

-----------------------------------------------------
Basic Example (Record Video from Camera)
-----------------------------------------------------
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data); // Collect recorded data
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        document.body.appendChild(video);
        video.play();
      };

      mediaRecorder.start(); // Start recording
      console.log('Recording started');

      // Stop after 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        console.log('Recording stopped');
      }, 5000);
    })
    .catch((error) => console.error('Error accessing media devices:', error));
} else {
  console.log('MediaRecorder API not supported');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Recording video messages or user interactions in web apps.
- Audio/video notes or tutorials directly in the browser.
- Screen recording and media capture applications.
- Integrating with WebRTC for session recording.
- Collecting user-generated content for social media apps.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Requires **user permission** for audio/video access.
2. The API is **event-driven**; recorded data is available via `ondataavailable`.
3. Not all **MIME types or codecs** are supported in all browsers.
4. Works only in **secure contexts (HTTPS)**.
5. Recording can be in **chunks** for large streams or real-time processing.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of MediaRecorder as a **digital tape recorder for the browser**:
  - You can start, stop, and capture live audio or video streams.
  - The recorded data can be saved, played back, or sent over the network.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you start and stop recording using MediaRecorder?  
A1: Call `mediaRecorder.start()` to begin and `mediaRecorder.stop()` to end recording.

Q2: How do you access the recorded data?  
A2: Use the `ondataavailable` event which provides chunks of the recorded media.

Q3: Can you specify the format of the recording?  
A3: Yes, via the `mimeType` option in the MediaRecorder constructor.

Q4: Can MediaRecorder work with existing MediaStream tracks?  
A4: Yes, any MediaStream obtained from `getUserMedia` or other sources can be recorded.
*/
