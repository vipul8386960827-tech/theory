/*
  PAYMENT PAGE FLOW & COUPON HANDLING
  -----------------------------------

  1. USER REACHES PAYMENT PAGE
     - Frontend shows cart summary:
         * Items, quantities, subtotal
         * Taxes and delivery charges
         * Total amount fetched from backend for accuracy

  2. APPLYING A COUPON
     - User enters a coupon code.
     - Frontend must send the **current state of the cart** along with the coupon code to backend:
       POST /api/cart/apply-coupon
       Body:
       {
         userId,
         restaurantId,
         items: [
           { id: 101, quantity: 2 },
           { id: 102, quantity: 1 }
         ],
         couponCode: "FIRST50"
       }

  3. BACKEND VALIDATION & TOTAL RECALCULATION
     - Backend checks coupon validity:
         * Active and not expired
         * User eligibility (first-time, min order, specific restaurant, etc.)
         * Applicability to the current cart items
     - Backend recalculates:
         * Discount based on coupon rules (percentage, fixed amount, free delivery)
         * Subtotal, taxes, delivery charges, and final total
     - Returns updated totals to frontend

  4. FRONTEND UPDATE
     - Display new totals immediately
     - Show discount applied, or invalid coupon error
     - Ensure UX is clear and responsive

  5. FINAL CHECKOUT
     - User confirms payment
     - Frontend sends **full validated cart + applied coupon + final total** to backend:
       POST /api/order
       Body:
       {
         userId,
         restaurantId,
         items: [...],
         couponCode,
         finalTotal,
         location: { lat, lng }
       }
     - Backend revalidates everything (cart items, coupon, totals)
     - Order record created (status: pending)
     - Payment SDK triggered (Razorpay, Stripe, etc.)
     - On success: order confirmed and cart cleared
     - On failure: order failed; cart remains intact

  6. KEY PRINCIPLES
     - **Always send full cart when applying a coupon** for security and correct calculation
     - Backend is the source of truth for totals and discount
     - Frontend handles instant UI feedback; backend handles validation
     - Coupons are applied at last moment before payment to ensure consistency

  INTERVIEW-FRIENDLY PHRASE:
  "At the payment page, the frontend sends the full current cart and coupon code to
   the backend for validation and recalculation of totals. The backend applies coupon
   rules, recalculates subtotal, taxes, delivery charges, and returns updated totals.
   On final checkout, the backend revalidates everything before creating the order
   and triggering the payment SDK, ensuring secure and accurate pricing."
*/
