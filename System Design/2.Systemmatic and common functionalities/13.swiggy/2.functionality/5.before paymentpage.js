/*
  PAYMENT PAGE FLOW & COUPON HANDLING (Worker-Synced Version)
  -----------------------------------------------------------

  1. USER REACHES PAYMENT PAGE
     - Frontend shows cart summary:
         * Items, quantities, and subtotal are retrieved from **IndexedDB** for instant rendering.
         * Taxes and delivery charges are fetched via a summary API to ensure server alignment.
         * Total amount is calculated by the backend to ensure 100% accuracy.

  2. APPLYING A COUPON
     - User enters a coupon code.
     - Frontend sends the **coupon code and identifiers** to the backend. Since the Service Worker 
       already synced the cart, we don't need to resend the item list:
        POST /api/cart/apply-coupon
        Body: { userId, restaurantId, couponCode: "FIRST50" }

  3. BACKEND VALIDATION & TOTAL RECALCULATION
     - Backend pulls the user's current cart from its own database (Source of Truth).
     - Backend validates coupon:
         * Expiry, user eligibility, and minimum order value.
         * Applicability to the specific items currently in the synced cart.
     - Backend returns updated totals, discount amount, and tax breakdown.

  4. FRONTEND UPDATE
     - Display new totals immediately based on the backend response.
     - The **SharedWorker** broadcasts the "Coupon Applied" state to all other open tabs.
     - UX provides clear feedback on the discount value or rejection reason.

  5. FINAL CHECKOUT
     - User confirms payment.
     - Frontend sends the **Checkout Intent** to the backend. We avoid sending totals 
       or items from the client to prevent price tampering:
        POST /api/order
        Body: { userId, restaurantId, couponCode, addressId, location: { lat, lng } }
     - Backend revalidates the entire state one last time (inventory, prices, coupon).
     - Order record is created and the Payment SDK (Razorpay, Stripe, etc.) is triggered.
     - On success: Service Worker clears the IndexedDB cart.
     - On failure: Cart is preserved in IndexedDB for a retry.

  6. KEY PRINCIPLES
     - **Minimize Payloads**: Leverage the backend-synced cart state for all adjustments.
     - **Security First**: The Backend is the absolute source of truth for totals; ignore client-side math.
     - **Thread Efficiency**: Keep the main thread free by letting workers handle data and network logic.
     - **Atomic Transitions**: Coupons and payments are validated against a locked server-side state.

  INTERVIEW-FRIENDLY PHRASE:
  "At the payment page, we leverage the backend-synced state to apply coupons without resending 
   the full cart. The backend validates the code against the 'Source of Truth' in its database 
   and returns the recalculated totals. For final checkout, we send an intent signal rather than 
   client-side totals, ensuring the backend performs the final secure calculation before 
   initiating the payment gateway."
*/
