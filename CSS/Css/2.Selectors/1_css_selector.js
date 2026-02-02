/* 
1. CSS Selector:

Definition:
- A CSS selector is a pattern used to **select HTML elements** to apply styles.
- It tells the browser **which elements** the CSS rules should affect.

Types of CSS Selectors:

1. **Universal Selector (*)**
  // Selects all elements on the page.
  * { margin: 0; padding: 0; }

2. **Type/Element Selector**
  // Selects all elements of a specific type.
  p { color: blue; }

3. **Class Selector**
  // Selects elements with a specific class.
  .highlight { background-color: yellow; }

4. **ID Selector**
  // Selects a unique element with a specific id.
  #main-title { text-align: center; }

5. **Group Selector**
  // Selects multiple elements at once.
  h1, h2, p { font-family: Arial; }

6. **Descendant Selector**
  // Selects elements inside another element.
  div p { color: green; }

7. **Child Selector**
  // Selects direct children only.
  div > p { font-size: 16px; }

8. **Attribute Selector**
  // Selects elements with a specific attribute.
  input[type="text"] { border: 1px solid #ccc; }

9. **Pseudo-classes**
  // Select elements in a specific state.
  a:hover { color: red; }

10. **Pseudo-elements**
  // Select and style part of an element.
  p::first-line { font-weight: bold; }

// Summary:
// - CSS selectors define **which elements** get styled.
// - More specific selectors override less specific ones based on CSS specificity rules.
*/
