/* 378_webxr.js

=====================================================
WebXR API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebXR is a modern JavaScript API that enables **both Virtual Reality (VR) and Augmented Reality (AR)** 
   experiences directly in the browser. It allows web applications to interact with XR hardware such as 
   headsets, controllers, and sensors to render immersive and interactive 3D environments."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Supports **VR and AR** devices, providing a unified API.
2. Provides **head tracking, position, orientation**, and **input from controllers**.
3. Works with **WebGL/WebGPU** for high-performance 3D rendering.
4. Enables **immersive experiences** without installing additional software.
5. Supports **session types**: `inline`, `immersive-vr`, `immersive-ar`.
6. Handles **frame loops** efficiently for smooth rendering of XR scenes.

-----------------------------------------------------
Basic Example (Requesting an XR Session)
-----------------------------------------------------
if (navigator.xr) {
  navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    if (supported) {
      navigator.xr.requestSession('immersive-vr').then((session) => {
        console.log('XR session started:', session);
        // You can now render the VR scene using WebGL/WebGPU
      });
    } else {
      console.log('Immersive VR not supported');
    }
  });
} else {
  console.log('WebXR not supported in this browser');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- VR and AR games in the browser.
- Virtual tours for real estate, museums, or education.
- Interactive training and simulation applications.
- AR overlays for shopping, navigation, or industrial applications.
- Experiential marketing using immersive 3D content.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebXR replaces the deprecated **WebVR API**.
2. Requires **secure context (HTTPS)** for device access.
3. Supports multiple **input sources** including hands, controllers, and sensors.
4. Must manage **XR sessions** properly to free resources when done.
5. Integrates with **WebGL or WebGPU** for rendering immersive 3D scenes.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebXR as a **universal gateway for immersive experiences**:
  - WebVR was only for VR headsets, while WebXR supports VR and AR.
  - It lets the browser communicate with XR devices and render responsive 3D environments.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between WebXR and WebVR?  
A1: WebVR is deprecated and only supports VR. WebXR supports both VR and AR and provides a unified modern API.

Q2: What types of XR sessions exist in WebXR?  
A2: `inline` (non-immersive), `immersive-vr` (VR), `immersive-ar` (AR).

Q3: How do you render graphics in a WebXR session?  
A3: Using **WebGL** or **WebGPU**, often in combination with the `requestAnimationFrame` loop for XR sessions.

Q4: Can WebXR work on mobile devices?  
A4: Yes, if the device and browser support XR hardware, including AR-enabled devices.
*/
