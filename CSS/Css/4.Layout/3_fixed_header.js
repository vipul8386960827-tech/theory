/* 
3. Fixed Header in CSS:

Definition:
- A fixed header stays at the **top of the viewport** while scrolling the page.
- Uses `position: fixed` with `top: 0`.

Example:

<style>
  header {
    position: fixed;      // fix the header on screen
    top: 0;               // stick to top
    left: 0;
    width: 100%;          // span full width
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
  }

  body {
    margin: 0;
    padding-top: 60px;    // prevent content from being hidden behind header
  }
</style>

<header>Fixed Header</header>
<main>
  <p>Scroll down to see the header stay in place.</p>
  <p>Lorem ipsum dolor sit amet...</p>
  <p>More content...</p>
  <p>More content...</p>
  <p>More content...</p>
</main>

// Key Points:
// - `position: fixed` → element stays visible on scroll.
// - Set `width: 100%` to span the page.
// - Add padding/margin to body to avoid content hiding behind header.
*/
