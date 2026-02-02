/* 12_semantic_tags

DEFINITION:
Semantic tags in HTML provide meaning to the content they enclose, describing its purpose rather than just its appearance.  
They improve accessibility, SEO, and maintainable code structure.

COMMON SEMANTIC TAGS:

1. <header>  
   - Represents introductory content or navigational links, usually at the top of a page or section.

2. <nav>  
   - Contains navigation links.

3. <main>  
   - Represents the main content of a document (unique per page).

4. <section>  
   - Defines a thematic grouping of content, typically with a heading.

5. <article>  
   - Represents independent, self-contained content, like a blog post or news article.

6. <aside>  
   - Contains content tangentially related to the main content (e.g., sidebars, pull quotes).

7. <footer>  
   - Represents footer content of a page or section, like copyright or contact info.

8. <figure> and <figcaption>  
   - <figure>: encapsulates media (images, charts, code snippets).  
   - <figcaption>: caption for the <figure> content.

9. <address>  
   - Provides contact information for the author or organization.

KEY POINTS:
- Semantic tags improve SEO by giving meaning to content.
- Screen readers use semantic tags to help visually impaired users navigate the page.
- Encourages logical document structure and maintainability.
- Avoid using semantic tags purely for styling — use CSS for visual design.

EXAMPLE:
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>Blog content goes here.</p>
  </article>

  <aside>
    <h3>Related Links</h3>
    <ul>
      <li><a href="#">Link 1</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>© 2025 My Website</p>
</footer>

FOLLOW-UP QUESTIONS:
Q: Why are semantic tags preferred over <div> for everything?  
A: They provide meaning, improve SEO, accessibility, and code readability.

Q: Can a page have multiple <main> elements?  
A: No, only one <main> per page.

Q: Difference between <section> and <div>?  
A: <section> is semantic (thematic grouping), <div> is purely for layout/styling.

Q: Are semantic tags block-level or inline-level?  
A: Most semantic tags are block-level.

Q: How do <figure> and <figcaption> improve accessibility?  
A: Screen readers can associate the caption with the media, providing context to users.
*/
