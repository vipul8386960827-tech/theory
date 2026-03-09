import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const editorRef = useRef(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const applyFormat = (tagname) => {
    const selection = window.getSelection();

    const range = selection.getRangeAt(0);
    const wrapper = document.createElement(tagname);
    saveState();

    range.surroundContents(wrapper);
  };
  const saveState = () => {
    const currentHtml = editorRef.current.innerHTML;
    setUndoStack((prev) => [...prev, currentHtml]);
    setRedoStack([]);
  };
  const undo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    const currentState = editorRef.current.innerHTML;
    setRedoStack((prev) => [...prev, currentState]);
    setUndoStack((prev) => prev.slice(0, -1));

    editorRef.current.innerHTML = previousState;
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    const currentState = editorRef.current.innerHTML;

    setUndoStack((prev) => [...prev, currentState]);
    setRedoStack((prev) => prev.slice(0, -1));

    editorRef.current.innerHTML = nextState;
  };

  const handleKeyDown = (e) => {
    const shortCuts = {
      b: "strong",
      i: "em",
      u: "u",
    };
    const key = e.key.toLowerCase();
    const isModifier = e.ctrlKey;

    if (isModifier && shortCuts[key]) {
      e.preventDefault();
      applyFormat(shortCuts[key]);
    }
    if (e.key === "Backspace") {
      const selection = window.getSelection();
      const parent = selection.anchorNode.parentElement;
      if (parent !== editorRef.current && parent.innerText.length <= 1)
        parent.remove();
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            applyFormat("strong");
          }}
        >
          Bold
        </button>
        <button
          onClick={() => {
            applyFormat("em");
          }}
        >
          Italic
        </button>
        <button
          onClick={() => {
            applyFormat("u");
          }}
        >
          Underline
        </button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div
        onKeyDown={handleKeyDown}
        ref={editorRef}
        contentEditable={true}
        style={{ height: "500px", padding: "8px", border: "solid 1px black" }}
      ></div>
    </div>
  );
}
