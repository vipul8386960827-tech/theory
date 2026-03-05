/**
 * ARCHITECTURAL EXPLANATION: SERVER-SIDE DEVICE IDENTIFICATION
 * * 1. THE SOURCE OF TRUTH (The HTTP Header)
 * - The browser/app automatically attaches the 'User-Agent' string to every request.
 * - This happens during the very first visit (SSR) and during the Auth API call.
 * - Why: We don't need the client to "tell" us; the server reads it from the "envelope."
 * * 2. DETECTION LOGIC (The Server-Side Parser)
 * - The server (or Edge Middleware) runs a parsing logic on the incoming string.
 * - DIFFERENTIATING ANDROID TV VS. MOBILE:
 * - Both say "Android," but the server looks for the "Mobile" token.
 * - Android Mobile: String contains "Android" AND "Mobile".
 * - Android TV: String contains "Android" but OMIT "Mobile" (often includes "Large Screen" or "TV").
 * * 3. THE "DEVICE CONTRACT" (The Auth Response)
 * - Instead of a generic "Login Successful," the server sends a tailored configuration.
 * - This is the "Server-Driven UI" approach. 
 * - The response JSON includes a 'device_metadata' object that dictates frontend behavior.
 * * 4. SYSTEM IMPACT (The "Senior" Reasoning)
 * - PERFORMANCE: The server sends back URLs for 4K assets for TV, and 720p for Mobile.
 * - CODE SPLITTING: The Frontend reads the 'device_type' from the Auth response.
 * - If "TV": It dynamically loads the 'Spatial Navigation' module (D-Pad).
 * - If "MOBILE": It dynamically loads 'Touch/Gesture' modules.
 * - Result: We don't ship "dead code" (like touch logic) to a TV, saving memory.
 * * 5. RESILIENCE (The Fallback)
 * - If the User-Agent is spoofed or unclear, the server provides a "Safe Default."
 * - Once the JS boots, "Feature Detection" (e.g., checking if 'ontouchstart' exists)
 * acts as a final check to confirm the device's physical capabilities.
 */