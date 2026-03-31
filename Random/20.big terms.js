/*
 * SENIOR FRONTEND ARCHITECTURE & SYSTEMS VOCABULARY
 * ------------------------------------------------
 * Use these terms to demonstrate a "Backend-friendly"
 * and "Systems-level" mindset during the interview.

 --- 1. NETWORKING & API STRATEGY ---
 IDEMPOTENCY: Ensuring multiple identical requests have the same effect as a single one (critical for retries).
 PAYLOAD OPTIMIZATION: Reducing the data sent over the wire to save bandwidth and processing time.
 REQUEST COLLAPSING: Merging multiple concurrent requests for the same resource into one.
 CIRCUIT BREAKER: A pattern to stop calling a failing service to prevent system-wide exhaustion.
 ABORT CONTROLLER: Programmatically cancelling "stale" network requests that are no longer needed.

 --- 2. DATA INTEGRITY & STATE MANAGEMENT ---
 SINGLE SOURCE OF TRUTH (SSOT): One central place for a piece of data to prevent "out-of-sync" UI bugs.
 DATA NORMALIZATION: Structuring state like a relational database (flat, not nested) for efficient updates.
 IMMUTABILITY: Treating state as read-only and creating new copies for changes, making the app predictable.
 DETERMINISTIC RENDERING: Ensuring that given the same State + Props, the UI always renders the exact same way.
 STALE-WHILE-REVALIDATE (SWR): A strategy to show cached data immediately while fetching updates in the background.

 --- 3. BROWSER RESOURCE MANAGEMENT ---
 MAIN THREAD BLOCKING: Heavily intensive JS tasks that stop the UI from responding (avoid this at all costs).
 OFF-MAIN-THREAD PROCESSING: Using Web Workers for heavy logic to keep the user interface "buttery smooth."
 MEMORY LEAKS & GARBAGE COLLECTION: Checking for uncleaned event listeners or intervals that "eat" RAM over time.
 CRITICAL RENDERING PATH: The sequence of steps the browser takes to convert HTML/CSS/JS into pixels.
 DEBOUNCING / THROTTLING: Rate-limiting high-frequency events to protect the CPU and the Backend API.

 --- 4. SECURITY & OBSERVABILITY ---
 XSS & CSRF MITIGATION: Actively sanitizing inputs and using secure tokens to prevent malicious attacks.
 CONTENT SECURITY POLICY (CSP): A security layer that helps detect and mitigate certain types of attacks.
 FRONTEND OBSERVABILITY / TELEMETRY: Tracking real-time performance and errors to find bugs before users report them.
 DEFENSIVE PROGRAMMING: Anticipating and handling "unhappy paths" (API 500s, null data, slow networks).
 SEPARATION OF CONCERNS: Decoupling Business Logic from the View Layer for better testability.

 * THE "IMPRESSION" PHRASE:
 * "I view the Frontend as a Distributed Node in our system. It isn't just a
 * display layer; it’s a system responsible for state, networking, and
 * resource management that must be as resilient as the Backend."
 */
