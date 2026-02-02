/* 
9. Pseudo-class in CSS:

Definition:
- A pseudo-class is used to define **the special state of an element**.
- It allows you to style elements **based on their state or position**, not just their type, class, or ID.
- Syntax: selector:pseudo-class { property: value; }

Examples:

<head>
  <style>
    // Styling a link when hovered
    a:hover {
      color: red;
      text-decoration: underline;
    }

    // Styling the first child of a parent
    p:first-child {
      font-weight: bold;
    }

    // Styling an input when focused
    input:focus {
      border-color: blue;
      outline: none;
    }
  </style>
</head>
<body>
  <p>First paragraph → styled if first child</p>
  <p>Second paragraph</p>
  <a href="#">Hover over me</a>
  <input type="text" placeholder="Type here">
</body>

// Key Points:
// - Pseudo-classes allow styling **based on states or positions**.
// - Common pseudo-classes: :hover, :focus, :active, :first-child, :last-child, :nth-child(), :checked.
// - Useful for interactive effects without JavaScript.
*/
