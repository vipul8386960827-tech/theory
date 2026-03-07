/*
  ============================================================
  MOBILE WEB SHARE FLOW (FULL EXPLANATION)
  ============================================================
 
  When a user clicks a "Share" button on a mobile website,
  a native share drawer appears showing apps like:
 
  - WhatsApp
  - Instagram
  - SMS
  - Gmail
 
  This system is implemented using the Web Share API.
 
  IMPORTANT:
  The share UI is NOT built using HTML/CSS.
  It is rendered by the mobile operating system.
 
 
  ============================================================
  1. WHAT THE FRONTEND DOES
  ============================================================
 
  The website simply calls the Web Share API:
 
  navigator.share({
    title: "Amazing Article",
    text: "Check this out",
    url: "https://example.com"
  });
 
  This sends simple metadata to the browser.
 
  The website does NOT:
  - detect installed apps
  - render the share drawer
  - choose which apps appear
 
 
  ============================================================
  2. WHAT HAPPENS AFTER navigator.share() IS CALLED
  ============================================================
 
  Flow:
 
  Website (JavaScript)
       ↓
  Browser (Chrome / Safari)
       ↓
  Operating System Share Service
       ↓
  OS scans installed apps that support sharing
       ↓
  OS renders the share drawer UI
 
 
  ============================================================
  3. WHO BUILDS THE SHARE DRAWER UI
  ============================================================
 
  The UI you see (bottom sheet with icons) is rendered
  entirely by the operating system.
 
  It may look like a web component but it is actually
  a native OS view.
 
  Android:
    Uses the Intent system (ACTION_SEND)
 
  iOS:
    Uses UIActivityViewController
 
  The website has ZERO control over that UI.
 
 
  ============================================================
  4. HOW APPS APPEAR IN THE SHARE LIST
  ============================================================
 
  Apps like WhatsApp or Instagram register themselves
  as "share targets" in the operating system.
 
  Example Android registration concept:
 
  intent-filter
     ACTION_SEND
 
  This means the app can receive shared content.
 
  The OS collects all apps that support the data type
  (text / image / video) and displays them.
 
 
  ============================================================
  5. WEBSITE CANNOT DETECT INSTALLED APPS
  ============================================================
 
  For privacy and security reasons, JavaScript cannot
  detect which apps are installed on a device.
 
  The browser intentionally hides this information.
 
  Otherwise websites could fingerprint users.
 
 
  ============================================================
  6. USER SELECTS AN APP (EX: WHATSAPP)
  ============================================================
 
  After the share sheet appears, the user selects
  an application such as WhatsApp.
 
  Flow:
 
  Website
    ↓
  Browser
    ↓
  OS Share System
    ↓
  WhatsApp receives the shared data
 
 
  ============================================================
  7. WHAT DATA WHATSAPP RECEIVES
  ============================================================
 
  WhatsApp receives the shared payload from the OS.
 
  Example:
 
  {
    title: "Amazing Article",
    text: "Check this out",
    url: "https://example.com"
  }
 
  This data is not formatted yet.
 
 
  ============================================================
  8. HOW THE LINK PREVIEW (IMAGE + TITLE) IS GENERATED
  ============================================================
 
  When WhatsApp detects a URL in the shared message,
  it tries to generate a link preview.
 
  To do this, WhatsApp sends a request to the website
  and reads metadata from the HTML page.
 
 
  ============================================================
  9. OPEN GRAPH METADATA
  ============================================================
 
  Websites provide metadata using Open Graph tags.
 
  These tags were originally introduced by Facebook.
 
  Example:
 
  <meta property="og:title" content="Amazing Article">
  <meta property="og:description" content="Great article about tech">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com">
 
 
  ============================================================
  10. HOW WHATSAPP BUILDS THE PREVIEW CARD
  ============================================================
 
  After fetching the webpage, WhatsApp reads the
  Open Graph tags and constructs the preview card.
 
  Example preview:
 
  [image]
  Amazing Article
  Great article about tech
  example.com
 
 
  ============================================================
  11. WHAT IF THE WEBSITE HAS NO OG TAGS
  ============================================================
 
  If Open Graph metadata is missing,
  WhatsApp cannot build the preview.
 
  The message will appear as a plain link:
 
  Check this out
  https://example.com
 
 
  ============================================================
  12. OTHER METADATA SYSTEMS
  ============================================================
 
  Some platforms also read Twitter Card metadata.
 
  Example:
 
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Amazing Article">
  <meta name="twitter:image" content="image.jpg">
 
 
  ============================================================
  13. FULL END-TO-END FLOW
  ============================================================
 
  User presses share button
         ↓
  navigator.share() is called
         ↓
  Browser sends data to OS share system
         ↓
  OS opens native share sheet
         ↓
  User selects WhatsApp
         ↓
  WhatsApp receives shared URL
         ↓
  WhatsApp fetches webpage metadata
         ↓
  WhatsApp generates preview card
         ↓
  User sends message
 
 
  ============================================================
  FINAL SUMMARY
  ============================================================
 
  Share drawer UI:
    Rendered by the operating system
 
  App detection:
    Done by the OS, not by the website
 
  Link preview:
    Generated by apps like WhatsApp
    using Open Graph metadata from the website
 
 */
