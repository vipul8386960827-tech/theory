/*
====================================================
FRONTEND BOT DETECTION (COMPLETE - INTERVIEW READY)
====================================================

-------------------------
WHAT I IMPLEMENTED
-------------------------

1. Click / Action Timing
- Detects unusually fast or burst actions

2. Typing / Input Pattern
- Detects instant or non-human typing behavior

3. Page Load → First Action Time
- Detects bots acting immediately after load

4. Headless Browser Detection
- navigator.webdriver, missing plugins, etc.

5. Honeypot Fields
- Hidden inputs filled only by bots

--------------------------------------------------

IMPORTANT CONCLUSION

- Frontend detection is NOT secure
- It only flags suspicious behavior
- Final blocking is always handled on backend

====================================================
HOW I IMPLEMENTED (HIGH LEVEL)
====================================================

1. Click Timing
- Tracked timestamps of clicks / API calls
- Flagged very fast or burst actions

2. Typing Pattern
- Measured delay between keystrokes
- Flagged instant or uniform typing

3. Page Load → First Action
- Measured delay from load to first interaction
- Flagged very quick actions (<1s)

--------------------------------------------------

FINAL STEP

- Combined all signals into a suspicion score

Example:
- fast clicks → +1
- instant typing → +1
- quick first action → +1

- If score > threshold:
  → trigger CAPTCHA OR
  → send flag to backend

====================================================
DETAILED IMPLEMENTATION
====================================================

------------------------------------------
1. CLICK / ACTION TIMING

STEP 1: Store timestamp for each action
let lastActionTime = Date.now();

STEP 2: On next action
currentTime = Date.now()
diff = currentTime - lastActionTime

STEP 3: Logic
- Humans → >100ms, irregular
- Bots → <50ms, consistent

STEP 4: Detection
- If diff < threshold → suspicious
- Track bursts:
  e.g., 5 actions within 200ms

STEP 5: Action
- Increase suspicion score
- Trigger CAPTCHA or send to backend

------------------------------------------
2. INPUT / TYPING PATTERN

STEP 1: Listen to input events
input.addEventListener('input', ...)

STEP 2: Track timestamps
let lastTime = Date.now();

STEP 3: Calculate delay
delay = currentTime - lastTime

STEP 4: Logic
- Humans → 100–500ms variation
- Bots → 0–20ms or instant fill

STEP 5: Detection
- Very low delays → suspicious
- Sudden full input:
  "" → "username123"

STEP 6: Optional
- Total typing time:
  Human → 1–3 sec
  Bot → <100ms

------------------------------------------
3. PAGE LOAD → FIRST ACTION TIME

STEP 1: Capture page load time
let pageLoadTime = Date.now();

STEP 2: Listen for first interaction
(click, keydown, scroll)

STEP 3: Calculate delay
diff = currentTime - pageLoadTime

STEP 4: Logic
- Humans → delay before action
- Bots → immediate action

STEP 5: Detection
- If diff < 1000ms → suspicious

STEP 6: Important
- Run only once
- Remove listeners after first trigger

------------------------------------------
INTERVIEW ONE-LINER

"I used frontend heuristics like action timing, typing patterns, and initial interaction delay, and combined them into a scoring system to detect bot-like behavior, with final validation handled on the backend."

====================================================
*/

/*
------------------------------------------
4. HONEYPOT FIELDS (VERY EFFECTIVE)

STEP 1: ADD HIDDEN FIELD IN FORM

- Add an input field that is:
  - hidden via CSS (not display:none ideally)
  - not visible to real users

Example:
<input type="text" name="hiddenField" style="opacity:0; position:absolute; left:-9999px" />

------------------------------------------

STEP 2: EXPECTATION

- Humans:
  - will NOT see or fill this field

- Bots:
  - often auto-fill all inputs
  - especially simple scripts

------------------------------------------

STEP 3: DETECTION

- On form submit:
  if (hiddenField has value)
    → definitely suspicious / bot

------------------------------------------

STEP 4: ACTION

- Immediately:
  - block submission OR
  - silently reject OR
  - flag to backend

------------------------------------------

STEP 5: IMPORTANT BEST PRACTICES

- Do NOT use:
  display: none
  (some bots ignore these fields)

- Use:
  - off-screen positioning OR
  - opacity: 0

- Give realistic field names:
  - e.g., "phoneNumber2", "middleName"
  (bots are more likely to fill them)

------------------------------------------

INTERVIEW ONE-LINER

"I used honeypot fields by adding hidden inputs that are invisible to users but often filled by bots, making it a very effective and low-cost detection mechanism."
*/
