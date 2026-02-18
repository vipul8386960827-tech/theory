/*
---------- Why we are using a Web Worker for analytics ----------

Analytics processing is not directly related to rendering UI.
The browser main thread is responsible for:
- Rendering components
- Handling user interactions
- Managing layout and painting
If we execute heavy analytics logic on the main thread such as:
- Event batching
- Queue management
- Retry mechanisms
- IndexedDB operations
- Network requests
it can block the event loop and cause UI lag or delayed interactions.
Web Workers allow us to run JavaScript in a separate background thread.
This ensures that analytics processing does not interfere with
UI performance.
By moving analytics logic to a Web Worker:
- The main thread remains free and responsive.
- Heavy computations run in parallel.
- User interactions remain smooth.
- We avoid frame drops and jank.
So the main thread only collects events and forwards them,
while the worker handles processing and communication with the server.
This improves performance, responsiveness, and overall user experience.
*/
