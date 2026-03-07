import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

/*
  Map Container Styling
  -------------------
  Width and height define the visible map size.
*/
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

/*
  Delivery location (receiver's address)
  -------------------------------------
  This marker is static; it represents where the order will be delivered.
*/
const deliveryLocation = { lat: 12.9716, lng: 77.5946 };

/*
  Duration of smooth animation for marker movement in milliseconds
*/
const ANIMATION_DURATION = 1000; // 1 second

export default function LiveOrderTrackingMap() {
  /*
    Load Google Maps API asynchronously using @react-google-maps/api hook
  */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // replace with your API key
  });

  /*
    mapRef: Holds reference to Google Map instance, useful for panning, zooming, or future manipulation
  */
  const mapRef = useRef();

  /*
    targetLocation: Latest location received from SSE (rider's new coordinate)
    riderLocation: Current rendered marker position (used for smooth animation)
    riderPath: Array of all points the rider has traversed (for Polyline)
  */
  const [targetLocation, setTargetLocation] = useState(null);
  const [riderLocation, setRiderLocation] = useState(null);
  const [riderPath, setRiderPath] = useState([]);

  /*
    animationRef: Stores requestAnimationFrame ID for cleanup
  */
  const animationRef = useRef();

  /*
    Helper function: Linear interpolation between two numbers
    Used to calculate intermediate latitude and longitude for smooth animation
  */
  const lerp = (start, end, t) => start + (end - start) * t;

  /*
    Animate the rider marker smoothly from current location to target location
  */
  useEffect(() => {
    // If we don’t have both positions, nothing to animate
    if (!riderLocation || !targetLocation) return;

    let startTime; // timestamp when animation starts

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - startTime) / ANIMATION_DURATION,
        1,
      ); // progress from 0 → 1

      // Interpolate latitude and longitude
      const lat = lerp(riderLocation.lat, targetLocation.lat, progress);
      const lng = lerp(riderLocation.lng, targetLocation.lng, progress);

      // Update marker's current position
      setRiderLocation({ lat, lng });

      if (progress < 1) {
        // Continue animation until progress reaches 1
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete: append final position to riderPath for Polyline
        setRiderPath((prev) => [...prev, targetLocation]);
      }
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount or when targetLocation changes
    return () => cancelAnimationFrame(animationRef.current);
  }, [targetLocation]);

  /*
    SSE Connection: Receive rider's real-time location from backend
    Each SSE message is expected to be a JSON like: { "lat": 12.9721, "lng": 77.5950 }
  */
  useEffect(() => {
    if (!isLoaded) return;

    const sse = new EventSource(
      "https://your-backend.com/api/orders/123/track",
    );

    sse.onmessage = (event) => {
      const { lat, lng } = JSON.parse(event.data);

      // First location: initialize riderLocation and riderPath
      if (!riderLocation) {
        setRiderLocation({ lat, lng });
        setRiderPath([{ lat, lng }]);
      } else {
        // Update targetLocation → triggers animation useEffect
        setTargetLocation({ lat, lng });
      }
    };

    // Handle SSE errors
    sse.onerror = () => {
      console.error("SSE connection failed. Attempting to reconnect...");
      sse.close();
      // Optional: implement reconnection logic here
    };

    // Cleanup SSE connection when component unmounts
    return () => sse.close();
  }, [isLoaded, riderLocation]);

  // Handle loading and error states for Google Maps
  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle} // Map size
      zoom={14} // Zoom level
      center={deliveryLocation} // Center map at receiver
      onLoad={(map) => (mapRef.current = map)} // Store map instance
    >
      {/* Static Delivery Marker */}
      <Marker position={deliveryLocation} label="Delivery Here" />

      {/* Dynamic Rider Marker */}
      {riderLocation && (
        <Marker
          position={riderLocation} // Current animated position
          icon="/bike.png" // Optional: custom rider icon
        />
      )}

      {/* Rider Path Polyline */}
      {riderPath.length > 1 && (
        <Polyline
          path={riderPath} // Coordinates forming the path
          options={{
            strokeColor: "#FF0000", // red line
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      )}
    </GoogleMap>
  );
}
