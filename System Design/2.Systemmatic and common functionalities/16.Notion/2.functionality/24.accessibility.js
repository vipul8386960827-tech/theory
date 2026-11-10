/*
===============================================================================
NOTION — ACCESSIBILITY (a11y)
===============================================================================

An editor is one of the HARDEST things to make accessible. Say these points:

-------------------------------------------------------------------------------
1. KEYBOARD-ONLY USAGE (everything must work without a mouse)
-------------------------------------------------------------------------------
- Arrow keys move between blocks; Enter/Backspace/Tab as in file 7.
- Esc selects the current block → arrows extend the block selection.
- Ctrl/Cmd + Shift + ↑/↓ moves blocks (keyboard alternative to drag).
- Ctrl/Cmd + / opens the block action menu (turn into, delete, duplicate).
- Visible focus ring everywhere (:focus-visible).
- Skip link: "Skip to page content" past the sidebar.

-------------------------------------------------------------------------------
2. SEMANTICS (screen readers)
-------------------------------------------------------------------------------
- Each text block: contentEditable with role="textbox" aria-multiline="true",
  and an aria-label for its type ("Heading 1", "To-do, not checked").
- Real semantic tags when rendering: <h1>-<h3>, <ul>/<li>, <blockquote>.
- To-do checkbox: a real <input type="checkbox"> or role="checkbox" +
  aria-checked.
- Images: alt text field on image blocks.

-------------------------------------------------------------------------------
3. MENUS & POPUPS
-------------------------------------------------------------------------------
- Slash menu: role="listbox" + aria-activedescendant, focus stays in the
  editor (file 8).
- Share dialog / modals: role="dialog", aria-modal, FOCUS TRAP, Esc closes,
  focus RETURNS to the button that opened it.
- Sidebar: ARIA tree pattern (file 20).

-------------------------------------------------------------------------------
4. LIVE UPDATES
-------------------------------------------------------------------------------
- aria-live="polite" region for: "Saved", "You're offline",
  "Ravi joined the page", "Block moved to position 3".
- Do NOT announce every remote keystroke (far too noisy).

-------------------------------------------------------------------------------
5. VISUAL
-------------------------------------------------------------------------------
- Colour contrast ≥ 4.5:1 (WCAG AA), including collaborator colours
  (don't rely on colour alone: show the name tag too).
- Respect prefers-reduced-motion (drag animations, transitions).
- Zoom to 200% without breaking the layout.

-------------------------------------------------------------------------------
6. TESTING
-------------------------------------------------------------------------------
- axe-core in CI, manual testing with NVDA / VoiceOver, keyboard-only pass.

Interview line:
"Everything works from the keyboard, menus follow ARIA patterns with focus
kept in the editor, dialogs trap and restore focus, and status changes are
announced through a polite live region."
*/
