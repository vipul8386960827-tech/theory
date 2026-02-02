/* 375_geolocation_watch.js

=====================================================
Geolocation watchPosition API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The `watchPosition` method of the Geolocation API allows web applications to **continuously 
   monitor the user's geographic location**. It provides real-time updates whenever the position 
   changes, making it ideal for navigation, tracking, and live location-based applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Continuously tracks user's **latitude, longitude, altitude, speed, and heading**.
2. Returns a **watch ID** that can be used to stop watching with `clearWatch`.
3. Accepts **success and error callbacks** along with optional settings.
4. Supports options like `enableHighAccuracy`, `timeout`, and `maximumAge`.
5. Useful for **navigation apps, fitness trackers, delivery tracking, and real-time monitoring**.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
if ('geolocation' in navigator) {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Speed:', position.coords.speed);
    },
    (error) => {
      console.error('Error watching position:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );

  // Stop watching after 30 seconds
  setTimeout(() => {
    navigator.geolocation.clearWatch(watchId);
    console.log('Stopped watching position');
  }, 30000);
} else {
  console.log('Geolocation is not supported by this browser.');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Real-time navigation apps (like Google Maps or ridesharing apps).
- Fitness applications tracking runs or cycling routes.
- Fleet or logistics tracking systems.
- Games or applications that respond to user movement.
- Geotagging live content based on user location updates.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Requires **user permission** to access location.
2. High-frequency tracking can **consume battery quickly** on mobile devices.
3. Accuracy depends on **GPS, Wi-Fi, or network triangulation**.
4. Use `enableHighAccuracy` only when precise location is needed.
5. Always **clear watch** when no longer needed to save resources.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `watchPosition` like a **live GPS tracker** in your phone:
  - It continuously reports your current position.
  - You can stop the tracking anytime (clearWatch) just like turning off a GPS device.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between getCurrentPosition and watchPosition?  
A1: `getCurrentPosition` retrieves the location once, whereas `watchPosition` tracks location continuously.

Q2: How do you stop watching a user's position?  
A2: Use `navigator.geolocation.clearWatch(watchId)` with the ID returned by `watchPosition`.

Q3: Can watchPosition affect device performance?  
A3: Yes, continuous high-accuracy tracking can drain battery and increase resource usage.

Q4: What options can you pass to watchPosition?  
A4: `enableHighAccuracy` (boolean), `timeout` (ms), `maximumAge` (ms for cached positions).
*/
