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
async function otpVerification(otpCode, userPhoneOrEmail) {
  // This still calls the server API under the hood
  const res = await fetch("/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      otp: otpCode,
      identifier: userPhoneOrEmail,
    }),
    credentials: "include", // ensures HttpOnly cookies are set
  });

  return await res.json(); // returns { success: true } or error
}

// Client function that reads OTP automatically and calls the helper
async function autoReadAndSendOtp(userPhoneOrEmail) {
  if ("OTPCredential" in window) {
    try {
      // 1. Client reads OTP automatically
      const otp = await navigator.credentials.get({
        otp: { transport: ["sms"] },
      });
      console.log("OTP received:", otp.code);

      // 2. Call the helper function that wraps server API
      const data = await otpVerification(otp.code, userPhoneOrEmail);
      console.log("Server validation result:", data);
    } catch (err) {
      console.error("OTP auto-read failed:", err);
    }
  } else {
    console.warn("Web OTP API not supported in this browser.");
  }
}
