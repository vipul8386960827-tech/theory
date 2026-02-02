/* 
3. Fallback Font in CSS

Definition:
- A **fallback font** is a secondary font used if the **primary font is unavailable** on the user’s system.
- Always specify **multiple fonts**, ending with a generic family.

Syntax:
font-family: "Primary Font", "Secondary Font", generic-family;

Example:

<style>
  .text {
    font-family: "NonExistentFont", Arial, sans-serif;
  }
</style>

<p class="text">
  This text tries to use "NonExistentFont" first.
  If it's not available, it falls back to Arial.
  If Arial is unavailable, it uses the default sans-serif font.
</p>

// Key Points:
// - Ensures text is readable even if custom or primary font fails.
// - Generic family (serif, sans-serif, monospace, etc.) is recommended as the last fallback.
// - Helps maintain design consistency across different devices and browsers.
*/
