/* 
8. External Stylesheet in CSS:

Definition:
- An external stylesheet is a separate .css file that contains CSS rules.
- It is linked to one or more HTML pages using the <link> tag in the <head> section.
- Best practice for multi-page websites as it keeps HTML clean and allows reusability.

Syntax:
<head>
  <link rel="stylesheet" href="styles.css">
</head>

// In styles.css file:
  // Styling all paragraphs
  p {
    color: green;
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

// Example HTML:
<body>
  <h1 id="main-title">Welcome</h1>
  <p>This is a paragraph.</p>
  <p class="highlight">This paragraph is highlighted.</p>
</body>

// Key Points:
// - External CSS is reusable across multiple HTML pages.
// - Keeps HTML code clean and separate from styling.
// - Browser can cache the CSS file, improving performance.
// - Overrides follow the same CSS specificity rules (inline > internal > external if equal specificity).
*/
