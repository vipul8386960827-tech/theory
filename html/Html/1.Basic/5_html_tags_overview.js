/* 5_html_tags_overview

1. Definition
HTML tags are predefined markup elements used to structure and format content on a webpage.  
They define headings, paragraphs, images, links, forms, sections, and overall document layout.

2. Key points to highlight
- HTML tags usually come in pairs: <tag>content</tag>.
- Some tags are void elements (self-closing): <br>, <img>, <input>, <meta>, <link>.
- Tags define semantics → meaning → improves SEO and accessibility.
- Tags can contain attributes (id, class, src, alt, href, etc.).
- Tags follow a nested (tree-like) structure inside the DOM.
- Categories of HTML tags:
  - Structural: <html>, <head>, <body>, <main>, <section>, <header>, <footer>.
  - Text: <p>, <span>, <strong>, <em>, <h1>–<h6>.
  - Media: <img>, <audio>, <video>.
  - Forms: <input>, <textarea>, <form>, <button>, <select>.
  - Links: <a>.
  - Lists: <ul>, <ol>, <li>.
  - Table elements: <table>, <tr>, <td>, <th>.
  - Metadata: <meta>, <title>, <link>, <script>.
  - Interactive: <details>, <summary>, <dialog>.
  - Semantic: <article>, <aside>, <nav>, <figure>, <figcaption>.

3. Examples of common HTML tags
<p>This is a paragraph.</p>
<a href="https://example.com">Visit Site</a>
<img src="logo.png" alt="Logo" />
<button>Click Me</button>
<section>
  <h2>Section Title</h2>
  <p>Some text here.</p>
</section>

4. XHTML version (differences)
- All tags must be properly closed.
- Void elements must be written with />.
- All attributes must be quoted.
- Example:
<img src="logo.png" alt="Logo" />
<input type="text" value="Hello" />

5. Follow-up interview questions
Q: What are void elements in HTML?  
A: Elements that cannot contain content inside them (e.g., <img>, <br>, <meta>, <input>).

Q: Why is semantic HTML important?  
A: Helps screen readers, improves SEO, improves structure, and makes code more meaningful.

Q: Difference between <div> and <span>?  
A: <div> is a block-level container; <span> is inline. Both have no semantic meaning.

Q: What are global attributes?  
A: Attributes that can be used on almost any tag: id, class, style, title, aria-*, data-*.

Q: Are HTML tags case sensitive?  
A: In HTML → No.  
   In XHTML → Yes, because XML is case-sensitive.

Q: Why do we use alt in <img>?  
A: For accessibility, SEO, and readability when image fails to load.

Q: What is the DOM?  
A: A tree representation of the HTML document that JavaScript can access and modify.

*/
