import "./styles.css";
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

/*
  Character-level operations with formatting support
  - insert/delete characters
  - formatting (bold, italic, underline, strikethrough)
  - mentions or any inline elements can be handled similarly
*/

export default function App({ documentId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const lastContentRef = useRef(""); // to calculate diffs

  /* ---------------- WebSocket Setup ---------------- */
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      auth: { documentId },
      withCredentials: true,
    });

    socketRef.current.on("access-denied", () => {
      alert("You do not have access to this document.");
      window.location.href = "/permission-denied";
    });

    socketRef.current.on("snapshot", (html) => {
      if (editorRef.current) {
        editorRef.current.innerHTML = html;
        lastContentRef.current = html;
      }
    });

    socketRef.current.on("operation", (op) => {
      applyRemoteOperation(op);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [documentId]);

  /* ---------------- Apply remote operations ---------------- */
  const applyRemoteOperation = (op) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    if (op.type === "set") {
      // For formatting or large changes, we set innerHTML
      editorRef.current.innerHTML = op.content;
    } else if (op.type === "insert") {
      const textNode = editorRef.current.firstChild || document.createTextNode("");
      if (!editorRef.current.firstChild) editorRef.current.appendChild(textNode);
      textNode.insertData(op.index, op.char);
    } else if (op.type === "delete") {
      const textNode = editorRef.current.firstChild;
      if (textNode) textNode.deleteData(op.index, 1);
    }

    lastContentRef.current = editorRef.current.innerHTML;

    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  /* ---------------- Emit operations ---------------- */
  const emitOperations = (newContent) => {
    const oldContent = lastContentRef.current;
    const minLen = Math.min(oldContent.length, newContent.length);

    let diffIndex = 0;
    while (diffIndex < minLen && oldContent[diffIndex] === newContent[diffIndex]) {
      diffIndex++;
    }

    // deletions
    for (let i = oldContent.length - 1; i >= diffIndex; i--) {
      socketRef.current.emit("operation", {
        documentId,
        type: "delete",
        index: i,
      });
    }

    // insertions
    for (let i = diffIndex; i < newContent.length; i++) {
      socketRef.current.emit("operation", {
        documentId,
        type: "insert",
        index: i,
        char: newContent[i],
      });
    }

    lastContentRef.current = newContent;
  };

  /* ---------------- Formatting ---------------- */
  const handleAction = (action) => {
    const element = editorRef.current;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!element.contains(range.commonAncestorContainer)) return;

    const containerType = () => {
      const container =
        range.commonAncestorContainer.nodeType === 3
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer;
      return container.closest(action);
    };

    const prev = containerType();

    if (prev) {
      // remove formatting
      prev.replaceWith(...prev.childNodes);
    } else {
      // apply formatting
      const el = document.createElement(action);
      el.appendChild(range.extractContents());
      range.insertNode(el);
    }

    // emit the full content as "set" operation for formatting
    socketRef.current.emit("operation", {
      documentId,
      type: "set",
      content: element.innerHTML,
    });

    lastContentRef.current = element.innerHTML;
  };

  /* ---------------- Handle typing ---------------- */
  const handleInput = () => {
    if (!editorRef.current) return;
    emitOperations(editorRef.current.innerHTML);
  };

  return (
    <div>
      <h1>Rich Text Editor (Character + Formatting Operations)</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button onClick={() => handleAction("strong")}>B</button>
          <button onClick={() => handleAction("em")}>I</button>
          <button onClick={() => handleAction("u")}>U</button>
          <button onClick={() => handleAction("s")} style={{ textDecoration: "line-through" }}>S</button>
        </div>
        <div>
          <button /* TODO: local undo */>Undo</button>
          <button /* TODO: local redo */>Redo</button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable={true}
        id="edit-area"
        onInput={handleInput}
        style={{ height: "500px", border: "solid black 1px", padding: "4px" }}
      ></div>
    </div>
  );
}
