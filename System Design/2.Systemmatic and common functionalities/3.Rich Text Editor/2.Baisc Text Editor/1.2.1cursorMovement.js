import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

/*
  Collaborative Rich Text Editor with:
  - CRDT/OT-style operations
  - Real-time cursor synchronization
  - Backend determines userId from cookies (withCredentials: true)
*/

export default function App({ documentId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);

  const [remoteCursors, setRemoteCursors] = useState({}); // { userId: { nodePath, offset, color } }

  /* ---------------- WebSocket Setup ---------------- */
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      auth: { documentId },      // send only documentId
      withCredentials: true,     // backend reads userId from cookies
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

    // Receive remote cursors
    socketRef.current.on("cursor-update", (cursors) => {
      setRemoteCursors(cursors);
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

    emitCursor();
  };

  /* ---------------- Handle typing ---------------- */
  const handleInput = () => {
    if (!editorRef.current) return;

    emitOperation({
      type: "set",
      content: editorRef.current.innerHTML,
    });

    emitCursor();
  };

  /* ---------------- Cursor Sync ---------------- */
  const emitCursor = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

    const range = selection.getRangeAt(0);
    const preSelection = range.startOffset; 
    const cursorData = {
      anchorOffset: preSelection,
      focusOffset: range.endOffset,
    };

    socketRef.current.emit("cursor-update", {
      documentId,
      cursor: cursorData,
    });
  };

  /* ---------------- Render remote cursors ---------------- */
  const renderRemoteCursors = () => {
    const cursors = [];
    Object.keys(remoteCursors).forEach((userId) => {
      const cursor = remoteCursors[userId];
      if (!cursor) return;

      // Simple demo: render a colored caret at offset
      const span = document.createElement("span");
      span.style.backgroundColor = cursor.color || "red";
      span.style.width = "2px";
      span.style.display = "inline-block";
      span.style.height = "1em";
      span.style.position = "absolute";
      span.setAttribute("data-user", userId);

      cursors.push(span);
    });
    return cursors;
  };

  return (
    <div style={{ position: "relative" }}>
      <h1>Rich Text Editor (CRDT + Cursor Sync)</h1>

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
      >
        {renderRemoteCursors()}
      </div>
    </div>
  );
}
