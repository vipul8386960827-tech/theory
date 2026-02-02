/* 369_push_notifications.js

=====================================================
Push Notifications in Web (JavaScript)
=====================================================

Definition (What I should say in the interview):
- "Push notifications allow web applications to **send messages to users even when the web page is not open**. 
   They are delivered via the **Push API** in combination with a Service Worker, enabling 
   real-time updates, alerts, and engagement with users."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Delivered via **Service Workers**, running in the background.
2. Requires **user permission** to receive notifications.
3. Works even if the web app is **closed or in the background**.
4. Supports **actions**, **icons**, **titles**, **bodies**, and **data payloads**.
5. Can be integrated with **Push API servers** or third-party services like Firebase Cloud Messaging.

-----------------------------------------------------
Basic Example (Requesting Permission & Showing Notification)
-----------------------------------------------------
if ('Notification' in window && 'serviceWorker' in navigator) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Hello!', {
          body: 'This is a push notification',
          icon: '/icon.png',
        });
      });
    }
  });
}

-----------------------------------------------------
Push API Example (Receiving Messages)
-----------------------------------------------------
// service-worker.js
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Default message';
  event.waitUntil(
    self.registration.showNotification('Push Received', {
      body: data,
      icon: '/icon.png',
    })
  );
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Sending real-time updates (news, weather, or stock alerts).
- Engaging users with reminders or promotional messages.
- Background communication in Progressive Web Apps (PWA).
- Enhancing user retention and experience.
- Notifications for chat or messaging applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Push notifications require **user consent**.
2. Must be combined with a **Service Worker** for background delivery.
3. Typically involve a **push server** to send messages to subscribed users.
4. Browser support is extensive but may require HTTPS.
5. Notifications can be customized with **actions, images, and vibration patterns**.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of push notifications like **letters delivered to a mailbox**:
  - Even if the recipient (web page) is closed, the message (notification) is delivered.
  - The Service Worker acts as the **postman**, receiving and showing the message to the user.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can push notifications work without Service Workers?  
A1: No, Service Workers are required to handle notifications when the page is closed.

Q2: How do you request permission for notifications?  
A2: Using `Notification.requestPermission()` in the browser.

Q3: Can push notifications be received when the browser is closed?  
A3: They can be received if the browser supports background service workers; otherwise, only when open.

Q4: How can you send push messages to multiple users?  
A4: By maintaining subscriptions on a server and sending messages via the Push API or third-party services like Firebase Cloud Messaging.
*/
