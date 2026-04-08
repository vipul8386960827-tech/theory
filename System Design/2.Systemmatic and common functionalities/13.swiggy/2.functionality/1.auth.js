/**
     OTP LOGIN FLOW (THEORY)

 STEP 1: INITIALIZE (Requesting the OTP)
 1. User enters phone number.
 2. Frontend validates the number (Regex) and calls POST /auth/request-otp.
 3. Backend generates a 4-6 digit code, stores it in Redis (with 5-min TTL),
    and sends it via SMS gateway.
 4. Frontend starts a 'Resend Timer' (60s) to prevent API spamming.

 STEP 2: VERIFICATION (The Handshake)
 1. User enters OTP.
 2. Frontend calls POST /auth/verify-otp.
 3. Backend validates the OTP against Redis.
 4. If valid: Backend generates a JWT (Access + Refresh Token).
 5. Backend sends the tokens back via 'HttpOnly' Cookies (for security).

 STEP 3: SESSION MANAGEMENT (The "Senior" Part)
 1. Frontend updates the Global Auth State (e.g., isAuthenticated: true).
 2. Axios interceptors are initialized to attach the cookie to every request.
 */

/* 
OTP SMS FORMAT (2 LINES TOTAL)

Line 1 (user-visible):
Your verification code is 782104.

Line 2 (must be LAST line, no extra text/spaces after this):
@your-website.com #782104

Your verification code is 782104.
@your-website.com #782104
*/

/**
 * THE THEORY OF PURE FRONTEND OTP READING:
 * 1. The browser uses the WebOTP API to listen for a specific SMS.
 * 2. This works ONLY on HTTPS for security.
 * 3. The OS intercepts the SMS, checks the domain hash/URL, and asks the user for permission.
 * 4. Once permitted, the browser extracts the code and passes it to this script.
 */

async function initAutoOTP() {
  // 1. Feature Detection: Not all browsers support this (mostly Chrome on Android).
  if ("OTPCredential" in window) {
    try {
      // 2. AbortController: Used to cancel the 'listening' state if the user
      // types manually or the session expires.
      const controller = new AbortController();

      // 3. Request the Credential: This is where the magic happens.
      // The browser now sits in a 'waiting' state for an incoming SMS.
      const otp = await navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: controller.signal,
      });

      // 4. Extraction: If the user taps 'Allow' on the system prompt,
      // the 'otp' object contains the 'code' property.
      const otpInput = document.getElementById("otp-field");
      if (otpInput && otp.code) {
        otpInput.value = otp.code; // Auto-fill the input

        // 5. UX: Optionally auto-submit the form so the user does nothing.
        // otpInput.form.submit();
      }
    } catch (err) {
      // Handles cases where the request times out or the user cancels.
      console.error("OTP Read Failed:", err);
    }
  } else {
    console.log("WebOTP API not supported in this browser.");
  }
}

// Call the function when the page/component loads
initAutoOTP();

/**
 * ==========================================================================================
 * THE DIFFERENCE BETWEEN ANDROID (WebOTP API) VS. iOS (Auto-fill)
 * ==========================================================================================
 * * THEORY:
 * While both systems allow OTP auto-filling, they handle the "security-to-browser"
 * handshake differently. Android is more "programmatic," whereas iOS is more
 * "keyboard-driven."
 * * ==========================================================================================
 * 1. ANDROID (THE "ACTIVE" APPROACH)
 * ==========================================================================================
 * - USES: The WebOTP API (navigator.credentials.get).
 * - USER EXPERIENCE: A native bottom-sheet (pop-up) appears automatically.
 * - PERMISSION: User clicks "Allow," and the JavaScript immediately receives the code.
 * - SCRIPT CONTROL: High. The frontend script "listens" for the event and
 * can auto-submit the form without the user touching the keyboard.
 * - SMS FORMAT: Must include the @domain.com #123456 footer.
 * * ==========================================================================================
 * 2. iOS (THE "PASSIVE" APPROACH)
 * ==========================================================================================
 * - USES: The 'one-time-code' autocomplete attribute.
 * - USER EXPERIENCE: The OTP code appears as a suggestion on top of the
 * QuickType keyboard.
 * - PERMISSION: The user MUST tap the code on their keyboard to fill the field.
 * - SCRIPT CONTROL: Low. JavaScript doesn't "receive" the code until the user
 * physically interacts with the keyboard suggestion.
 * - SMS FORMAT: Less strict. iOS looks for keywords like "code" or "OTP"
 * near a number, but it also supports the @domain format (standardized).
 * * ==========================================================================================
 * COMPARISON TABLE:
 * ==========================================================================================
 * FEATURE         | ANDROID (Chrome)           | iOS (Safari)
 * ----------------|----------------------------|---------------------------
 * API Used        | WebOTP API                 | HTML Autocomplete
 * Main Trigger    | JS navigator.credentials   | input autocomplete="one-time-code"
 * User Action     | Taps "Allow" on Popup      | Taps code on Keyboard
 * Auto-Submit     | Possible via JS callback   | Harder (requires 'input' event)
 * Setup Complexity| Requires specific SMS format| Works with most standard SMS
 * ==========================================================================================
 * * THE "UNIFIED" SOLUTION:
 * To support both, you should use the autocomplete="one-time-code" attribute
 * in your HTML (for iOS) AND the JavaScript WebOTP API (for Android).
 * ==========================================================================================
 */
