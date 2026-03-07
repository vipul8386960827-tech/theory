/****************************************************************************************
TRUECALLER LOGIN / VERIFICATION FLOW FOR A WEB APPLICATION
(Frontend + Interaction with Mobile Truecaller App)

NOTE:
- Truecaller verification for web works ONLY on MOBILE BROWSERS (mainly Android).
- It relies on the Truecaller mobile app installed on the device.
- The web page triggers a deep link which opens the Truecaller app.
- After user approval, Truecaller sends an access token to the backend callback URL. 
- The frontend then fetches the verification result from the backend.
****************************************************************************************/


/****************************************************************************************
STEP 1 — DEVELOPER REGISTERS APP WITH TRUECALLER
****************************************************************************************/

// Developer goes to Truecaller developer portal
// https://developer.truecaller.com

// Create a new application with:
// - App name
// - Domain (your website)
// - Callback URL (backend endpoint)

// After registration you receive:
// - partnerKey (appKey)
// - configured callback URL

// The callback URL is IMPORTANT because Truecaller sends the accessToken there.
// The request is sent as a POST request to your backend. :contentReference[oaicite:0]{index=0}



/****************************************************************************************
STEP 2 — USER CLICKS "LOGIN WITH TRUECALLER"
****************************************************************************************/

// On the frontend login page you show a button:
//
//  [ Login with Truecaller ]
//
// When user clicks this button you trigger a Truecaller DEEP LINK.



/****************************************************************************************
STEP 3 — FRONTEND TRIGGERS TRUECALLER APP USING DEEP LINK
****************************************************************************************/

// Example deep link triggered from JavaScript:

window.location =
"truecallersdk://truesdk/web_verify?" +
"type=btmsheet" +
"&requestNonce=RANDOM_UNIQUE_ID" +
"&partnerKey=YOUR_APP_KEY" +
"&partnerName=YOUR_APP_NAME" +
"&lang=en" +
"&privacyUrl=https://example.com/privacy" +
"&termsUrl=https://example.com/terms" +
"&loginPrefix=Continue" +
"&ctaPrefix=Login" +
"&ttl=10000";


// What happens here:
//
// 1. Browser tries to open the custom URL scheme
// 2. OS detects Truecaller app
// 3. Truecaller app opens with verification UI
//
// If the Truecaller app exists, the page loses focus.
// If it does not exist, nothing happens. :contentReference[oaicite:1]{index=1}



/****************************************************************************************
STEP 4 — FRONTEND DETECTS WHETHER TRUECALLER APP OPENED
****************************************************************************************/

setTimeout(() => {

   if(document.hasFocus()) {
       // Truecaller app NOT installed
       // fallback to OTP login or phone input
   }
   else {
       // Truecaller app opened successfully
       // show loader: "Waiting for verification..."
   }

}, 600);



// If the Truecaller dialog opens, the browser tab loses focus.
// If focus remains, the app likely isn't installed. :contentReference[oaicite:2]{index=2}



/****************************************************************************************
STEP 5 — USER APPROVES VERIFICATION IN TRUECALLER APP
****************************************************************************************/

// In the Truecaller app, user sees:
//
//  "Share your profile with <Your App Name> ?"
//
// Profile may include:
//
// - Phone number
// - Name
// - Profile photo
// - Country code
//
// User taps "Continue".



/****************************************************************************************
STEP 6 — TRUECALLER BACKEND SENDS CALLBACK TO YOUR SERVER
****************************************************************************************/

// Once user approves verification:
//
// Truecaller sends POST request to your backend callback URL:
//
// POST https://your-backend.com/truecaller/callback


//-------------------------------------------
// {
//   requestId: "RANDOM_UNIQUE_ID",
//   accessToken: "TRUECALLER_ACCESS_TOKEN",
// }
//-------------------------------------------

// Important points:
//
// - requestId matches requestNonce from frontend
// - accessToken has short TTL (~10 minutes) :contentReference[oaicite:3]{index=3}



/****************************************************************************************
STEP 7 — BACKEND FETCHES USER PROFILE FROM TRUECALLER
****************************************************************************************/

// Backend uses the accessToken to call Truecaller profile API.
//
// Response may include:
//
// {
//   phoneNumber: "+919876543210",
//   firstName: "Rahul",
//   lastName: "Sharma",
//   gender: "male",
//   countryCode: "IN",
//   profilePicture: "https://..."
// }



/****************************************************************************************
STEP 8 — FRONTEND WAITS FOR BACKEND VERIFICATION RESULT
****************************************************************************************/

// Because Truecaller sends the token to the backend,
// the frontend does not receive it directly.

// So frontend must wait for backend confirmation.

// Common approaches:
//
// 1. Polling
// 2. Long polling
// 3. WebSocket

// Example polling:

