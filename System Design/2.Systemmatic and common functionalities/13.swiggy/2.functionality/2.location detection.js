/*
  WEB LOCATION STRATEGY (Browser Focus)
  ------------------------------------
  1. HTTPS IS REQUIRED
  - Browsers block location access on non-secure sites.
  - If your site isn’t HTTPS, `navigator.geolocation` won't work.
 
  2. CHECK PERMISSIONS BEFORE ASKING
  - Don't show the "Allow Location" popup right away — users find it annoying.
  - Use the Permissions API to check status silently.
    - If 'prompt': show a "Find nearby restaurants" button first (user action triggers popup)
    - If 'denied': skip the popup and show a manual address input instead
 
  3. HANDLING BLOCKED LOCATION
  - If a user clicks "Block", you can’t reopen the popup via JS.
  - Show a "Permission Denied" message.
  - Guide users to the browser’s lock icon to reset location permissions.
 
  4. SPEED / TIMEOUT STRATEGY
  - Set a timeout (e.g., 5 seconds) when calling the browser geolocation API.
  - If location isn’t returned within the timeout, redirect the user to a manual address input.
  - Optionally show a temporary message like “Loading nearby restaurants…” while waiting.

  5. SAVE LOCATION FOR NEXT TIME
  - Web users might be guests, unlike apps.
  - Store selected location in localStorage.
  - Next visit: load restaurants for saved location and only re-check if user clicks "Detect Current Location."
 
  6. LOCATION ACCURACY
  - Desktops often use WiFi/IP, not GPS, so location can be off by blocks.
  - Always let users adjust on map or edit their address manually.
*/

/*
  INTERVIEW THEORY: THE "CENTER-PIN" MAP PATTERN
  ----------------------------------------------
  
  1. UX RATIONALE: "PIN VS. MAP" MOVEMENT
     - Conventional UX: Dragging a tiny pin on a large screen is difficult for users.
     - Better UX: Keep the pin static at the center (viewport) and move the map 
       behind it. This utilizes the larger "touch/drag area" of the map, making 
       location selection much more precise and ergonomic.

  2. STATE SYNCHRONIZATION (The "Single Source of Truth")
     - Instead of tracking the pin's position, we track the Map's Center.
     - Theory: The 'Selected Location' = Map.getCenter().
     - Implementation: We use the 'onIdle' (or 'onDragEnd') event to sync the 
       internal React state with the Google Maps instance.

  3. LAYER ARCHITECTURE (CSS Positioning)
     - The Map is the "Bottom Layer" (relative container).
     - The Pin is the "Floating Layer" (absolute positioning).
     - CRITICAL DETAIL: `pointer-events: none` on the pin. Without this, the pin 
       acts as a physical barrier that blocks the mouse/touch from grabbing 
       the map. This CSS property allows the "grab" to pass through the pin.

  4. THE "REVERSE GEOCODING" TRIGGER
     - Once the map stops (onIdle), the coordinates (Lat/Lng) are "Rough".
     - Theoretical Flow: Coordinates -> Reverse Geocoding API -> Human Readable Address.
     - We show this address to the user in real-time so they can verify the 
       pin is exactly on their building.

  5. PERFORMANCE & OPTIMIZATION (The "Senior" Angle)
     - Debouncing: Don't call APIs on every single pixel move. Wait for the 
       map to settle (Idle state).
     - Initial State: If Geolocation is blocked, we default to a "City Center" 
       or the last saved location from `localStorage` to avoid showing a 
       blank map or 0,0 (Null Island).

  6. ERROR BOUNDARIES & FALLBACKS
     - HTTPS requirement for Geolocation.
     - Handling 'Permission Denied' by switching to a Manual Search fallback.
     - Map Load Failures: Providing a non-map text input as a graceful degradation.
*/
import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

/*
  Center-Pin Map Component (React + Google Maps)
  ---------------------------------------------
  This component shows a map with a stationary pin at the center.
  Users drag the map to choose a location, and the selected coordinates
  are always the map's center. Ideal for food delivery or location picker UX.
*/

const mapContainerStyle = {
  width: "100%", // Map fills parent width
  height: "400px", // Fixed height for visibility
};

const center = { lat: 12.9716, lng: 77.5946 }; // Initial center, e.g., Bengaluru

export default function CenterPinMap() {
  // Load the Google Maps API asynchronously
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your Google Maps API key
  });

  const mapRef = useRef(); // Store map instance for later access
  const [selectedLocation, setSelectedLocation] = useState(center); // Track selected lat/lng

  // Show loading or error messages if API fails or hasn't loaded
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    // Container must be relative so the pin image can be absolutely positioned
    <div style={{ position: "relative" }}>
      {/* Google Map Component */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onLoad={(map) => (mapRef.current = map)}
        onDragEnd={() => {
          const newCenter = mapRef.current.getCenter();
          setSelectedLocation({
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          });
        }}
        options={{
          clickableIcons: false, // disable POI clicks
          disableDefaultUI: true, // optional: clean map UI
        }}
      />

      {/* Stationary Pin */}
      <img
        src="/pin.png" // Pin image
        alt="pin"
        style={{
          position: "absolute", // Pin is positioned over map container
          top: "50%", // Vertical center
          left: "50%", // Horizontal center
          transform: "translate(-50%, -100%)", // Shift pin tip to center
          pointerEvents: "none", // Allow map drag through pin
          zIndex: 10, // Make sure pin is above map
          width: "40px", // Pin width
          height: "40px", // Pin height
        }}
      />

      {/* Confirm Location Button */}
      <button
        onClick={() => {
          // Log selected coordinates when user confirms
          console.log("Selected Location:", selectedLocation);
          alert(
            `Selected Location: Lat ${selectedLocation.lat}, Lng ${selectedLocation.lng}`,
          );
        }}
        style={{ marginTop: "10px" }} // Simple styling
      >
        Confirm Location
      </button>
    </div>
  );
}

/*
  How it works:
  -------------
  1. Pin stays visually fixed in the center of the map container.
  2. User drags/pans the map to move location under the pin.
  3. onDragEnd updates the state with map.getCenter() coordinates.
  4. On "Confirm Location", selectedLocation state is used.
  5. This pattern improves UX vs dragging a pin manually.
*/
