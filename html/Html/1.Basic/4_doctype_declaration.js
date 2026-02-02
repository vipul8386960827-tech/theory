/* 4_doctype_declaration

1. Definition
A DOCTYPE declaration tells the browser which HTML standard or document type to use when parsing the page.  
Its main purpose is to ensure the browser uses **standards mode** instead of **quirks mode**.

2. Key points to highlight
- HTML5 DOCTYPE is simple:
  <!DOCTYPE html>
- Placed at the very top of the document (before <html>).
- It is **not** a tag — it's an instruction for the browser.
- Ensures the browser uses the modern, standard rendering mode.
- Without DOCTYPE → browser may fallback to quirks mode → inconsistent layout, broken CSS, legacy behaviors.

3. Types of DOCTYPEs
- HTML5 (current standard):
  <!DOCTYPE html>

- Older XHTML & HTML4 DOCTYPEs were long and complicated:
  XHTML 1.0 Strict:
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

  HTML 4.01 Transitional:
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">

4. Why HTML5 DOCTYPE is preferred
- Short, simple, easy to remember.
- Triggers standards mode in all modern browsers.
- Backward compatible with older browsers.
- Works for both HTML and XHTML5 (XML serialization) documents.

5. XHTML version note
- In XHTML (served as XML), DOCTYPE is still allowed.
- Example XHTML5 with XML declaration:
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    ...
  </html>

6. Follow-up interview questions
Q: What happens if DOCTYPE is missing?  
A: Browser enters quirks mode and may render layouts incorrectly using old legacy rules.

Q: Does DOCTYPE affect JavaScript?  
A: Mostly no — it affects layout, CSS rendering, and parsing differences.

Q: Why was the older DOCTYPE so long?  
A: It referenced a DTD (Document Type Definition) that defined rules for valid markup.

Q: Is DOCTYPE case-sensitive?  
A: No, but the conventional form is uppercase for DOCTYPE and lowercase for html.

Q: Does XHTML require a DOCTYPE?  
A: Recommended for standards mode; required in older XHTML versions (1.0/1.1).

*/
