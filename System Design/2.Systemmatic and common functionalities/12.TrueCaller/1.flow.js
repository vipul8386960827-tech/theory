/*
  TRUECALLER SDK AUTHENTICATION FLOW (REFINED)
  -------------------------------------------

  1. User clicks "Login with Truecaller"
     ↓
  2. App invokes Truecaller SDK (Checks for local Truecaller app)
     ↓
  3. Truecaller Overlay/App opens (Consent screen appears)
     ↓
  4. User taps "Continue" (User authorizes profile sharing)
     ↓
  5. Truecaller SDK returns signed response to Frontend 
     (Contains: payload, signature, and signatureAlgorithm)
     ↓
  6. Frontend sends signed payload to Backend
     (Do not extract data on frontend; treat it as an opaque blob)
     ↓
  7. Backend fetches/caches Truecaller Public Key
     (Essential for verifying the sender's authenticity)
     ↓
  8. Backend verifies signature & decrypts payload
     (Ensures the data wasn't tampered with during transit)
     ↓
  9. Backend maps user (Find/Create user in DB via phone number)
     ↓
  10. Backend issues App Session/JWT to Frontend
     ↓
  11. User logged in successfully
*/
