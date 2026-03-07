/*
Frontend asks backend for order.

Backend creates a payment order with the gateway 
(for example using Razorpay or Juspay).

Gateway returns a gateway_order_id to the backend.

Backend sends the required order details back to the frontend:
- gateway_order_id
- amount
- currency
- public_key

Frontend stores these details and prepares to initialize
the payment SDK checkout in the next step.
*/
