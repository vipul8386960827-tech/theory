/*
    In the shared worker we will be doing server things 
    we have to define several things
    -sessionId - will help worker instance
    -BATCH_INTERVAL - minimum number of interval between the flushes
    -MAX_INTERVAL - Maximum interval allowed for flush backoff
    -MAX_RETRIES - Max retries attempt for failed network request
    -isFlushing - flag to prevent multiple simultaneous flush
    -batchQueue - queue of events which are waiting to be flushed
    -retryCount - track retries for exponential backoff
    -connectedPorts - set of ports connected to this SharedWorker


This SharedWorker acts as a centralized background processor for analytics events across multiple 
tabs of the same application. It handles the collection, batching, and transmission of events to the 
server, ensuring that user interactions like page views and clicks are reliably tracked. Events are 
temporarily stored in memory and persisted to IndexedDB for consistency in case of network failures. 
The worker manages batch flushing based on size or time intervals, applies exponential backoff and 
retry strategies for failed requests, and enriches each event with metadata such as session ID and 
timestamp. By coordinating multiple tabs through a single SharedWorker instance, it reduces duplicate 
network requests, minimizes memory usage, and ensures smooth and efficient analytics tracking without 
blocking the main thread.
*/

