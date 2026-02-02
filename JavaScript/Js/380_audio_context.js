/* 380_audio_context.js

=====================================================
AudioContext in Web Audio API
=====================================================

Definition (What I should say in the interview):
- "AudioContext is the **primary object** of the Web Audio API. It represents an audio-processing 
   graph that controls **audio operations** like playback, routing, effects, and analysis. 
   All audio nodes must be created and connected through an AudioContext."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Serves as the **central controller** for audio processing.
2. Manages **audio nodes**, which are the building blocks for sound.
3. Supports **playback control** and precise **timing** of audio events.
4. Allows **suspending, resuming, and closing** audio processing to manage resources.
5. Can handle both **buffered audio** (AudioBufferSourceNode) and **live audio input** (MediaStreamAudioSourceNode).

-----------------------------------------------------
Basic Example (Creating an AudioContext)
-----------------------------------------------------
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.type = 'square';
oscillator.frequency.value = 440; // A4 note

// Connect oscillator to destination (speakers)
oscillator.connect(audioCtx.destination);

// Start and stop
oscillator.start();
setTimeout(() => oscillator.stop(), 2000);

-----------------------------------------------------
Managing AudioContext
-----------------------------------------------------
console.log(audioCtx.state); // "running", "suspended", or "closed"

// Suspend audio processing
audioCtx.suspend().then(() => console.log('AudioContext suspended'));

// Resume audio processing
audioCtx.resume().then(() => console.log('AudioContext resumed'));

// Close audio context
audioCtx.close().then(() => console.log('AudioContext closed'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Central hub for **audio processing graphs** in Web Audio API.
- Managing **timing and synchronization** of sounds in games or apps.
- Connecting multiple **effects and filters** in audio pipelines.
- Handling **live audio input** for analysis or processing.
- Controlling **audio playback** in music or multimedia applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Most browsers **require user interaction** to start AudioContext.
2. Audio nodes cannot function outside an **AudioContext**.
3. Multiple AudioContexts can exist, but usually one per app is recommended.
4. Provides high-precision timing via `audioCtx.currentTime`.
5. Efficiently handles **complex audio graphs** for real-time processing.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of AudioContext as the **main control room of a music studio**:
  - It routes and manages all instruments (audio nodes), applies effects, and ensures synchronized playback.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the role of AudioContext in Web Audio API?  
A1: It manages the audio-processing graph, timing, and all audio nodes.

Q2: How do you suspend or resume audio playback?  
A2: Using `audioCtx.suspend()` and `audioCtx.resume()` methods.

Q3: Can you have multiple AudioContexts?  
A3: Yes, but usually one is sufficient per application for performance reasons.

Q4: How do you get precise audio timing?  
A4: Using `audioCtx.currentTime`, which provides high-resolution timestamps for scheduling events.
*/
