/* 
1. Definition:

- Semantic Tags:
  * These are HTML elements that have an **inherent meaning**.
  * They clearly describe the purpose of the content they contain.
  * Examples: <header>, <footer>, <section>, <article>, <nav>, <aside>, <main>, <figure>, <figcaption>, <mark>.

- Non-Semantic Tags:
  * These HTML elements **do not convey any meaning** about their content.
  * They are used purely for layout or styling purposes.
  * Examples: <div>, <span>, <b>, <i> (though <b> and <i> have visual meaning, they are non-semantic).

2. Key Points to Highlight:

- Semantic tags improve:
  * **Accessibility** (screen readers can interpret content better)
  * **SEO** (search engines understand the content structure)
  * **Maintainability** (other developers can read and understand the structure)

- Non-semantic tags are useful when:
  * You just need a container for CSS or JS purposes.
  * No meaning is required for the content.

3. Example:

<!-- Semantic HTML -->
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li>Home</li>
      <li>About</li>
    </ul>
  </nav>
</header>

<section>
  <h2>About Us</h2>
  <p>We provide web development services.</p>
</section>

<footer>
  <p>© 2025 My Website</p>
</footer>

<!-- Non-Semantic HTML -->
<div class="header">
  <h1>My Website</h1>
  <div class="nav">
    <ul>
      <li>Home</li>
      <li>About</li>
    </ul>
  </div>
</div>

<div class="content">
  <h2>About Us</h2>
  <p>We provide web development services.</p>
</div>

<div class="footer">
  <p>© 2025 My Website</p>
</div>

4. Summary:

- Use **semantic tags** whenever possible for clarity, accessibility, and SEO benefits.
- Use **non-semantic tags** when you only need structural containers or styling hooks.
*/
