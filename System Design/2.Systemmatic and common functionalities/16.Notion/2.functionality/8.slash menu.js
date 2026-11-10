/*
===============================================================================
NOTION — SLASH "/" COMMAND MENU
===============================================================================

FLOW:
1. User types "/" → open a popup at the caret position.
   - Position: range.getBoundingClientRect() of the caret.
   - Render in a PORTAL so it isn't clipped by overflow containers.
   - Flip above the caret if there's no room below.
2. Text typed after "/" filters the list ("/hea" → Heading 1, 2, 3).
3. ↑ ↓ move highlight, Enter picks, Esc closes, clicking outside closes.
4. Picking an option:
   - Empty block → change its `type` ("Turn into").
   - Block with text → insert a NEW block of that type below.
   - Remove the "/query" text from the block.

ACCESSIBILITY:
- role="listbox" on the menu, role="option" on items.
- Focus STAYS in the editor; use aria-activedescendant to point at the
  highlighted option so screen readers announce it.
*/

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

const COMMANDS = [
  { type: "text", label: "Text", keywords: ["plain", "paragraph"] },
  { type: "heading_1", label: "Heading 1", keywords: ["h1", "title"] },
  { type: "todo", label: "To-do list", keywords: ["checkbox", "task"] },
  { type: "bulleted_list", label: "Bulleted list", keywords: ["ul", "bullet"] },
  { type: "code", label: "Code", keywords: ["snippet"] },
  { type: "image", label: "Image", keywords: ["photo", "picture"] },
  { type: "page", label: "Page", keywords: ["subpage"] },
];

export function SlashMenu({ query, caretRect, onSelect, onClose }) {
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.some((k) => k.startsWith(q))
    );
  }, [query]);

  // Called from the EDITOR's keydown handler while the menu is open
  SlashMenu.handleKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); results[active] && onSelect(results[active].type); }
    else if (e.key === "Escape") { onClose(); }
  };

  if (results.length === 0) return null;   // "/xyz" with no match → just text

  return createPortal(
    <ul
      role="listbox"
      aria-activedescendant={`slash-${results[active]?.type}`}
      style={{ position: "fixed", top: caretRect.bottom + 4, left: caretRect.left }}
    >
      {results.map((c, i) => (
        <li
          key={c.type}
          id={`slash-${c.type}`}
          role="option"
          aria-selected={i === active}
          onMouseEnter={() => setActive(i)}
          onMouseDown={(e) => { e.preventDefault(); onSelect(c.type); }} // keep editor focus
        >
          {c.label}
        </li>
      ))}
    </ul>,
    document.body
  );
}

/*
Interview line:
"The slash menu doesn't take focus. The editor keeps focus and forwards arrow
keys to the menu, and aria-activedescendant tells screen readers which option
is highlighted. Picking an option is just a 'type' change on the block."
*/
