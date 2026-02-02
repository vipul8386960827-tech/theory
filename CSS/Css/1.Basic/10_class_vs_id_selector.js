/* 
10. Class Selector vs ID Selector in CSS:

Definition:
- **Class Selector**:
  // Targets elements with a specific class attribute.
  // Syntax: .className { property: value; }
  // Can be applied to **multiple elements** on the same page.

- **ID Selector**:
  // Targets a single element with a unique id attribute.
  // Syntax: #idName { property: value; }
  // Should be used **only once per page**.

Example:

<head>
  <style>
    // Class selector
    .highlight {
      background-color: yellow;
      font-weight: bold;
    }

    // ID selector
    #main-title {
      color: blue;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1 id="main-title">Welcome</h1>
  <p class="highlight">This is a highlighted paragraph.</p>
  <p class="highlight">Another highlighted paragraph.</p>
</body>

// Key Differences:
// 1. Usage:
//    - Class → multiple elements
//    - ID → single element
// 2. Specificity:
//    - ID (#id) → higher specificity (100)
//    - Class (.class) → lower specificity (10)
// 3. Selector syntax:
//    - Class → .classname
//    - ID → #idname
// 4. Reusability:
//    - Class → reusable
//    - ID → unique
*/
