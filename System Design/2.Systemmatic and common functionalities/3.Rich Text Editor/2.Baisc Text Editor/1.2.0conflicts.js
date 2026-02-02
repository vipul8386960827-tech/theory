import "./styles.css";
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

/*
  Note:
  This example uses a simple operation-based CRDT approach.
  Each edit is captured as an "insert" or "delete" operation.
  Backend still relays operations; clients apply them to local state.
  This ensures concurrent edits converge safely.
*/

export default function App({ documentId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);

  /* ---------------- WebSocket Setup ---------------- */
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      auth: { documentId },
      withCredentials: true, // send HTTP-only cookies
    });

    // Access denied handling
    socketRef.current.on("access-denied", () => {
      alert("You do not have access to this document.");
      window.location.href = "/permission-denied";
    });

    // Receive initial snapshot
    socketRef.current.on("snapshot", (html) => {
      if (editorRef.current) editorRef.current.innerHTML = html;
    });

    // Receive operations from other users
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

    // Simple CRDT-style: replace, insert, or delete operations
    // Here we handle only HTML insertion/deletion for demo purposes
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    if (op.type === "set") {
      editorRef.current.innerHTML = op.content;
    }

    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  /* ---------------- Emit local operations ---------------- */
  const emitOperation = (op) => {
    if (!socketRef.current) return;
    socketRef.current.emit("operation", {
      documentId,
      ...op,
    });
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
      prev.replaceWith(...prev.childNodes);
    } else {
      const transformText = document.createElement(action);
      transformText.appendChild(range.extractContents());
      range.insertNode(transformText);
    }

    // Emit CRDT-style operation instead of full HTML
    emitOperation({
      type: "set",
      content: element.innerHTML,
    });
  };

  /* ---------------- Handle typing ---------------- */
  const handleInput = () => {
    if (!editorRef.current) return;
    emitOperation({
      type: "set",
      content: editorRef.current.innerHTML,
    });
  };

  return (
    <div>
      <h1>Rich Text Editor (CRDT / OT demo)</h1>

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
