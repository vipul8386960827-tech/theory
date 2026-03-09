import { useRef, useState } from "react";

export default function App() {
  const editorRef = useRef(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // 1. COLLABORATION: Helper to send operations to a backend
  const broadcastOperation = (op) => {
    console.log("Broadcasting Operation:", op);
    // In a real app, you would do: socket.emit("new-op", op);
  };

  const applyFormat = (tagname) => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    saveState();
    const range = selection.getRangeAt(0);
    const wrapper = document.createElement(tagname);

    // 2. COLLABORATION: Format Operation
    broadcastOperation({
      type: "format",
      tag: tagname,
      range: [range.startOffset, range.endOffset],
      content: selection.toString(),
    });

    range.surroundContents(wrapper);
  };

  const saveState = () => {
    const currentHtml = editorRef.current.innerHTML;
    setUndoStack((prev) => [...prev, currentHtml]);
    setRedoStack([]);
  };

  // 3. COLLABORATION: Capture typing and deletions
  const handleInput = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    broadcastOperation({
      type: e.inputType, // e.g., "insertText", "deleteContentBackward"
      data: e.data, // The character typed
      offset: range.startOffset,
    });
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
    const shortCuts = { b: "strong", i: "em", u: "u" };
    const key = e.key.toLowerCase();
    const isModifier = e.ctrlKey || e.metaKey;

    if (isModifier) {
      if (key === "z") {
        e.preventDefault();
        undo();
      } else if (key === "y") {
        e.preventDefault();
        redo();
      } else if (shortCuts[key]) {
        e.preventDefault();
        applyFormat(shortCuts[key]);
      }
    }

    if (e.key === "Backspace") {
      const selection = window.getSelection();
      const parent = selection.anchorNode.parentElement;
      if (parent !== editorRef.current && parent.innerText.length <= 1) {
        parent.remove();
      }
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => applyFormat("strong")}>Bold</button>
        <button onClick={() => applyFormat("em")}>Italic</button>
        <button onClick={() => applyFormat("u")}>Underline</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div
        onKeyDown={handleKeyDown}
        onInput={handleInput} // Added listener for operations
        ref={editorRef}
        contentEditable={true}
        style={{
          height: "500px",
          padding: "8px",
          border: "solid 1px black",
          outline: "none",
        }}
      ></div>
    </div>
  );
}
