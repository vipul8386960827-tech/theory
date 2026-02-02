/* 
3. Select by Class in CSS:

Definition:
- The class selector targets **one or more elements** with a specific class attribute.
- Syntax: .className { property: value; }
- Classes can be reused on multiple elements.

Example:

<head>
  <style>
    // Class selector
    .highlight {
      background-color: yellow;
      font-weight: bold;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <p class="highlight">This paragraph is highlighted.</p>
  <p class="highlight">Another highlighted paragraph.</p>
  <div class="highlight">This div is also highlighted.</div>
</body>

// Key Points:
// - Class selector specificity: 10 (lower than ID, higher than element).
// - Can be applied to multiple elements.
// - Useful for applying the same style to a group of elements.
*/
