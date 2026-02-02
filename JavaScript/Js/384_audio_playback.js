/* 384_audio_playback.js

=====================================================
Audio Playback in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Audio playback in JavaScript refers to the ability to **play, control, and manipulate audio files or streams** 
   programmatically in web applications. This can be done using the HTMLMediaElement API, Web Audio API, 
   or MediaStream sources for both static and dynamic audio content."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Supports playback using `<audio>` elements or Web Audio API.
2. Allows **play, pause, stop, and seek** operations.
3. Supports **volume control, muting, and looping**.
4. Can play **local files, remote URLs, or live streams**.
5. Integrates with **Web Audio API** for effects, analysis, and audio graph processing.
6. Provides **event-driven control** through events like `play`, `pause`, `ended`, `timeupdate`.

-----------------------------------------------------
Basic Example (HTMLAudioElement)
-----------------------------------------------------
const audio = new Audio('song.mp3');

// Play audio
audio.play().then(() => console.log('Audio playing')).catch(err => console.error(err));

// Pause audio
audio.pause();

// Seek to 30 seconds
audio.currentTime = 30;

// Set volume and loop
audio.volume = 0.7;
audio.loop = true;

// Event listener
audio.addEventListener('ended', () => console.log('Audio ended'));

-----------------------------------------------------
Using Web Audio API for Playback
-----------------------------------------------------
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);
track.connect(audioCtx.destination);
audioElement.play();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Playing background music or sound effects in games.
- Music streaming applications.
- Notifications or alert sounds in web apps.
- Interactive audio experiences and web-based synthesizers.
- Real-time audio analysis and visualization.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Autoplay may require **user interaction** due to browser policies.
2. HTMLAudioElement provides simple playback; Web Audio API allows advanced processing.
3. Volume, looping, and playbackRate can be controlled programmatically.
4. Playback can be combined with **visualization or effects** using Web Audio API.
5. Can handle **multiple simultaneous audio sources** with Web Audio API.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of audio playback as **controlling a sound system**:
  - HTMLAudioElement is like pressing play/pause on a single speaker.
  - Web Audio API is like controlling a mixing board with multiple tracks, effects, and routing.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What are the different ways to play audio in JavaScript?  
A1: Using HTMLAudioElement, `<audio>` tags, or Web Audio API with MediaElementSourceNode.

Q2: How do you control audio volume and playback speed?  
A2: Use `volume` and `playbackRate` properties on HTMLAudioElement or corresponding nodes in Web Audio API.

Q3: Can you analyze audio while playing it?  
A3: Yes, using Web Audio API’s AnalyserNode to get frequency and waveform data.

Q4: How do you handle multiple audio tracks simultaneously?  
A4: Use Web Audio API to create separate nodes for each track and connect them to the destination.
*/
