/* 
    we will write flush function which will be basically responsible for send all queued
    events to the server reliably. We will add a new global variable here isFlushing 
    which will indicate the worker is sending the batch to the server or not. 
    So it will help us that two flushes do not send the overlapping events a t the same time
    and it will also ensures that eventQueue doesn't get emptied twice and will help us to avoid
    duplication or loss of the events. Also it will help us that it will not allow multiple tabs
    to flush together. so if one tab is flushing it will stop other tabs to flush the events to 
    the server

    than we can store events from the batchQueues to new variable memoryEvents .batchQueue is 
    collection of all the events collected since the last flush. and than we will reset this 
    batchQueue so that it can start collecting events for the next batch. This will basically prevent
    double sending of the events if another flush is triggered while this one is in progress.
    It will also ensure that no new events are basically lost.

    than we can store previous events which were saved in the indexDb which basically failed
    in previous flush attempt

    after combining we can basically make a finalCheck on the finalBatch and if its length is 0
    than we can return it there itself and we also make sure that stored events are sent before 
    than the new events

    now we can mark isFlushing = true so that it will act like a lock and prevent another 
    flushing

    We use retryCount to track consecutive flush failures. It powers the exponential backoff in 
    scheduling, preventing repeated failed requests from spamming the server, and is reset after a 
    successful flush so normal intervals resume.

    If the flush fails for any reason, we increment the retry counter for backoff and save the failed 
    batch to IndexedDB. This ensures that all events are retried later and none are lost, making the 
    system fault-tolerant.
    */
const isFlushing = false;
const retryCount = 0;
async function flushBatch() {
  if (isFlushing) return;
  const memoryEvents = [...batchQueues];
  batchQueue = [];
  const storedEvents = await getAndClearBatch();
  const finalBatch = [...storedEvents, ...memoryEvents];

  if (finalBatch.length === 0) return;
  try {
    const response = await fetch("/api/track-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalBatch),
      keepalive: true,
    });
    if (!response.ok) throw new Error("Server Error");
    retryCount = 0;
  } catch (error) {
    retryCount++;
    await saveToDb(finalBatch);
  } finally {
    isFlushing = false;
  }
}