setInterval(async () => {

   const response = await fetch("/api/truecaller-status?requestId=RANDOM_UNIQUE_ID");

   const data = await response.json();

   if(data.verified){
       // login successful
       // create session / redirect to dashboard
   }

}, 3000);


// Polling every few seconds is recommended until backend receives the profile data. :contentReference[oaicite:4]{index=4}



/****************************************************************************************
FINAL COMPLETE FLOW (INTERVIEW SUMMARY)
****************************************************************************************/

// 1. User clicks "Login with Truecaller"
// 2. Frontend triggers deep link
// 3. Truecaller mobile app opens
// 4. User approves profile sharing
// 5. Truecaller sends accessToken to backend callback
// 6. Backend fetches user profile from Truecaller
// 7. Frontend polls backend for verification result
// 8. Backend confirms login and creates session



/****************************************************************************************
KEY IMPORTANT POINTS FOR INTERVIEW
****************************************************************************************/

// 1. Web app DOES NOT directly verify the user.
//    Verification happens through the Truecaller mobile app.

// 2. Web frontend only triggers a DEEP LINK.

// 3. SDK is NOT mandatory for mobile web.
//    It can work using deep link invocation.

// 4. Verification works mainly on Android browsers.

// 5. Security:
//    Frontend never trusts the verification.
//    Backend validates accessToken with Truecaller.

/****************************************************************************************
USING SERVER SENT EVENTS (SSE) FOR TRUECALLER WEB VERIFICATION FLOW
****************************************************************************************/

/*
Problem with polling:

Frontend keeps asking backend every few seconds:

   "Is verification done?"
   "Is verification done?"
   "Is verification done?"

Example polling:

setInterval(() => {
   fetch("/verification-status?id=123")
}, 3000)

Problems:
- unnecessary network calls
- latency
- backend load
- inefficient
*/


/****************************************************************************************
SSE SOLUTION
****************************************************************************************/

/*
Instead of polling, we open a persistent HTTP connection from frontend to backend.

Backend will PUSH the verification result when it receives callback from Truecaller.

This is called Server Sent Events (SSE).
*/


/****************************************************************************************
STEP 1 — USER CLICKS LOGIN WITH TRUECALLER
****************************************************************************************/

/*
Frontend generates a requestId / nonce.

Example:
requestId = "abc123"

This requestId will be used for:

1. Truecaller verification
2. Backend callback
3. SSE channel
*/


/****************************************************************************************
STEP 2 — FRONTEND OPENS SSE CONNECTION
****************************************************************************************/

const eventSource = new EventSource("/verification-stream?requestId=abc123");

eventSource.onmessage = (event) => {

   const data = JSON.parse(event.data);

   if(data.status === "VERIFIED") {

      // verification completed
      // user profile received by backend

      console.log(data.user);

      eventSource.close();

   }
};


/*
Now frontend is listening continuously.

Connection stays open.
No polling required.
*/


/****************************************************************************************
STEP 3 — FRONTEND TRIGGERS TRUECALLER APP
****************************************************************************************/

/*
Frontend opens deep link:

window.location =
"truecallersdk://truesdk/web_verify?requestNonce=abc123&partnerKey=APP_KEY"

Truecaller app opens.

User approves profile sharing.
*/


/****************************************************************************************
STEP 4 — TRUECALLER CALLBACK TO BACKEND
****************************************************************************************/

/*
Truecaller sends request to backend callback URL:

POST /truecaller/callback

{
   requestId: "abc123",
   accessToken: "TOKEN"
}

Backend then verifies the token with Truecaller servers
and fetches the user profile.
*/


/****************************************************************************************
STEP 5 — BACKEND PUSHES EVENT TO FRONTEND (SSE)
****************************************************************************************/

/*
Backend already has SSE connection open for requestId=abc123.

When verification completes, backend pushes message:

data: {
   "status": "VERIFIED",
   "user": {
       "phone": "+919876543210",
       "name": "Rahul Sharma"
   }
}

Frontend immediately receives it.
*/


/****************************************************************************************
STEP 6 — FRONTEND LOGS USER IN
****************************************************************************************/

/*
Once SSE event arrives:

- frontend stores session / cookie
- redirect to dashboard
*/


/****************************************************************************************
FINAL FLOW SUMMARY
****************************************************************************************/

/*
1. User clicks Login with Truecaller
2. Frontend opens SSE connection to backend
3. Frontend triggers Truecaller deep link
4. Truecaller app asks user for permission
5. User approves
6. Truecaller calls backend callback
7. Backend verifies token and fetches user profile
8. Backend pushes verification event through SSE
9. Frontend receives event and logs user in
*/


/****************************************************************************************
WHY SSE IS BETTER HERE
****************************************************************************************/

/*
Advantages:

1. No polling
2. Real-time verification response
3. Lower server load
4. Simple implementation
5. Works well for one-way updates

SSE is perfect here because:

Frontend only needs to RECEIVE the result.
No need for bi-directional communication like WebSockets.
*/