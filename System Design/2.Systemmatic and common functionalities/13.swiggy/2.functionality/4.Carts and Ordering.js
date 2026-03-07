/*
  BACKEND-SYNCED CART (Frontend + Backend Flow)
  ---------------------------------------------

  1. CART STORAGE & FLOW
     - For logged-in users, the cart is synced with the backend.
     - Add/Remove/Update quantity actions:
         * Update frontend state immediately for instant UI feedback (Optimistic UI).
         * Fire API requests to backend to persist changes (source of truth).
         * Mirror cart to localStorage to signal updates to other tabs.
         * Optional: debounce or batch rapid changes to reduce API calls.
         * Frontend state always reflects the latest cart for smooth UX.

     - MULTI-TAB SYNCHRONIZATION:
         * When cart updates in Tab A:
             - localStorage.setItem("cart", JSON.stringify(updatedCart));
         * Other tabs listen for the 'storage' event:
             window.addEventListener("storage", (event) => {
               if(event.key === "cart") setCart(JSON.parse(event.newValue));
             });
         * Result: multiple tabs stay in sync instantly without extra API calls.
         * Provides offline resilience — cart visible even if API fails; can reconcile once online.

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
     - MULTIPLE RESTAURANT HANDLING:
         * Cart can only contain items from one restaurant at a time.
         * If user selects an item from a new restaurant:
             - Prompt user: "Your cart has items from another restaurant. Clear cart and add this item?"
             - On confirmation, clear existing cart and add new items.
             - Maintains single-restaurant integrity.

  3. CHECKOUT FLOW
     1. User clicks "Checkout":
         - Frontend sends cart, restaurantId, item IDs, quantities, and location to backend:
           POST /api/order
           Body: { userId, restaurantId, items, location: { lat, lng } }
     2. Backend validates cart:
         - Ensure items belong to restaurant
         - Check availability
         - Recalculate prices, taxes, discounts, delivery charges
         - Create order record (status: pending)
     3. Payment Integration:
         - Frontend triggers payment SDK (Razorpay, Stripe, etc.)
         - On success: backend confirms order
         - On failure: backend marks order failed; cart remains intact
     4. Clear / Update Cart:
         - Backend clears cart on successful order
         - Frontend updates state/UI to show empty cart

  4. PROS OF BACKEND-SYNCED + MULTI-TAB CART
     - Persistent across devices and sessions
     - Instant UX updates via frontend state
     - Multi-tab sync through LocalStorage events
     - Handles offline scenarios (recovery & reconciliation)
     - Backend remains source of truth (prevents tampering at checkout)
     - Ensures single-restaurant order integrity

  5. SECURITY CONSIDERATIONS
     - Always fetch the **final cart from backend** at checkout; ignore LocalStorage
     - Prevents users from tampering prices or quantities via browser console

  INTERVIEW-FRIENDLY PHRASE:
  "We use a dual-write strategy: each cart update updates the frontend state for instant UX,
   mirrors to LocalStorage for multi-tab synchronization, and persists to the backend as
   the source of truth. Multi-tab users see updates in real-time. We enforce single-restaurant
   carts and reconcile offline changes once the network is back. At checkout, the final cart
   is fetched from the backend to prevent tampering, validated, and used to trigger payment."
*/
