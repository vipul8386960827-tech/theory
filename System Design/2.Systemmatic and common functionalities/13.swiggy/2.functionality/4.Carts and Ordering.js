/*
  BACKEND-SYNCED CART (Frontend + Backend Flow)
  ---------------------------------------------

  1. CART STORAGE & FLOW
     - For logged-in users, the cart is synced with the backend.
     - Add/Remove/Update quantity actions:
         * Update frontend state immediately for instant UI feedback (Optimistic UI).
         * **Offload Network Logic**: Instead of the main thread, the **Service Worker** handles the API requests.
         * Mirror cart to IndexedDB (replacing LocalStorage) for persistence.
         * Offload all synchronization logic to a **SharedWorker** to keep the main thread free.
         * Frontend state always reflects the latest cart for smooth UX.

     - WHY LOCALSTORAGE IS A "BAD FLOW":
         * Synchronous & Blocking: Reading/writing large JSON strings blocks the main thread, causing UI jank.
         * Main Thread Dependency: Competes with UI rendering; cannot be accessed by workers in the background.
         * Size Limits: 5MB is too restrictive for data-heavy applications.
         * String-Only: Requires CPU-heavy JSON.parse/stringify cycles.

     - MULTI-TAB & BACKEND SYNCHRONIZATION:
         * TAB SYNC (SharedWorker): All tabs connect to a single SharedWorker. When one tab updates, the Worker 
           broadcasts the change to all other ports (tabs), offloading reconciliation from the main thread.
         * BACKEND SYNC (Service Worker): 
             - The **Service Worker** acts as the network proxy. It intercepts cart updates and handles the push to the backend.
             - By using the **Background Sync API**, the Service Worker reads the cart from IndexedDB and ensures the server is updated even if the user closes the tab immediately or has a spotty connection.
         * Result: The main thread remains dedicated to UI, while workers handle the "Internal" (tabs) and "External" (backend) sync.

  2. CART REPRESENTATION
     - Each cart is associated with a **single restaurant**:
         {
           "restaurantId": 123,
           "items": [
             {
               "id": 101,
               "quantity": 2,
               "modifiers": ["extra cheese", "spicy"]
             },
             {
               "id": 102,
               "quantity": 1
             }
           ],
           "total": 550
         }
     - MULTIPLE RESTAURANT HANDLING (Implementation):
         * Logic: `if (newItem.restaurantId !== currentCart.restaurantId) showConflictModal();`
         * State Guard: An interceptor in the worker or state layer blocks the update if the vendor ID mismatch occurs.
         * If user confirms "Clear Cart": Perform an atomic reset of IndexedDB and the Worker state before adding the new item.

  3. CHECKOUT FLOW
     1. User clicks "Checkout":
         - The **Service Worker** ensures any pending IndexedDB mutations are flushed to the backend first.
         - Frontend sends final checkout trigger to backend (POST /api/order).
     2. Backend validates cart:
         - Ensure items belong to restaurant and recalculate prices/taxes server-side (Source of Truth).
      3. Payment Integration:
         - Frontend triggers payment SDK.
      4. Clear / Update Cart:
         - On success, the Service Worker clears the IndexedDB cart; on failure, the cart is preserved.

  4. PROS OF INDEXEDDB + MULTI-WORKER ARCHITECTURE
     - Off-Main-Thread Processing: UI stays responsive as all API logic and tab sync are moved to workers.
     - Guaranteed Persistence: Service Worker Background Sync ensures the backend is eventually consistent even if the network fails.
     - Structured Storage: IndexedDB avoids stringification overhead and allows for larger, more complex data.
     - Data Integrity: Strict single-restaurant enforcement at the worker level.

  5. SECURITY CONSIDERATIONS
     - Always fetch the **final cart from backend** at checkout; ignore local IndexedDB values for pricing to prevent tampering.

  INTERVIEW-FRIENDLY PHRASE:
  "I leverage a multi-worker architecture: a **SharedWorker** to offload cross-tab synchronization 
   from the main thread, and a **Service Worker** to manage all backend communication via the 
   **Background Sync API**. By moving API requests to the Service Worker, we ensure that cart 
   updates, stored in **IndexedDB**, are guaranteed to reach the server regardless of tab 
   closures or network status. This off-main-thread approach keeps the UI fluid while 
   enforcing strict single-restaurant integrity across the entire user session."
*/
