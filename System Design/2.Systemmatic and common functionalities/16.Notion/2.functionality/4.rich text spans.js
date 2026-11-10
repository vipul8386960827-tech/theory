/*
===============================================================================
NOTION — RICH TEXT AS SPANS (NOT HTML)
===============================================================================

Text inside a block is stored as an array of styled pieces (spans):

  "Hello world"  with "world" bold and linked →

  [
    { text: "Hello ", marks: [] },
    { text: "world",  marks: ["bold", { type: "link", href: "https://..." }] }
  ]

-------------------------------------------------------------------------------
WHY NOT STORE innerHTML?
-------------------------------------------------------------------------------
| innerHTML                                | Spans (JSON)                        |
|------------------------------------------|-------------------------------------|
| XSS risk (<img onerror=...>)             | Safe: we render it, React escapes   |
| Browser-specific markup (<b> vs <strong>)| One format everywhere               |
| Hard to merge two people's edits         | Easy to diff / merge / CRDT         |
| Tied to the DOM                          | Works on server, mobile, search     |

So the flow is:
  DOM (contentEditable) → read on input → spans (store) → render back
*/

// -----------------------------------------------------------------------------
// Render spans → React elements (escaped by React, so no XSS)
// -----------------------------------------------------------------------------
export function RichText({ spans }) {
  return spans.map((span, i) => {
    let node = span.text;
    for (const mark of span.marks) {
      if (mark === "bold") node = <strong>{node}</strong>;
      else if (mark === "italic") node = <em>{node}</em>;
      else if (mark === "code") node = <code>{node}</code>;
      else if (mark.type === "link" && /^https?:\/\//.test(mark.href)) {
        // only allow http(s) links — blocks "javascript:" URLs
        node = <a href={mark.href} rel="noopener noreferrer" target="_blank">{node}</a>;
      }
    }
    return <span key={i}>{node}</span>;
  });
}

// -----------------------------------------------------------------------------
// Split spans at a character offset (used by Enter key, see file 7)
// -----------------------------------------------------------------------------
export function splitSpans(spans, offset) {
  const left = [];
  const right = [];
  let pos = 0;
  for (const span of spans) {
    const end = pos + span.text.length;
    if (end <= offset) left.push(span);
    else if (pos >= offset) right.push(span);
    else {
      const cut = offset - pos;
      left.push({ ...span, text: span.text.slice(0, cut) });
      right.push({ ...span, text: span.text.slice(cut) });
    }
    pos = end;
  }
  return [left, right];
}

/*
-------------------------------------------------------------------------------
APPLYING BOLD TO A SELECTION
-------------------------------------------------------------------------------
- Split at selection start and end → add "bold" to the middle spans →
  merge neighbouring spans with identical marks.
- This replaces range.surroundContents(), which THROWS when the selection
  crosses element boundaries (e.g. half a bold word + normal text).

Interview line:
"I never trust the DOM as my data. contentEditable is only an input device.
The source of truth is a JSON array of spans, which is safe, mergeable and
renderable anywhere."
*/
