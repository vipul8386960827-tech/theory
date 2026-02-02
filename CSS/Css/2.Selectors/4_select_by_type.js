/* 
4. Select by Type (Element Selector) in CSS:

Definition:
- The type selector, also called **element selector**, targets **all elements of a specific HTML tag**.
- Syntax: element { property: value; }
- Applies to every instance of that tag in the document.

Example:

<head>
  <style>
    // Type/Element selector
    p {
      color: blue;
      font-size: 16px;
      line-height: 1.5;
    }

    h1 {
      color: darkgreen;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is a paragraph.</p>
  <p>Another paragraph.</p>
</body>

// Key Points:
// - Type selector specificity: 1 (lowest compared to class and ID).
// - Useful for styling all elements of a particular type consistently.
// - Can be combined with classes, IDs, or pseudo-classes for more specificity.
*/
