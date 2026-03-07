/*
  ============================================================
  WEB SHARE METADATA SYSTEM (FULL EXPLANATION)
  ============================================================
 
  When a user shares a webpage link to apps like:
 
  - WhatsApp
  - Telegram
  - Facebook
  - Discord
 
  those apps often generate a preview card that contains:
 
  - Image
  - Title
  - Description
  - Link
 
  This preview is NOT sent directly by the website.
  Instead, the app fetches the webpage and reads metadata
  embedded in the HTML.
 
 
  ============================================================
  1. HOW THE SHARE FLOW WORKS
  ============================================================
 
  User clicks Share button
         ↓
  navigator.share() is called (Web Share API)
         ↓
  Operating system opens share drawer
         ↓
  User selects an app (example: WhatsApp)
         ↓
  The app receives the shared URL
         ↓
  The app sends an HTTP request to the URL
         ↓
  The website returns HTML
         ↓
  The app reads metadata from <head>
         ↓
  The app generates the preview card
 
 
  ============================================================
  2. WHAT METADATA FORMAT IS USED
  ============================================================
 
  Most apps use the Open Graph Protocol.
 
  Example metadata inside the HTML <head>:
 
  <meta property="og:title" content="Amazing Article">
  <meta property="og:description"
        content="Deep explanation of web sharing">
  <meta property="og:image"
        content="https://example.com/preview.jpg">
  <meta property="og:url"
        content="https://example.com/article">
  <meta property="og:type" content="website">
 
 
  ============================================================
  3. WHERE THIS METADATA MUST BE PLACED
  ============================================================
 
  The metadata must appear inside the <head> section
  of the HTML returned by the server.
 
  Example structure:
 
  <html>
    <head>
       Open Graph metadata
    </head>
    <body>
       Page content
    </body>
  </html>
 
 
  ============================================================
  4. HOW APPS FETCH THE METADATA
  ============================================================
 
  When a URL is shared, the app performs a normal HTTP request.
 
  Example request:
 
  GET /article HTTP/1.1
  Host: example.com
  User-Agent: WhatsApp
 
 
  The server responds with HTML.
 
  The app parses the HTML and extracts:
 
  og:title
  og:description
  og:image
 
  Then the app fetches the image separately.
 
 
  ============================================================
  5. WHY THE WEBSITE DOES NOT SEND METADATA DIRECTLY
  ============================================================
 
  Websites only share a URL when sharing content.
 
  Example:
 
  navigator.share({
    title: "Amazing Article",
    text: "Check this out",
    url: "https://example.com/article"
  })
 
  The receiving app is responsible for fetching the page
  and building the preview.
 
 
  ============================================================
  6. COMMON ISSUES DEVELOPERS FACE
  ============================================================
 
  Issue 1: Missing Open Graph metadata
 
  If the page does not include OG tags,
  the app cannot generate a preview.
 
  Result:
 
  https://example.com
 
  Only the raw link appears.
 
 
  ------------------------------------------------------------
 
  Issue 2: Image not accessible
 
  If the og:image URL requires authentication
  or is blocked, the preview image fails to load.
 
 
  ------------------------------------------------------------
 
  Issue 3: Single Page Application rendering
 
  Frameworks like React often render metadata
  using JavaScript after the page loads.
 
  Problem:
 
  Many sharing apps DO NOT execute JavaScript.
 
  They only read the raw HTML returned by the server.
 
 
  Example failure scenario:
 
  Server sends empty HTML
  React loads JS
  Metadata inserted later
 
  Apps never see the metadata.
 
 
  ------------------------------------------------------------
 
  Issue 4: Dynamic pages with incorrect metadata
 
  If multiple pages share the same metadata,
  previews may display incorrect titles or images.
 
 
  ------------------------------------------------------------
 
  Issue 5: Cached previews
 
  Some apps cache previews.
 
  If metadata changes, the preview might not update
  immediately.
 
 
  ============================================================
  7. HOW THESE ISSUES ARE RESOLVED
  ============================================================
 
  Solution 1: Always include Open Graph metadata
 
  Minimum recommended tags:
 
  og:title
  og:description
  og:image
  og:url
 
 
  ------------------------------------------------------------
 
  Solution 2: Ensure images are publicly accessible
 
  The og:image URL must be reachable without login.
 
 
  ------------------------------------------------------------
 
  Solution 3: Use server-side rendering
 
  Frameworks like Next.js generate HTML on the server
  so metadata is present immediately.
 
 
  Example Next.js metadata configuration:
 
  export const metadata = {
    title: "Amazing Article",
    description: "Deep explanation of web sharing",
    openGraph: {
      title: "Amazing Article",
      description: "Deep explanation of web sharing",
      images: [
        { url: "https://example.com/preview.jpg" }
      ]
    }
  }
 
 
  ------------------------------------------------------------
 
  Solution 4: Generate metadata dynamically
 
  For dynamic pages:
 
  /post/[id]
 
  Use server-side functions to fetch content and
  generate metadata dynamically.
 
 
  Example concept:
 
  generateMetadata({ params }) → fetch post data
 
  return metadata for that specific page
 
 
  ------------------------------------------------------------
 
  Solution 5: Separate client and server logic
 
  Server component:
    Provides metadata
 
  Client component:
    Handles share button using navigator.share()
 
 
  ============================================================
  8. COMPLETE SYSTEM FLOW
  ============================================================
 
  Server renders page HTML
         ↓
  HTML contains Open Graph metadata
         ↓
  User clicks share button
         ↓
  Web Share API opens share drawer
         ↓
  User selects an app
         ↓
  The app fetches the webpage URL
         ↓
  The app reads metadata
         ↓
  The app fetches preview image
         ↓
  Preview card generated
 
 
  ============================================================
  FINAL SUMMARY
  ============================================================
 
  - Websites expose metadata in HTML
  - Apps fetch the page and read that metadata
  - The preview card is built by the receiving app
  - Server-side rendering ensures metadata is visible
  - Proper Open Graph tags guarantee consistent previews
 
 */
