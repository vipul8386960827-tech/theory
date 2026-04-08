/*
  STRATEGY: HANDLING "PERMANENTLY BLOCKED" LOCATION (WEB)
  ------------------------------------------------------
  
  1. DETECT THE "DENIED" STATE
     - Use the Permissions API: `navigator.permissions.query({ name: 'geolocation' })`.
     - If the state is 'denied', do not attempt to call `getCurrentPosition()`; 
       it will trigger an error immediately without showing a popup.

  2. THE "SOFT-FAIL" UI (Don't Panic)
     - Instead of an error message, show a "Manual Entry" UI by default.
     - Replace the "Detect My Location" button with a search bar 
       (Google Places Autocomplete) so the user can type their area/city.

  3. EDUCATIONAL OVERLAY (The "How to Fix" Guide)
     - If the user explicitly clicks a "Locate Me" button while in a 'denied' state, 
       show a small tooltip or modal explaining WHY it failed.
     - Use visual cues (icons) to show them where the "Lock" icon is in the 
       browser address bar to reset permissions. 
       *Note: You cannot open these settings via code for security reasons.*

  4. FALLBACK TO IP-BASED LOCATION
     - If the browser API is blocked, use a third-party IP Geolocation service 
       (like Cloudflare, IPStack, or Google's Geolocation API via server-side).
     - This won't give you "Street Level" accuracy, but it can at least center 
       the map on their City/Zip Code so they don't start at a random 0,0 coordinate.

  5. THE "GUEST" PERSISTENCE
     - Once the user manually types an address or drags the map to their house, 
       save those coordinates in `localStorage`.
     - On the next visit, bypass the permission check entirely and load the 
       saved coordinates. This treats the "Manual Choice" as the source of truth.

  6. PROGRESSIVE DISCLOSURE
     - Only ask for location when it's functionally necessary (e.g., at the 
       "Find Restaurants" step), not on the landing page. Users are more 
       likely to click "Allow" if they understand the immediate benefit.
*/
