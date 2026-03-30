/*
FRONTEND TECHNIQUES (APART FROM DEBOUNCE & THROTTLE)

------------------------------------------
1. Request Queuing

- Instead of firing all API calls at once
- Queue them and send one by one

Example:
- Only allow 1–2 active requests at a time

USE:
- Prevent burst requests from UI

------------------------------------------
2. Button Disable / Cooldown

- Disable button after click for few seconds

Example:
- "Submit" disabled for 2–5 sec

USE:
- Prevent accidental spam clicks

------------------------------------------
3. Client-side Counters

- Track number of actions in time window

Example:
- max 5 clicks in 2 seconds

USE:
- Basic abuse prevention (UX level)

------------------------------------------
4. CAPTCHA Trigger (Frontend Trigger)

- If suspicious behavior detected
→ show CAPTCHA

NOTE:
- Validation still happens on backend

------------------------------------------
5. Lazy Loading / Pagination Control

- Load limited data at a time

USE:
- Prevent large data scraping via UI

------------------------------------------
6. API Call Guarding

- Prevent duplicate API calls

Example:
- Ignore if same request already in progress

------------------------------------------
IMPORTANT NOTE

- All of these:
  → Improve UX
  → Reduce accidental spam
  → Add friction for bots

BUT:
- Can be bypassed
- Not true security

------------------------------------------
INTERVIEW ONE-LINER

"Apart from debouncing and throttling, we can use techniques like request queuing,
 button cooldowns, and client-side counters to control request flow on the frontend, but
  real enforcement must still be handled on the backend."
*/