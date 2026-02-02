/* 
60_sse_browser_support.js – Interview-Ready Answer

"Server-Sent Events (SSE) are supported in most modern browsers, but there 
are limitations and exceptions that developers should be aware of."

1️⃣ Key Points to Highlight

1. Browser Support:
- Supported in:
  - Chrome
  - Firefox
  - Edge (Chromium-based)
  - Safari (including iOS)
- Not fully supported in:
  - Internet Explorer (IE)
  - Older browsers

2. Fallback Strategies:
- For unsupported browsers, consider using:
  - Long polling
  - WebSockets
  - Libraries that abstract SSE with fallback options

3. Syntax to check SSE support:

if(typeof(EventSource) !== "undefined") {
    console.log("SSE is supported");
} else {
    console.log("SSE not supported, use fallback");
}

4. Real-Life Analogies

- Global Analogy: SSE = subscribing to live news updates; some older TVs cannot display live feeds.
- India-specific Analogy: SSE = receiving metro updates on app; older phones may not support notifications.
- Web Analogy: Modern browsers handle real-time updates natively; older browsers need alternative methods.

5. Code Explanation

- typeof(EventSource) checks if the browser implements the EventSource API.
- Developers can conditionally implement SSE or fallback based on support.
- Always plan for browsers that do not support SSE.

6. Example / Usage

if (typeof(EventSource) !== "undefined") {
    const evtSource = new EventSource("/server-events");
    evtSource.onmessage = function(event) {
        console.log("SSE message:", event.data);
    };
} else {
    console.log("Fallback to polling or WebSockets");
}

7️⃣ Follow-Up Interview Questions

Q1: Which browsers do not support SSE?  
A1: Internet Explorer and some very old versions of browsers.

Q2: Can SSE be polyfilled?  
A2: Yes, using long polling or libraries that simulate SSE behavior.

Q3: Why check for SSE support in JavaScript?  
A3: To implement a fallback mechanism in unsupported browsers.

Q4: Are there limitations with mobile browsers?  
A4: Most modern mobile browsers support SSE; older devices may have issues.

Q5: How does SSE handle reconnection in unsupported browsers?  
A5: Polyfills or fallback strategies must implement custom reconnection logic.
*/
