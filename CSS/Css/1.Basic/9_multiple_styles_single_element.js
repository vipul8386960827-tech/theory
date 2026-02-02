/* 
9. Applying Multiple Styles to a Single Element:

Definition:
- A single HTML element can receive styles from multiple sources:
  // 1. Inline CSS
  // 2. Internal CSS (inside <style> in the HTML)
  // 3. External CSS (linked .css file)
- The **final style** applied depends on the **CSS cascade and specificity rules**.

Example:

<head>
  <style>
    // Internal CSS
    p {
      color: blue;
      font-size: 18px;
    }

    .highlight {
      background-color: yellow;
      font-weight: bold;
    }
  </style>
  <link rel="stylesheet" href="styles.css"> // External CSS
</head>
<body>
  <p id="para1" class="highlight" style="color: red;">
    This is a paragraph with multiple styles.
  </p>
</body>

// Explanation of final applied styles:
// - Inline CSS (style="color: red;") → highest specificity, overrides other color rules.
// - ID selector in internal/external CSS → overrides class and element selectors if present.
// - Class selector → overrides element selector.
// - Element selector → lowest specificity.

// Summary of CSS Cascade Order:
// 1. Inline styles (style="...") → highest priority
// 2. ID selectors (#id) 
// 3. Class, pseudo-class, attribute selectors (.class, [attr], :hover) 
// 4. Element selectors (div, p, h1) → lowest priority
// 5. Later rules override earlier rules if specificity is equal
*/
