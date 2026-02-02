/* 3_head_and_body

1. Definition
- <head>: The container for metadata and resources that do NOT appear directly on the webpage.
- <body>: The container for all visible content that appears on the webpage.

2. Key points to highlight
- <head> contains:
  - <title> → Page title shown in browser tabs.
  - <meta> → Charset, viewport, SEO data, description, keywords.
  - <link> → External CSS files, fonts, favicons.
  - <style> → Internal CSS.
  - <script> → JS files that should load before rendering (mostly avoided today).
- <body> contains:
  - Visible elements: text, images, buttons, sections, navigation, layout.
  - Interactive items: forms, inputs, scripts.
  - Everything rendered for the user.

- Behavior differences:
  - Content in <head> is NOT displayed.
  - Content in <body> is rendered on screen.
  - Scripts in <head> block rendering unless "defer" is used.
  - Scripts in <body> usually load after content.

- SEO and accessibility:
  - Proper use of <head> affects SEO, sharing previews, and accessibility.
  - <body> structure affects user experience and rendering.

3. Example basic structure
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <h1>Hello World</h1>
    <p>Welcome to my site.</p>
  </body>
</html>

4. XHTML version (for comparison)
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <h1>Hello World</h1>
    <p>Welcome to my XHTML page.</p>
  </body>
</html>

5. Follow-up interview questions
Q: Why should scripts in the head use "defer"?  
A: To prevent blocking rendering and improve performance.

Q: What goes inside the head that affects SEO?  
A: Meta description, canonical tag, OpenGraph tags, title tag.

Q: Why shouldn't visible elements be placed in the head?  
A: The browser ignores or errors out; head is only for metadata.

Q: Can the body contain multiple sections?  
A: Yes, body can contain any number of semantic sections like <main>, <header>, <footer>, <section>, etc.

Q: What happens if we put too many render-blocking resources in the head?  
A: Slower page load, poor performance, and delayed first contentful paint.

*/
