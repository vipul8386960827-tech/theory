// ================================================
// 1️⃣ IndexedDB Logic (Storage Layer)
// ================================================
const DB_NAME = "UserAnalyticsDB";
const STORE_NAME = "event_outbox";
const DB_VERSION = 1;

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
    console.error("SW DB Save Error:", err);
  }
};

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
// 2️⃣ Worker & Batching Logic (Restored Functionality)
// ================================================

// Replaces the WORKER_SESSION_ID from SharedWorker
const WORKER_SESSION_ID = self.crypto.randomUUID
  ? self.crypto.randomUUID()
  : `sess-${Date.now()}`;

const BATCH_SIZE = 5;
const BATCH_INTERVAL = 10000;
const MAX_INTERVAL = 60000;

let isFlushing = false;
let batchQueue = [];
let retryCount = 0;

// Force immediate activation
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));

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
    retryCount = 0; // Reset on success
  } catch (error) {
    retryCount++;
    await saveToDB(finalBatch); // Save failed batch
  } finally {
    isFlushing = false;
  }
}

// RESTORED: Exponential Backoff Loop
function scheduleNextFlush() {
  const delay =
    Math.min(BATCH_INTERVAL * Math.pow(2, retryCount), MAX_INTERVAL) +
    Math.random() * 2000;

  setTimeout(async () => {
    await flushBatch();
    scheduleNextFlush();
  }, delay);
}

scheduleNextFlush();

// Handle messages (Replaces onconnect)
self.addEventListener("message", async (event) => {
  const data = event.data;

  if (data.type === "FORCE_FLUSH") {
    await flushBatch();
    return;
  }

  // Enrich event with SW session ID and timestamp
  const enrichedEvent = {
    ...data,
    sessionId: WORKER_SESSION_ID,
    timestamp: data.timeStamp || data.timestamp || Date.now(),
  };

  batchQueue.push(enrichedEvent);

  if (batchQueue.length >= BATCH_SIZE) {
    await flushBatch();
  }
});
