/*
  WHAT TO DO AFTER GETTING LAT/LNG
  --------------------------------
  
  1. SEND TO BACKEND
     - Once we have the selected latitude and longitude from the map or geolocation,
       send these coordinates to the backend via an API request.
     - Example: GET /api/restaurants?lat=12.9716&lng=77.5946

  2. BACKEND USES COORDINATES TO FIND NEARBY DATA
     - Backend performs a geospatial query to find restaurants near the given lat/lng:
         * Uses spatial queries (PostGIS, MongoDB Geo queries, etc.)
         * Filters by radius (e.g., 5 km from selected location)
     - Can also consider other factors like ratings, availability, or cuisine type.

  3. RETURN RESULTS TO FRONTEND
     - Backend returns a list of restaurants with:
         * Name, address, rating, distance, image, etc.
     - Optionally, include their lat/lng to show pins on a map.

  4. FRONTEND RENDERING
     - Display restaurant list/cards or map pins based on returned data.
     - Optionally, update the list dynamically if the user moves the map.

  5. UX CONSIDERATIONS
     - Show a loading state while fetching nearby restaurants.
     - Handle fallback if no restaurants are found in that area.
     - Cache results for popular locations for faster subsequent loads.

  INTERVIEW-FRIENDLY PHRASE:
  "After obtaining the user’s latitude and longitude, we send it to the backend,
   which queries the database for restaurants within a radius and returns them
   to the frontend for display. This allows users to see nearby restaurants
   dynamically based on their selected location."
*/
