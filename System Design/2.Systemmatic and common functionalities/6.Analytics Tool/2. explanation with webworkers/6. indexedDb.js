const DB_NAME = "UserAnalyticsDB";
const STORE_NAME = "event_outbox";
const DB_VERSION = 1;

export const initDB = () => {
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

export const saveEvent = async (db, eventData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.add(eventData);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getAndClearBatch = async (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const getRequest = store.getAll();

    getRequest.onsuccess = () => {
      const events = getRequest.result;
      if (events.length > 0) {
        store.clear();
      }
      resolve(events);
    };

    transaction.onerror = () => reject(transaction.error);
  });
};
