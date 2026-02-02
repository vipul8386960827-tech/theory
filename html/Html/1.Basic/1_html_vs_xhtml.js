/* 1_html_vs_xhtml

1. Definition
- HTML (HyperText Markup Language): Standard markup language for building web pages; forgiving syntax.
- XHTML (eXtensible HyperText Markup Language): Stricter XML-based version of HTML; requires well-formed XML.

2. Key points to highlight
- Syntax strictness:
  - HTML: forgiving, missing tags tolerated.
  - XHTML: strict, all tags must be closed and properly nested.
- Parsing & error handling:
  - HTML: HTML parser → error recovery.
  - XHTML: XML parser → any error stops rendering.
- Tag & attribute rules:
  - HTML: <br>, <img>, <input> allowed.
  - XHTML: <br /> or <img /> required.
  - HTML allows attribute minimization; XHTML requires quotes.
- Case sensitivity:
  - HTML: not case-sensitive.
  - XHTML: case-sensitive (XML rules).
- MIME type:
  - text/html → parsed as HTML.
  - application/xhtml+xml → strict XML parsing.
- Practical use:
  - HTML5 is standard today; XHTML strict mode is rare.
  - XHTML useful when XML tooling (XSLT, namespaces) is needed.

3. Example
// HTML
<div>
  <img src="logo.png" alt=Logo>
  <input type="checkbox" checked>
</div>

// XHTML
<html xmlns="http://www.w3.org/1999/xhtml">
  <head><title>Example</title></head>
  <body>
    <div>
      <img src="logo.png" alt="Logo" />
      <input type="checkbox" checked="checked" />
    </div>
  </body>
</html>

4. Follow-up interview questions
Q: What happens if XHTML has an unclosed tag?
A: XML parser throws a fatal error; page stops rendering.

Q: Can XHTML served as text/html behave like HTML?
A: Yes, it’s parsed as HTML; strict XML rules don’t apply.

Q: Why HTML5 over XHTML?
A: HTML5 is simpler, forgiving, widely supported, avoids fatal XML errors.

Q: When is XHTML useful?
A: When using XML workflows, XSLT, or namespaces.

Q: Difference in void elements?
A: HTML uses <br>; XHTML requires <br />.

Q: Case sensitivity?
A: HTML = not case-sensitive; XHTML = case-sensitive.

Q: Proper MIME type for true XHTML?
A: application/xhtml+xml.

Q: Does HTML5 support XHTML?
A: Yes, HTML5 can be serialized as XML if well-formed and served with XML MIME type.

*/
