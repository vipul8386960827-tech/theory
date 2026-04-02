/* ========================================================================
   API INFRASTRUCTURE & PAYLOAD SCHEMAS (1M Row Scale)
   ======================================================================== */

/**
 * 1. TABLE CONFIGURATION (The Blueprint)
 * URL: GET /api/v1/inventory/config
 * PURPOSE: Fetch metadata BEFORE data to build the UI shell.
 * * RESPONSE PAYLOAD:
 * {
 * "columns": [
 * { "key": "pid", "label": "Product ID", "width": 100, "sortable": true },
 * { "key": "p_name", "label": "Name", "width": 250, "sortable": true },
 * { "key": "qty", "label": "Stock", "width": 120, "type": "number" }
 * ],
 * "totalCount": 1000000,
 * "preferences": { "stickyHeader": true, "defaultPageSize": 50 }
 * }
 */

/**
 * 2. DATA FETCHING (The Hydration)
 * URL: GET /api/v1/inventory/data?cursor={last_id}&limit=50&sort={key}
 * PURPOSE: Fetch 50-row chunks using CURSOR-based pagination.
 * * RESPONSE PAYLOAD:
 * {
 * "data": [
 * { "pid": 101, "p_name": "Laptop", "qty": 45, "price": 1200 },
 * { "pid": 102, "p_name": "Mouse", "qty": 150, "price": 25 }
 * ],
 * "nextCursor": "102",
 * "hasMore": true
 * }
 */

/**
 * 3. ATOMIC UPDATE (The Inline Edit)
 * URL: PATCH /api/v1/inventory/data/{id}
 * PURPOSE: Update a single cell/row with minimal bandwidth.
 * * REQUEST PAYLOAD (Partial Update):
 * {
 * "qty": 46,
 * "updatedAt": "2026-04-01T10:00:00Z", // For concurrency check
 * "version": 2                         // Senior Move: Optimistic Locking
 * }
 */

/**
 * 4. BULK ACTIONS (The Multi-Select)
 * URL: POST /api/v1/inventory/bulk-action
 * PURPOSE: Perform one action on hundreds of rows at once.
 * * REQUEST PAYLOAD:
 * {
 * "action": "MARK_INACTIVE",
 * "ids": [101, 102, 505, 909, 1200], // Collected from the "Brain's" Selection State
 * "reason": "Out of stock"
 * }
 */

/**
 * 5. SERVER-SIDE SEARCH (The Processor)
 * URL: GET /api/v1/inventory/search?q={query}&filters={json_string}
 * PURPOSE: Handle 1M-row filtering on the Database level.
 * * RESPONSE PAYLOAD:
 * {
 * "data": [...first 50 matches],
 * "totalCount": 450, // Notice: totalCount changed from 1M to 450 matches
 * "searchId": "uuid-123" // To track the search session
 * }
 */
