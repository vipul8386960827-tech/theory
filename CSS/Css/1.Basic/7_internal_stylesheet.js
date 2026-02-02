/* 
7. Internal Stylesheet in CSS:

Definition:
- An internal stylesheet is CSS written inside a <style> tag within the <head> section of an HTML document.
- It is used to style elements only within that single HTML page.

Syntax:
<head>
  <style>
    // CSS rules go here
    selector {
      property: value;
      property: value;
    }
  </style>
</head>

Example:
<head>
  <style>
    // Styling all paragraphs
    p {
      color: blue;
      font-size: 18px;
      line-height: 1.5;
    }

    // Styling elements with class "highlight"
    .highlight {
      background-color: yellow;
      font-weight: bold;
    }

    // Styling element with id "main-title"
    #main-title {
      text-align: center;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <h1 id="main-title">Welcome</h1>
  <p>This is a paragraph.</p>
  <p class="highlight">This paragraph is highlighted.</p>
</body>

// Key Points:
// - CSS inside <style> affects only the current page.
// - Useful for single-page projects or page-specific overrides.
// - Not reusable across multiple HTML files (use external stylesheet for that).
// - Inline styles can override internal styles if they target the same element.
*/