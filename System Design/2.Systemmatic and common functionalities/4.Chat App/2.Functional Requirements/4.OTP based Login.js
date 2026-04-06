/*
OTP-Based Authentication with Automatic OTP Reading

1. User enters their phone number (or email) in the login form on the mobile app.

2. Mobile client sends the phone/email to the server via HTTPS API.

3. Server generates a One-Time Password (OTP):
   - Random numeric/alphanumeric code (e.g., 6 digits).
   - Short-lived (e.g., 5 minutes) and stored server-side (Redis or database) with expiration.
   - Marked as unused initially.

4. Server sends the OTP to the user:
   - SMS for phone numbers or email for email login.
   - SMS may include a **special format or domain to allow automatic reading by the app** (e.g., Android SMS Retriever API or iOS AutoFill).

5. Mobile app automatically reads the OTP:
   - Using platform APIs (Android SMS Retriever, iOS one-time code autofill).
   - The OTP is never manually typed by the user.

6. Mobile app calls the server API automatically with the OTP:
   - HTTPS request including phone/email + OTP.

7. Server validates the OTP:
   - Checks that the OTP exists, matches the user, is unexpired, and unused.
   - Marks the OTP as used to prevent replay attacks.

8. Upon successful validation:
   - Server generates a session token (or JWT).
   - Sets an **HttpOnly, Secure, SameSite cookie** in the response if using cookies.
   - Mobile client is now authenticated without any manual input.

9. Mobile client can now access protected routes (e.g., chat) automatically:
   - Future API calls include the session cookie automatically.
   - User is logged in instantly after OTP verification.

Key Security Points:
- OTP is single-use and short-lived.
- Server-side validation ensures security.
- HttpOnly cookies prevent session tokens from being exposed to JS.
- Automatic reading uses secure platform APIs, preventing user input errors.
- All communication over HTTPS prevents interception.
*/
// app/actions/verifyOtp.js (server action)

//otp cannot be read on the server so there will be two functions one will be basically
//on the client side which will read the otp and as soon as the otp it gets
//we can call the server action which can validate this otp and give us tokens and all
//and than we can basically store those on the http only cookies
// client.js
// client.js
// client.js

// Client helper function to "call" server-side OTP verification
// Helper: verify OTP via backend
async function otpVerification(otpCode, userPhoneOrEmail) {
  const res = await fetch("/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      otp: otpCode,
      identifier: userPhoneOrEmail,
    }),
    credentials: "include",
  });

  return await res.json();
}


// Main: auto-read + send OTP
async function autoReadAndSendOtp(userPhoneOrEmail) {
  if (!("OTPCredential" in window)) {
    console.warn("Web OTP API not supported in this browser.");
    return;
  }

  // 1. Create AbortController
  const controller = new AbortController();

  // 2. Set timeout (e.g., 60 sec)
  const timeoutId = setTimeout(() => {
    console.log("OTP listening timed out");
    controller.abort();
  }, 60000);

  try {
    console.log("Listening for OTP...");

    // 3. Start listening with abort signal
    const otp = await navigator.credentials.get({
      otp: { transport: ["sms"] },
      signal: controller.signal,
    });

    // If aborted, this won't run
    if (!otp) return;

    console.log("OTP received:", otp.code);

    // 4. Verify OTP via backend
    const data = await otpVerification(otp.code, userPhoneOrEmail);
    console.log("Server validation result:", data);

  } catch (err) {
    if (err.name === "AbortError") {
      console.log("OTP listening aborted");
    } else {
      console.error("OTP auto-read failed:", err);
    }
  } finally {
    // 5. Cleanup timeout
    clearTimeout(timeoutId);
  }
}

/*
========================================
WEB OTP AUTO-READ — THEORY (NO CODE LOGIC)
========================================

1. OTP SMS FORMAT (DOMAIN BINDING)
---------------------------------
- The OTP message sent by the server is NOT just plain text.
- It follows a special format that includes:
  - The OTP code
  - The website's domain
- This creates a secure link between the SMS and the website.
- Example idea:
  "Your OTP is 123456 @example.com #123456"

WHY?
- Prevents malicious websites from reading OTPs meant for other domains.


2. BROWSER INITIATES LISTENING
-----------------------------
- When user is on the OTP screen, the browser requests the OS to listen for an incoming OTP.
- This is NOT permanent access.
- It is:
  - Time-limited (short window)
  - Triggered only when needed (user intent)

IMPORTANT:
- The browser does NOT get access to all SMS messages.
- It only waits for a matching OTP message.


3. OPERATING SYSTEM INTERCEPTION
-------------------------------
- The mobile OS (Android/iOS) receives incoming SMS normally.
- It scans the message for:
  - OTP pattern
  - Matching domain

IF MATCH FOUND:
- OS considers this OTP safe for the requesting website.


4. SECURE HANDOFF TO BROWSER
---------------------------
- The OS extracts ONLY the OTP code.
- Full SMS content is NOT shared.
- The OTP is passed to the browser securely.

IMPORTANT:
- Your web app never sees:
  - User's inbox
  - Other SMS messages
  - Full message content


5. SECURITY CONSTRAINTS
----------------------
- Works only on HTTPS (secure context)
- Mostly supported on mobile browsers (e.g., Chrome Android)
- Requires user interaction (not silent background access)
- Domain in SMS MUST match current website

WHY?
- Prevents phishing and unauthorized OTP access


6. FINAL FLOW SUMMARY
--------------------
User enters phone → Server sends OTP SMS → 
Browser starts listening → 
SMS arrives → OS validates domain → 
OTP extracted → Browser receives OTP → 
App uses it for verification

========================================
KEY IDEA
========================================
Your app is NOT reading SMS.

The OS + Browser act as a secure bridge
that only delivers the OTP IF everything matches.
========================================
*/
