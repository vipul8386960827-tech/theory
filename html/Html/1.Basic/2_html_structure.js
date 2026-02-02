/* 2_html_structure

1. Definition
HTML structure refers to how an HTML document is organized using essential elements like
<!DOCTYPE>, <html>, <head>, and <body>. It defines the skeleton of a webpage so browsers know 
how to parse and render the content.

2. Key points to highlight
- <!DOCTYPE html>  
  - Tells the browser to use HTML5 standards mode.
- <html>  
  - Root element containing the entire document.
- <head>  
  - Contains metadata: <title>, <meta>, <link>, <style>, <script> (non-visual content).
- <body>  
  - Contains everything visible to the user: text, images, videos, buttons, layout elements.
- Nesting  
  - Elements should be properly nested and closed.
- Semantic structure  
  - Use meaningful tags: <header>, <nav>, <main>, <section>, <article>, <footer>.
- Separation of concerns  
  - Content (HTML), styling (CSS), logic (JS) should be separated.
- Accessibility  
  - Proper structure helps screen readers and SEO.

3. Example basic HTML structure
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a simple page.</p>
  </body>
</html>

4. Follow-up interview questions
Q: Why is <!DOCTYPE html> important?  
A: It ensures the browser renders the page in standards mode instead of quirks mode.

Q: What is the difference between <head> and <body>?  
A: <head> contains metadata and resources; <body> contains visible content.

Q: What are semantic tags and why should we use them?  
A: Semantic tags like <main>, <nav>, and <article> add meaning, improve SEO, readability, and accessibility.

Q: What goes inside <meta> tags?  
A: Document metadata: charset, viewport settings, SEO description, OpenGraph data.

Q: Is <html> mandatory?  
A: Yes, it is the root element wrapping all content.

Q: What is the purpose of the lang attribute on <html>?  
A: Helps screen readers and search engines understand the page language.

Q: Why separate content, style, and behavior?  
A: Improves maintainability, readability, reuse, and keeps code clean.

*/
