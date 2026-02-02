/* 
2. Font-Family in CSS

Definition:
- The `font-family` property specifies a **priority list of fonts** for text.
- Browser uses the first available font from the list.

Syntax:
font-family: "Primary Font", "Secondary Font", generic-family;

Generic Families:
- serif → Times, Georgia
- sans-serif → Arial, Helvetica
- monospace → Courier, Consolas
- cursive → Comic Sans, Pacifico
- fantasy → Impact, Papyrus

Example:

<style>
  .serif-text {
    font-family: "Times New Roman", serif;
  }

  .sans-text {
    font-family: Arial, Helvetica, sans-serif;
  }

  .mono-text {
    font-family: "Courier New", monospace;
  }

  .custom-text {
    font-family: "Pacifico", cursive; /* Google Font example
  }
</style>

<p class="serif-text">This is serif font.</p>
<p class="sans-text">This is sans-serif font.</p>
<p class="mono-text">This is monospace font.</p>
<p class="custom-text">This is cursive font.</p>

// Key Points:
// - Always provide fallback fonts.
// - Generic family ensures proper rendering if custom fonts fail.
// - Use quotes for font names with spaces.
*/
