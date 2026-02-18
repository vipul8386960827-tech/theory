// ================================================
// 1️⃣ IndexedDB Logic (Storage Layer)
// ================================================

const DB_NAME = "UserAnalyticsDB";
const STORE_NAME = "event_outbox";
const DB_VERSION = 1;

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "eventId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Save an array of events to IndexedDB
const saveToDB = async (events) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    events.forEach((event) => {
      if (!event.eventId) {
        event.eventId = self.crypto.randomUUID
          ? self.crypto.randomUUID()
          : `ev-${Date.now()}-${Math.random()}`;
      }
      store.put(event);
    });
  } catch (err) {
    console.error("Worker DB Save Error:", err);
  }
};

// Get all events from IndexedDB and clear the store
const getAndClearBatch = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        const events = getRequest.result;
        if (events.length > 0) store.clear();
        resolve(events);
      };

      transaction.onerror = () => resolve([]);
    });
  } catch (err) {
    return [];
  }
};

// ================================================
// 2️⃣ Worker & Batching Logic (Event Handling Layer)
// ================================================

// Worker session ID
const WORKER_SESSION_ID = self.crypto.randomUUID
  ? self.crypto.randomUUID()
  : `sess-${Date.now()}`;

// Batching constants
const BATCH_SIZE = 5;
const BATCH_INTERVAL = 10000;
const MAX_INTERVAL = 60000;
const MAX_RETRIES = 3;

// Worker state
let isFlushing = false;
let batchQueue = [];
let retryCount = 0;
const connectedPorts = new Set();

// Flush current batch of events to server
async function flushBatch() {
  if (isFlushing) return;

  const memoryEvents = [...batchQueue];
  batchQueue = [];

  const storedEvents = await getAndClearBatch();
  const finalBatch = [...storedEvents, ...memoryEvents];

  if (finalBatch.length === 0) return;

  isFlushing = true;
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
    await saveToDB(finalBatch); // Save failed batch to IndexedDB
  } finally {
    isFlushing = false;
  }
}

// Schedule periodic flush with exponential backoff
function scheduleNextFlush() {
  const delay =
    Math.min(BATCH_INTERVAL * Math.pow(2, retryCount), MAX_INTERVAL) +
    Math.random() * 2000;

  setTimeout(async () => {
    await flushBatch();
    scheduleNextFlush();
  }, delay);
}

// Start the periodic flush loop
scheduleNextFlush();

// Handle connections from multiple ports (SharedWorker)
onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = async (event) => {
    const data = event.data;

    // Close port (just stop processing if requested)
    if (data.type === "CLOSE_PORT") {
      return; // no need to track ports
    }

    // Force flush events immediately
    if (data.type === "FORCE_FLUSH") {
      await flushBatch();
      return;
    }

    // Enrich event with sessionId and timestamp
    const enrichedEvent = {
      ...data,
      sessionId: WORKER_SESSION_ID,
      timestamp: data.timeStamp || data.timestamp || Date.now(),
    };

    // Add event to memory batch
    batchQueue.push(enrichedEvent);

    // Flush immediately if batch size reached
    if (batchQueue.length >= BATCH_SIZE) {
      await flushBatch();
    }
  };

  port.start();
};
