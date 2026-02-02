/* 374_geolocation_api.js

=====================================================
Geolocation API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Geolocation API allows web applications to **access the user's geographic location** 
   (latitude, longitude, altitude, and more) in a secure and standardized way. 
   It is widely used in mapping, navigation, location-based services, and real-time tracking."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **latitude and longitude**, and optionally **altitude, accuracy, speed, and heading**.
2. Works asynchronously with **success and error callbacks**.
3. Requires **user permission** for privacy and security.
4. Supports **watching position** continuously for real-time updates.
5. Available in **modern browsers** and often combined with mapping services (Google Maps, Leaflet).

-----------------------------------------------------
Basic Example (Get Current Position)
-----------------------------------------------------
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Accuracy:', position.coords.accuracy);
    },
    (error) => {
      console.error('Error getting location:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
} else {
  console.log('Geolocation is not supported by this browser.');
}

-----------------------------------------------------
Watching Position Example
-----------------------------------------------------
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('Updated Latitude:', position.coords.latitude);
    console.log('Updated Longitude:', position.coords.longitude);
  },
  (error) => console.error('Error:', error),
  { enableHighAccuracy: true, maximumAge: 10000 }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Location-based services like maps, ridesharing, and delivery apps.
- Tracking user movement in fitness apps or games.
- Personalizing content based on location.
- Geotagging photos or user-generated content.
- Real-time monitoring for logistics or fleet management.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Always request **user permission**; the API will fail if denied.
2. Accuracy depends on **GPS, Wi-Fi, or network data**.
3. Continuous tracking can **drain battery** on mobile devices.
4. Use `enableHighAccuracy` only when needed to improve performance.
5. Geolocation API works only in **secure contexts (HTTPS)**.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the Geolocation API as a **GPS tracker**:
  - The browser asks the user for permission to know their exact position.
  - Once granted, it can provide current location and updates, like a GPS device sending coordinates.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between getCurrentPosition and watchPosition?  
A1: `getCurrentPosition` retrieves location **once**, while `watchPosition` continuously tracks changes.

Q2: Can Geolocation API work without HTTPS?  
A2: No, modern browsers require **secure context (HTTPS)** for geolocation.

Q3: What are common errors when using Geolocation API?  
A3: User denied permission, timeout, or position unavailable.

Q4: How can you improve the accuracy of location data?  
A4: By using `enableHighAccuracy: true`, but it may increase battery usage.
*/
