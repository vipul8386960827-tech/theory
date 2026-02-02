import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // dummy state just to trigger re-render
  const [, forceUpdate] = useState(0);

  const saveState = () => {
    const editor = document.getElementById("edit-area");
    undoStack.current.push(editor.innerHTML);
    redoStack.current.length = 0;
    forceUpdate((n) => n + 1);
  };

  const undo = () => {
    const editor = document.getElementById("edit-area");
    if (undoStack.current.length === 0) return;

    redoStack.current.push(editor.innerHTML);
    editor.innerHTML = undoStack.current.pop();
    forceUpdate((n) => n + 1);
  };

  const redo = () => {
    const editor = document.getElementById("edit-area");
    if (redoStack.current.length === 0) return;

    undoStack.current.push(editor.innerHTML);
    editor.innerHTML = redoStack.current.pop();
    forceUpdate((n) => n + 1);
  };

  const handleAction = (action) => {
    const element = document.getElementById("edit-area");
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!element.contains(range.commonAncestorContainer)) return;

    saveState();

    const containerType = () => {
      const container =
        range.commonAncestorContainer.nodeType === 3
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer;
      return container.closest(action);
    };

    const prev = containerType();

    if (prev) {
      prev.replaceWith(...prev.childNodes);
    } else {
      const transformText = document.createElement(action);
      transformText.appendChild(range.extractContents());
      range.insertNode(transformText);
    }
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
        id="edit-area"
        contentEditable
        onInput={saveState}
        style={{
          height: "500px",
          border: "1px solid black",
          padding: "4px",
        }}
      />
    </div>
  );
}
