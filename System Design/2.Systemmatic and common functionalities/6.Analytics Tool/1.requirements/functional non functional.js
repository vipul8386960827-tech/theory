/*
===============================
FUNCTIONAL REQUIREMENTS
===============================

1. Capture user interaction events
   (We listen to click events at document level and extract data-action, page info, timestamp, etc.)

2. Send events to background processor
   (Events are sent to a SharedWorker so processing is centralized across tabs.)

3. Batch events before API call
   (We accumulate events in memory instead of sending per click to reduce network overhead.)

4. Auto flush on batch size limit
   (If batch size reaches threshold, we immediately send to backend.)

5. Periodic flush via timer
   (Even if batch size isn’t reached, we send events after a time interval.)

6. Retry failed API calls
   (If backend fails, we retry up to a fixed number of times.)

7. Exponential backoff
   (Each retry increases delay to avoid overwhelming backend.)

8. Persist failed events locally
   (After max retries, we store events in IndexedDB to prevent data loss.)

9. Replay stored events before new ones
   (On next flush, we send stored failed events first to maintain eventual consistency.)

10. Multi-tab support
    (Using SharedWorker ensures all tabs share one analytics processor.)

11. Force flush on exit/online
    (We trigger flush when tab hides or network reconnects to reduce event loss.)
*/

/*
===============================
NON-FUNCTIONAL REQUIREMENTS
===============================

1. Reliability
   (System should not lose events during temporary failures.)

2. Performance
   (Reduce API calls and avoid blocking main thread.)

3. Scalability
   (Handle multiple tabs efficiently without duplicate processing.)

4. Fault Tolerance
   (Gracefully handle backend failures using retry + persistence.)

5. Eventual Consistency
   (Events may be delayed but must eventually reach backend.)

6. Durability
   (Events should survive reloads or temporary crashes via IndexedDB.)

7. Controlled Resource Usage
   (Prevent unbounded memory or storage growth.)
*/
