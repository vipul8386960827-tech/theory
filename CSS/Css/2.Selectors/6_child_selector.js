/* 
6. Child Selector in CSS:

Definition:
- The child selector targets **elements that are direct children** of a specified parent element.
- Syntax: parent > child { property: value; }

Example:

<head>
  <style>
    // Child selector
    div > p {
      color: red;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div>
    <p>This paragraph → styled (direct child of div)</p>
    <section>
      <p>This paragraph → NOT styled (nested deeper, not direct child)</p>
    </section>
  </div>

  <p>This paragraph → NOT styled (outside div)</p>
</body>

// Key Points:
// - Only **direct children** of the specified parent get the styles.
// - Nested elements deeper than one level are not affected.
// - Specificity: element + element → 2 (same as descendant, but more precise targeting).
*/
