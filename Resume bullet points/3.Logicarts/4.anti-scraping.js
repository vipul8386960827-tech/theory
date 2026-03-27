/*
FRONTEND BOT DETECTION (IMPORTANT POINTS ONLY)

1. Interaction behavior tracking
- Checked mouse movement, clicks, and timing
- Bots usually act too fast or too consistent

2. Typing / input pattern detection
- Humans type with delays
- Bots fill forms instantly → flagged

3. Headless browser detection
- Checked navigator.webdriver and unusual browser properties
- Helps detect Puppeteer / automation tools

4. Honeypot fields
- Added hidden fields
- Bots fill them, humans don’t

--------------------------------------------------

IMPORTANT CONCLUSION (MOST IMPORTANT LINE)

- Frontend detection is not secure
- It only helps identify suspicious behavior
- Final validation and blocking is always handled on backend
*/
/*
HOW I IMPLEMENTED BOT DETECTION (FRONTEND)

------------------------------------------
1. MOUSE MOVEMENT TRACKING

- Added event listener:
  window.addEventListener('mousemove', ...)

- Tracked:
  - number of movements
  - speed (distance / time)
  - randomness (change in direction)

- Logic:
  - Humans → irregular, curved movement
  - Bots → straight lines or no movement

- Detection:
  - If no movement OR very linear + fast → suspicious


------------------------------------------
2. CLICK / ACTION TIMING

- Recorded timestamps of user actions:
  - clicks
  - API calls

- Logic:
  - Humans → random delays
  - Bots → fixed intervals or too fast

- Detection:
  - multiple actions within few ms → flag


------------------------------------------
3. INPUT / TYPING PATTERN

- Added listener:
  input.addEventListener('input', ...)

- Tracked:
  - time between keystrokes

- Logic:
  - Humans → 100ms–500ms variation
  - Bots → instant fill (0–10ms)

- Detection:
  - full field filled instantly → suspicious

FINAL STEP (IMPORTANT)

- Combine all signals → assign a "suspicion score"

- Example:
  - no mouse movement → +1
  - instant typing → +1
  - fast clicks → +1

- If score > threshold:
  - trigger CAPTCHA OR
  - send flag to backend

------------------------------------------
INTERVIEW SUMMARY (1 LINE)

"I tracked user interaction patterns like mouse movement, typing delays, and action timing, and used 
 heuristics to flag non-human behavior."
*/

/*
HOW TO CHECK IF MOUSE MOVEMENT IS CURVED (SIMPLE WAY)

STEP 1: STORE MOUSE POINTS
- On every mousemove event, store:
  { x, y, timestamp }

Example:
points = [
  {x:10, y:20},
  {x:15, y:25},
  {x:18, y:40}
]

------------------------------------------

STEP 2: CALCULATE DIRECTION CHANGES

- Take 3 consecutive points:
  A → B → C

- Compute direction:
  AB = (Bx - Ax, By - Ay)
  BC = (Cx - Bx, Cy - By)

- Compare direction of AB and BC

------------------------------------------

STEP 3: CHECK FOR STRAIGHT vs CURVED

- If direction stays SAME:
  → straight line (bot-like)

- If direction changes frequently:
  → curved / natural (human-like)

------------------------------------------

STEP 4: SIMPLE HEURISTIC (NO COMPLEX MATH)

- Count how many times direction changes

Example:
- direction changes > threshold → human
- almost no change → bot

------------------------------------------

ALTERNATIVE (EVEN SIMPLER - INTERVIEW SAFE)

- Track variation in movement:
  - humans → jittery, inconsistent
  - bots → smooth or perfectly linear

- So:
  - low variation → suspicious
  - high variation → human-like

------------------------------------------

IMPORTANT NOTE (SAY THIS)

- We don’t need perfect accuracy
- Just a heuristic to detect obvious bots
*/
