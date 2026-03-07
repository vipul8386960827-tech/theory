/*
  ============================================================
  COMPLETE MOBILE SHARE + METADATA FLOW
  ============================================================
 
  When a user clicks a "Share" button on a website,
  the website usually uses the Web Share API.
 
  Example:
 
  navigator.share({
    title: "Amazing Article",
    text: "Check this out",
    url: "https://example.com"
  });
 
 
  IMPORTANT
 
  The website only shares basic data:
 
  - title
  - text
  - url
 
  It does NOT send preview images or structured messages
  to apps like WhatsApp.
 
 
  ============================================================
  1. SHARE FLOW
  ============================================================
 
  User clicks share button
         ↓
  Website calls navigator.share()
         ↓
  Browser forwards request to OS
         ↓
  Operating system opens share drawer
         ↓
  User selects WhatsApp
         ↓
  WhatsApp receives the shared URL
 
 
  ============================================================
  2. WHAT WHATSAPP RECEIVES
  ============================================================
 
  WhatsApp receives something like:
 
  {
    text: "Check this out",
    url: "https://example.com"
  }
 
  At this stage the message is still plain text.
 
 
  ============================================================
  3. HOW THE PREVIEW (IMAGE + TITLE) IS CREATED
  ============================================================
 
  When WhatsApp sees a URL in the message,
  it automatically tries to create a preview card.
 
  To do this it performs a network request
  to the shared URL.
 
 
  WhatsApp does something like:
 
  GET https://example.com
 
 
  It downloads the HTML of the page.
 
 
  ============================================================
  4. WEBSITE PROVIDES METADATA IN HTML
  ============================================================
 
  The website must include metadata inside the <head>.
 
  These are called Open Graph tags.
 
  Example HTML:
 
  <head>
 
    <meta property="og:title" content="Amazing Article">
 
    <meta property="og:description"
          content="This is an amazing article about technology">
 
    <meta property="og:image"
          content="https://example.com/preview.jpg">
 
    <meta property="og:url"
          content="https://example.com">
 
  </head>
 
 
  This metadata format is called:
 
  Open Graph Protocol
 
  Originally created by Facebook.
 
 
  ============================================================
  5. HOW WHATSAPP READS THE METADATA
  ============================================================
 
  WhatsApp parses the HTML and extracts:
 
  og:title
  og:description
  og:image
 
 
  Example extracted data:
 
  title = "Amazing Article"
  description = "This is an amazing article"
  image = "https://example.com/preview.jpg"
 
 
  ============================================================
  6. WHATSAPP BUILDS THE PREVIEW CARD
  ============================================================
 
  Using that metadata WhatsApp constructs a preview UI.
 
  Example message preview:
 
  ----------------------------------
  [preview image]
 
  Amazing Article
 
  This is an amazing article
 
  example.com
  ----------------------------------
 
 
  ============================================================
  7. IMPORTANT THING TO UNDERSTAND
  ============================================================
 
  The website NEVER sends preview data to WhatsApp directly.
 
  Instead:
 
  Website publishes metadata in HTML
           ↓
  WhatsApp fetches the webpage
           ↓
  WhatsApp reads metadata
           ↓
  WhatsApp builds preview
 
 
  ============================================================
  8. WHY SOME LINKS SHOW NO PREVIEW
  ============================================================
 
  If the page does not contain Open Graph tags,
  WhatsApp cannot generate a preview.
 
  The message becomes:
 
  https://example.com
 
 
  ============================================================
  9. OTHER METADATA FORMATS
  ============================================================
 
  Some platforms also support Twitter Cards.
 
  Example:
 
  <meta name="twitter:card" content="summary_large_image">
 
  <meta name="twitter:title" content="Amazing Article">
 
  <meta name="twitter:image" content="preview.jpg">
 
 
  ============================================================
  10. COMPLETE END-TO-END FLOW
  ============================================================
 
  User presses share button
         ↓
  navigator.share() runs
         ↓
  OS share drawer appears
         ↓
  User selects WhatsApp
         ↓
  WhatsApp receives URL
         ↓
  WhatsApp fetches the webpage
         ↓
  WhatsApp reads Open Graph metadata
         ↓
  WhatsApp generates preview card
         ↓
  User sends message
 
 
  ============================================================
  FINAL SUMMARY
  ============================================================
 
  Share drawer UI:
     Created by the operating system
 
  App detection:
     Handled by OS
 
  Preview card:
     Generated by WhatsApp
 
  Metadata source:
     Open Graph tags inside the webpage HTML
 
 */