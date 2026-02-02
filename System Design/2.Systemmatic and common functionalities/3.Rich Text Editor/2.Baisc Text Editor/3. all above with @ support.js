import "./styles.css";
import { useRef, useState } from "react";

const USERS = ["john", "jane", "alex", "maria", "robert"];

export default function App() {
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const editorRef = useRef(null);
  const mentionRangeRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [, forceUpdate] = useState(0);

  /* ---------------- Undo / Redo ---------------- */

  const saveState = () => {
    undoStack.current.push(editorRef.current.innerHTML);
    redoStack.current.length = 0;
    forceUpdate((n) => n + 1);
  };

  const undo = () => {
    if (undoStack.current.length === 0) return;
    redoStack.current.push(editorRef.current.innerHTML);
    editorRef.current.innerHTML = undoStack.current.pop();
    forceUpdate((n) => n + 1);
  };

  const redo = () => {
    if (redoStack.current.length === 0) return;
    undoStack.current.push(editorRef.current.innerHTML);
    editorRef.current.innerHTML = redoStack.current.pop();
    forceUpdate((n) => n + 1);
  };

  /* ---------------- Formatting ---------------- */

  const handleAction = (action) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) return;

    saveState();

    const container =
      range.commonAncestorContainer.nodeType === 3
        ? range.commonAncestorContainer.parentNode
        : range.commonAncestorContainer;

    const prev = container.closest(action);

    if (prev) {
      prev.replaceWith(...prev.childNodes);
    } else {
      const el = document.createElement(action);
      el.appendChild(range.extractContents());
      range.insertNode(el);
    }
  };

  /* ---------------- @ Mention Logic ---------------- */

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      mentionRangeRef.current = range.cloneRange();

      const rect = range.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });

      setShowDropdown(true);
    }
  };

  const insertMention = (name) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    saveState();

    // Move caret back one position to select "@"
    range.setStart(range.startContainer, range.startOffset - 1);
    range.deleteContents();

    const mention = document.createElement("span");
    mention.textContent = `@${name}`;
    mention.contentEditable = "false";
    mention.style.background = "#e0f2ff";
    mention.style.padding = "2px 4px";
    mention.style.borderRadius = "4px";

    const space = document.createTextNode("\u00A0");

    range.insertNode(space);
    range.insertNode(mention);

    range.setStartAfter(space);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    setShowDropdown(false);
  };

  return (
    <div>
      <h1>Rich Text Editor</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button onClick={() => handleAction("strong")}>B</button>
          <button onClick={() => handleAction("em")}>I</button>
          <button onClick={() => handleAction("u")}>U</button>
          <button
            onClick={() => handleAction("s")}
            style={{ textDecoration: "line-through" }}
          >
            S
          </button>
        </div>

        <div>
          <button onClick={undo} disabled={undoStack.current.length === 0}>
            Undo
          </button>
          <button onClick={redo} disabled={redoStack.current.length === 0}>
            Redo
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={saveState}
        onKeyDown={handleKeyDown}
        style={{
          height: "300px",
          border: "1px solid black",
          padding: "6px",
          marginTop: "8px",
        }}
      />

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: dropdownPos.top,
            left: dropdownPos.left,
            border: "1px solid #ccc",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {USERS.map((user) => (
            <div
              key={user}
              onMouseDown={(e) => {
                e.preventDefault(); // keep focus
                insertMention(user);
              }}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              @{user}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
