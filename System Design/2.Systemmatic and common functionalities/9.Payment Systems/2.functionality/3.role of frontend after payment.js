/*
User completes payment in the SDK checkout (success, failure, or pending).

The SDK processes the payment with the gateway servers.

If the payment succeeds, the SDK triggers a success callback on the frontend.
The callback usually contains:
- payment_id
- order_id
- signature

Frontend sends this response to the backend for verification.
The frontend must never mark the order as PAID on its own.

Backend verifies the signature using its secret key and confirms
the payment with the gateway.

In parallel, the payment gateway sends a webhook directly to the backend
with the final payment event (for example payment.captured or payment.failed).
This webhook is treated as the source of truth.

Backend updates the order status in the database based on the verified result.

Frontend may poll the backend or receive a response confirming the
final order status (PAID / FAILED / PENDING).

Frontend then updates the UI accordingly:
- show success page or confirmation
- show failure message with retry option
- show pending / processing state if confirmation is delayed

If payment fails, the SDK triggers a failure callback.
Frontend displays an error message and allows the user to retry payment.

If payment is pending or taking too long (common with UPI),
frontend shows a loading / waiting screen and periodically checks
the backend for the updated payment status.

Final UI states handled by frontend:
- Payment Successful
- Payment Failed (retry allowed)
- Payment Processing / Waiting for confirmation
*/
