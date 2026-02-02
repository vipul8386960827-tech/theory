/* 377_web_vr.js

=====================================================
WebVR API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebVR is a JavaScript API that allows web applications to **access Virtual Reality (VR) 
   devices** and render immersive VR experiences directly in the browser. It provides the ability 
   to interact with VR hardware like headsets and motion controllers, enabling 3D environments 
   and applications without installing additional software."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Allows **VR content rendering** in web browsers using supported hardware.
2. Provides **access to head position, orientation, and motion controllers**.
3. Enables **immersive experiences** with stereoscopic rendering.
4. Supports both **desktop and mobile VR devices**.
5. Works with WebGL for rendering 3D scenes.
6. Mostly **deprecated** in favor of the newer **WebXR API**, which supports both VR and AR.

-----------------------------------------------------
Basic Example (VR Display Detection)
-----------------------------------------------------
if (navigator.getVRDisplays) {
  navigator.getVRDisplays().then((displays) => {
    if (displays.length > 0) {
      const vrDisplay = displays[0];
      console.log('VR Display detected:', vrDisplay.displayName);
      vrDisplay.requestAnimationFrame(() => {
        console.log('Rendering VR scene');
      });
    } else {
      console.log('No VR displays found');
    }
  });
} else {
  console.log('WebVR not supported in this browser');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Browser-based VR games and simulations.
- VR walkthroughs for real estate or museums.
- Interactive 3D education and training modules.
- VR design and visualization tools.
- Experiential marketing and VR storytelling on the web.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebVR is **deprecated**; developers are encouraged to use **WebXR**.
2. Requires **VR-capable devices** (headsets, controllers) and **supported browsers**.
3. Integrates with WebGL to render immersive 3D graphics.
4. Offers **frame-synchronized rendering** for smooth VR experiences.
5. May require **user permission** to access VR hardware.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebVR as a **bridge between the browser and a VR headset**:
  - It allows the browser to know the position and orientation of the headset.
  - Enables web apps to render immersive 3D environments that respond to head movements.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between WebVR and WebXR?  
A1: WebVR is deprecated and supports only VR. WebXR is modern, supports both VR and AR, and 
   provides better device compatibility.

Q2: How do you detect a VR device in WebVR?  
A2: Using `navigator.getVRDisplays()` which returns a list of connected VR displays.

Q3: Can WebVR work on mobile browsers?  
A3: Yes, if the browser and device support WebVR, but WebXR is recommended for better support.

Q4: Why is WebVR deprecated?  
A4: Due to limitations in supporting AR devices and evolving hardware, WebXR provides a unified API for immersive experiences.
*/
