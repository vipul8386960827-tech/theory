/*
===============================================================================
NOTION — PASTE HANDLING + XSS SANITIZATION
===============================================================================

DANGER:
Pasted HTML from websites/emails can contain:
  <img src=x onerror="steal(document.cookie)">
  <a href="javascript:...">
  <script>, <iframe>, <style> that breaks layout

If we insert it as innerHTML → XSS for EVERY collaborator who opens the page.

FLOW:
1. Intercept the paste event (preventDefault — never let the browser insert).
2. Priority of clipboard formats:
   a) our own JSON (copied from Notion) → lossless
   b) text/html  → sanitize → convert to blocks
   c) text/plain → split by newline → text blocks
   d) files (images) → upload via signed URL → image blocks
3. Insert all new blocks in ONE transaction.
*/

import DOMPurify from "dompurify";
import { keyBetween } from "./5.fractional indexing";

export function handlePaste(e, currentBlock, nextKey) {
  e.preventDefault();
  const data = e.clipboardData;

  // d) pasted image files
  if (data.files.length > 0) {
    return [...data.files].filter((f) => f.type.startsWith("image/")).map(uploadAsImageBlock);
  }

  // b) HTML → sanitize with an allow-list
  const html = data.getData("text/html");
  if (html) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["p", "h1", "h2", "h3", "ul", "ol", "li", "b", "strong", "i", "em", "a", "code", "pre", "br"],
      ALLOWED_ATTR: ["href"],
    });
    const doc = new DOMParser().parseFromString(clean, "text/html");
    return htmlToBlocks(doc.body, currentBlock, nextKey);
  }

  // c) plain text
  const text = data.getData("text/plain");
  let prevKey = currentBlock.sortKey;
  return text.split("\n").map((line) => {
    prevKey = keyBetween(prevKey, nextKey);
    return {
      id: crypto.randomUUID(),
      type: "text",
      properties: { text: [{ text: line, marks: [] }] },
      parentId: currentBlock.parentId,
      sortKey: prevKey,
      childIds: [],
    };
  });
}

// <h1> → heading_1, <li> → bulleted_list, <p> → text, <b> → "bold" mark ...
function htmlToBlocks(body, currentBlock, nextKey) { /* walk DOM nodes → blocks + spans */ }
function uploadAsImageBlock(file) { /* signed URL upload, show local preview first */ }

/*
-------------------------------------------------------------------------------
DEFENCE IN DEPTH (say all three)
-------------------------------------------------------------------------------
1. Sanitize on paste (DOMPurify allow-list).
2. Store spans (JSON), never raw HTML → React escapes on render.
3. Content-Security-Policy header blocks inline scripts even if 1 & 2 fail.
   And links: only allow http/https (block "javascript:").

Interview line:
"Paste is the main XSS entry point in an editor. I sanitize with an
allow-list, convert to my own JSON model, and render through React,
with CSP as a final safety net."
*/
