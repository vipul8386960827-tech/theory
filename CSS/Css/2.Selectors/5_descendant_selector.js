/* 
5. Descendant Selector in CSS:

Definition:
- The descendant selector targets **elements that are nested inside another element**, 
  at any level (not necessarily direct children).
- Syntax: ancestor descendant { property: value; }

Example:

<head>
  <style>
    // Descendant selector
    div p {
      color: green;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div>
    <p>This paragraph is inside a div.</p>
    <section>
      <p>This paragraph is also inside a div, nested deeper.</p>
    </section>
  </div>

  <p>This paragraph is outside the div and not affected.</p>
</body>

// Key Points:
// - Targets **all matching descendants** inside the specified ancestor.
// - Useful for styling elements in specific sections without affecting similar elements elsewhere.
// - Specificity: element + element → 2
*/
