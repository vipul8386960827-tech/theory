/* 376_geolocation_clear.js

=====================================================
Geolocation clearWatch API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "`clearWatch` is a method of the Geolocation API that **stops monitoring a user's location** 
   that was previously started using `watchPosition`. It helps conserve **battery, network, 
   and processing resources** once continuous location tracking is no longer needed."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Stops continuous location tracking initiated by `watchPosition`.
2. Accepts the **watch ID** returned by `watchPosition`.
3. Helps prevent **unnecessary resource usage**.
4. Does not affect other ongoing geolocation requests; only stops the specified watcher.
5. Important for **applications with periodic or optional location tracking**.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
if ('geolocation' in navigator) {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
    },
    (error) => console.error('Error:', error),
    { enableHighAccuracy: true }
  );

  // Stop watching after 15 seconds
  setTimeout(() => {
    navigator.geolocation.clearWatch(watchId);
    console.log('Stopped watching position');
  }, 15000);
} else {
  console.log('Geolocation is not supported by this browser.');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Stopping real-time location tracking when user leaves a route.
- Conserving battery in mobile applications after tracking is no longer needed.
- Managing multiple geolocation watchers efficiently.
- Pausing tracking in fitness apps once a workout session ends.
- Controlling optional location-based features in apps.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Always store the **watch ID** from `watchPosition` to clear it later.
2. Calling `clearWatch` on an invalid or already cleared ID has **no effect**.
3. Stopping watchers helps improve **battery life and app performance**.
4. Can be called anytime after `watchPosition` is initiated.
5. Works in **all modern browsers** supporting the Geolocation API.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `clearWatch` as **turning off a GPS tracker**:
  - `watchPosition` is like starting a GPS device to track your location continuously.
  - `clearWatch` is like switching it off once tracking is no longer required.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why should you use clearWatch in applications?  
A1: To stop unnecessary location tracking and conserve battery, network, and system resources.

Q2: Can you clear multiple watchers?  
A2: Yes, each `watchPosition` returns a unique ID. Call `clearWatch` for each ID individually.

Q3: What happens if you call clearWatch with an invalid ID?  
A3: Nothing happens; the method safely ignores invalid IDs.

Q4: Is clearWatch synchronous or asynchronous?  
A4: It is **synchronous**; it stops the watcher immediately.
*/
