/* 
8. Select by Attribute in CSS:

Definition:
- The attribute selector targets elements based on the presence or value of an **HTML attribute**.
- Syntax: 
  // [attribute] → selects elements with the specified attribute
  // [attribute="value"] → selects elements with a specific value
  // [attribute~="value"] → selects elements with a value containing a word
  // [attribute^="value"] → selects elements with a value starting with
  // [attribute$="value"] → selects elements with a value ending with
  // [attribute*="value"] → selects elements with a value containing a substring

Example:

<head>
  <style>
    // All input elements with a type attribute
    input[type] {
      border: 1px solid #ccc;
      padding: 5px;
    }

    // All input elements of type text
    input[type="text"] {
      background-color: #f0f0f0;
    }

    // All links that contain "google" in href
    a[href*="google"] {
      color: red;
    }
  </style>
</head>
<body>
  <input type="text" placeholder="Name">
  <input type="password" placeholder="Password">
  <a href="https://www.google.com">Google</a>
  <a href="https://www.example.com">Example</a>
</body>

// Key Points:
// - Attribute selectors are useful for targeting elements **based on HTML attributes**.
// - Can be combined with class, ID, and element selectors for more precision.
*/
