/*
Frontend initializes the payment SDK using the order data received from backend.
This usually includes:
- public_key
- gateway_order_id
- amount
- currency

The SDK loads the payment checkout UI.
This UI is usually rendered as a secure iframe or modal overlay on top of the website.

The SDK uses the public_key and order_id to communicate with the payment
gateway servers and fetch payment configuration for this transaction.

The gateway verifies that the order exists and that the request is valid.

The SDK then loads available payment methods such as:
- UPI
- Card
- Netbanking
- Wallets

The checkout UI is displayed to the user within the page as a popup/modal.

The user selects a payment method and enters payment details.

Sensitive payment data like card number or UPI details are entered
directly inside the secure gateway-controlled iframe, so the merchant
frontend never has access to this data.

Once the user confirms payment, the SDK sends the payment information
securely to the payment gateway servers for processing.
*/
