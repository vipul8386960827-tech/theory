/* 
1. Change Font in CSS

Definition:
- The `font-family` property is used to change the **font type** of text in an element.

Syntax:
font-family: "Font Name", fallback, ...;

Example:

<style>
  .text1 {
    font-family: Arial, sans-serif;   // uses Arial, fallback to sans-serif
  }

  .text2 {
    font-family: "Times New Roman", serif;  // uses Times New Roman
  }

  .text3 {
    font-family: "Courier New", monospace; // uses Courier New
  }
</style>

<p class="text1">This is Arial font.</p>
<p class="text2">This is Times New Roman font.</p>
<p class="text3">This is Courier New font.</p>

// Key Points:
// - Always provide fallback fonts in case primary font is unavailable.
// - Can use generic families: serif, sans-serif, monospace, cursive, fantasy.
// - Custom fonts can be imported using @font-face or Google Fonts.
*/
