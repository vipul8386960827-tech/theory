/* 
10. Pseudo-element in CSS:

Definition:
- A pseudo-element allows you to **style a specific part of an element's content**.
- It is not a real DOM element but behaves like one for styling purposes.
- Syntax: selector::pseudo-element { property: value; }

Examples:

<head>
  <style>
    // Style the first line of a paragraph
    p::first-line {
      font-weight: bold;
      color: blue;
    }

    // Style the first letter of a paragraph
    p::first-letter {
      font-size: 24px;
      color: red;
    }

    // Insert content before an element
    h1::before {
      content: "★ ";
      color: gold;
    }

    // Insert content after an element
    h1::after {
      content: " ★";
      color: gold;
    }
  </style>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is a paragraph demonstrating pseudo-elements.</p>
</body>

// Key Points:
// - Pseudo-elements target **parts of an element**: first line, first letter, before/after content.
// - Use double colons (::) in modern CSS (single colon : also works for backward compatibility).
// - Useful for decorative effects and advanced styling without extra HTML.
*/
