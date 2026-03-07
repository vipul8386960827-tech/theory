/*
  PAYMENT PAGE FLOW WITH RAZORPAY/JUSPAY
  --------------------------------------

  1. USER INITIATES PAYMENT
     - On the payment page, user clicks "Pay" button.
     - Frontend triggers the payment SDK (Razorpay or Juspay) with:
         * Amount: fetched from backend (final total including discounts, taxes, delivery)
         * Backend-generated order ID
         * Customer info: name, email, phone
         * Optional: theme, notes, callback URLs

  2. BACKEND PREPARATION
     - Backend creates an order in the payment gateway:
         * Sends order details (amount, order ID, currency) to gateway API
         * Receives gateway-generated payment/order ID
         * Saves backend order status as "pending"
     - Backend sends gateway order ID + amount to frontend SDK

  3. PAYMENT PROCESS
     - SDK opens a secure modal (Razorpay) or iframe/native flow (Juspay)
     - User enters payment details: card, UPI, netbanking
     - SDK communicates directly with gateway servers
     - On completion, SDK triggers success/failure callback

  4. PAYMENT CALLBACK & VERIFICATION
     - Frontend receives callback from SDK:
         * Success → payment ID, status, signature returned
         * Failure → error info
     - Frontend sends payment info to backend for verification:
         POST /api/payment/verify
         Body: { orderId, paymentId, signature }
     - Backend verifies:
         * Signature (Razorpay) / authenticity (Juspay)
         * Amount matches order
         * Updates order status:
             - 'paid' → success
             - 'failed' → failure

  5. FRONTEND UI UPDATE
     - Payment success → show "Order Confirmed"
     - Payment failure → show error and allow retry
     - Optional: handle pending/expired orders if user closes modal

  6. BEST PRACTICES
     - **Do not trust frontend amount or LocalStorage**; always use backend-calculated total
     - Always verify payment on backend to prevent tampering
     - Backend order status should remain 'pending' until verification
     - Retry/fallback mechanisms for incomplete payments

  INTERVIEW-FRIENDLY PHRASE:
  "At the payment page, the frontend triggers Razorpay or Juspay SDK using a backend-generated
   order ID and the final total. The SDK handles secure payment input and returns a payment
   ID and status. Frontend sends this info to backend, which verifies the signature and
   confirms the order status. Backend is always the source of truth to prevent tampering
   and ensure accurate order processing."
*/