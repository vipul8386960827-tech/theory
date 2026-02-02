/* 
48_check_web_storage_support.js – Interview-Ready Answer:

"Before using Web Storage (localStorage or sessionStorage), it's important 
to check if the browser supports it to prevent runtime errors."

1️⃣ Key Points to Highlight:

1. Feature Detection:
- Not all browsers or modes (e.g., private/incognito) guarantee Web Storage.
- Use `typeof` or `try-catch` to check support safely.

2. Basic Checks:

- Check if `localStorage` or `sessionStorage` exists:
  if (typeof localStorage !== "undefined") { ... }

- Try-catch to handle quota or access errors:
  try {
      localStorage.setItem("test", "1");
      localStorage.removeItem("test");
      // supported
  } catch (e) {
      // not supported
  }

3. Examples:

// Using typeof
/*
if (typeof localStorage !== "undefined") {
    console.log("localStorage supported");
} else {
    console.log("localStorage not supported");
}
*/

// Using try-catch
/*
function isLocalStorageAvailable() {
    try {
        const testKey = "__test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

console.log(isLocalStorageAvailable()); // true or false


4️⃣ Real-Life Analogies:

- Global Analogy:
  - Checking Web Storage support = checking if a drawer exists before putting items in it.
- India-specific Analogy:
  - Verifying cupboard space before storing utensils.
- Web Analogy:
  - Ensure localStorage is usable in the browser before saving user preferences or session data.

5️⃣ Code Explanation:

- `typeof` check ensures API exists.
- `try-catch` handles exceptions in private/incognito modes or quota limits.
- Always validate support before accessing storage to prevent errors.

6️⃣ Example / Usage:

/*
if (isLocalStorageAvailable()) {
    localStorage.setItem("theme", "dark");
    console.log(localStorage.getItem("theme")); // "dark"
} else {
    console.log("Web Storage not supported in this browser");
}


7️⃣ Follow-Up Interview Questions:

Q1: Why check Web Storage support?  
A1: To prevent errors in browsers or private/incognito modes that may not support it.

Q2: Can private browsing affect Web Storage?  
A2: Yes, some browsers disable or limit Web Storage in private mode.

Q3: What happens if you access localStorage without support?  
A3: Throws runtime error.

Q4: How to safely use Web Storage in production?  
A4: Always use feature detection and try-catch for error handling.

Q5: Difference between feature detection and capability detection?  
A5: Feature detection checks if API exists; capability detection checks if it works under current conditions.
*/
