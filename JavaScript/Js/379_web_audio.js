/* 379_web_audio.js

=====================================================
Web Audio API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Web Audio API is a high-level JavaScript API for **processing and synthesizing audio** in web applications. 
   It allows developers to create complex audio graphs, apply effects, analyze audio data in real-time, and 
   build interactive audio experiences for games, music apps, and other multimedia applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **advanced audio processing** beyond HTML `<audio>` element.
2. Supports **creation, routing, and manipulation** of audio nodes.
3. Enables **real-time audio analysis** (frequency, waveform) using AnalyserNode.
4. Allows **effects and filters** (gain, panning, distortion, reverb, etc.).
5. Supports **scheduling and playback control** with precise timing.
6. Works with both **live input** (microphone) and **buffered audio** (files, streams).

-----------------------------------------------------
Basic Example (Simple Sine Wave)
-----------------------------------------------------
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

// Connect nodes
oscillator.connect(gainNode).connect(audioCtx.destination);

// Configure oscillator
oscillator.type = 'sine';
oscillator.frequency.value = 440; // Frequency in Hz (A4 note)
gainNode.gain.value = 0.5;        // Volume

// Start and stop oscillator
oscillator.start();
setTimeout(() => oscillator.stop(), 2000); // Play for 2 seconds

-----------------------------------------------------
Real-Time Audio Analysis Example
-----------------------------------------------------
const analyser = audioCtx.createAnalyser();
oscillator.connect(analyser);
analyser.fftSize = 2048;

const dataArray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(dataArray);
console.log(dataArray); // Frequency data for visualization or processing

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Music or audio synthesis applications.
- Interactive games with spatial audio.
- Audio visualizations (waveforms, frequency spectrums).
- Voice effects and audio processing tools.
- Live audio input analysis and manipulation (microphone input).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Must **create AudioContext** before using any audio nodes.
2. Audio playback often requires **user interaction** due to browser autoplay policies.
3. Provides precise control over **timing and scheduling** of audio events.
4. Can be CPU intensive for complex audio graphs.
5. Works well with other APIs like **WebXR** for immersive audio experiences.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Web Audio API as a **modular sound studio in the browser**:
  - Audio nodes are like instruments, mixers, and effects.
  - You can route, process, and analyze audio signals in real-time, creating complex audio experiences.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between Web Audio API and HTMLAudioElement?  
A1: HTMLAudioElement is simple playback; Web Audio API allows advanced processing, effects, and real-time analysis.

Q2: How do you analyze audio data in real-time?  
A2: Using `AnalyserNode` with methods like `getByteFrequencyData` or `getByteTimeDomainData`.

Q3: Can you apply effects to live microphone input?  
A3: Yes, by connecting a `MediaStreamAudioSourceNode` from `getUserMedia` to audio processing nodes.

Q4: What are some common audio nodes?  
A4: OscillatorNode, GainNode, AnalyserNode, BiquadFilterNode, AudioBufferSourceNode, etc.
*/
