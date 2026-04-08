let clickEvents = [];

const WINDOW_SIZE = 5000; // 5 seconds
const THRESHOLD = 10;

document.addEventListener("click", () => {
  const now = Date.now();

  // 1. Add current click timestamp
  clickEvents.push(now);

  // 2. Remove old events outside window
  while (clickEvents.length > 0 && now - clickEvents[0] > WINDOW_SIZE) {
    clickEvents.shift(); // remove oldest
  }

  // 3. Compute clicks in window
  const clicksInWindow = clickEvents.length;

  // 4. Detection logic
  if (clicksInWindow > THRESHOLD) {
    console.log("🚨 Suspicious behavior detected");
  }
});
