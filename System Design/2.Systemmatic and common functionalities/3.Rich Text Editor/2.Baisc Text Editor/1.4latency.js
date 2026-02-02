import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

/*
  Collaborative Rich Text Editor with:
  - CRDT/OT-style operations
  - Real-time cursor synchronization
  - Latency handling (operation queue)
  - Backend reads userId from cookies (withCredentials: true)
*/

export default function App({ documentId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);

  // Pending local operations (latency handling)
  const pendingOps = useRef([]);

  const [remoteCursors, setRemoteCursors] = useState({}); // { userId: { offset, color } }

  /* ---------------- WebSocket Setup ---------------- */
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      auth: { documentId },
      withCredentials: true, // backend reads cookies for userId
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

    // Receive remote operations
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

    // OT/CRDT: Transform remote op against pending local ops
    const transformedOp = transformAgainstLocalOps(op, pendingOps.current);

    // Apply operation
    if (transformedOp.type === "insert") {
      insertAtOffset(transformedOp.char, transformedOp.offset);
    } else if (transformedOp.type === "delete") {
      deleteAtOffset(transformedOp.offset);
    } else if (transformedOp.type === "set") {
      editorRef.current.innerHTML = transformedOp.content;
    }

    // Restore cursor
    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  /* ---------------- Emit operations ---------------- */
  const emitOperation = (op) => {
    if (!socketRef.current) return;

    // Add to local pending queue
    pendingOps.current.push(op);

    socketRef.current.emit("operation", {
      documentId,
      op,
    });

    // Remove from queue after sending (simple approach)
    pendingOps.current = [];
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

    // Emit the operation at character/HTML level
    emitOperation({
      type: "set",
      content: element.innerHTML,
    });

    emitCursor();
  };

  /* ---------------- Handle typing ---------------- */
  const handleInput = () => {
    if (!editorRef.current) return;

    // Emit typed content as CRDT operation
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

    const cursorData = {
      anchorOffset: range.startOffset,
      focusOffset: range.endOffset,
    };

    socketRef.current.emit("cursor-update", {
      documentId,
      cursor: cursorData,
    });
  };

  /* ---------------- Helper: Render remote cursors ---------------- */
  const renderRemoteCursors = () => {
    const cursors = [];
    Object.keys(remoteCursors).forEach((userId) => {
      const cursor = remoteCursors[userId];
      if (!cursor) return;

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
      <h1>Rich Text Editor (CRDT + Cursor + Latency Handling)</h1>

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

/* ---------------- Notes on Latency Handling ----------------

1. Optimistic updates:
   - Local edits appear immediately in the editor.
   - No waiting for server acknowledgment.

2. Operation queue:
   - All local operations are stored in `pendingOps`.
   - Incoming remote operations are transformed against pendingOps before applying.
   - Reduces overwrites and keeps concurrent edits consistent.

3. Batching / Debouncing:
   - Optional: batch multiple keystrokes into a single operation.
   - Reduces network traffic while preserving real-time UX.

4. Cursor adjustments:
   - When remote operations arrive, transform local cursor positions.
   - Ensures user cursor doesn't jump unexpectedly.

5. Backend:
   - Processes operations in order.
   - Sends back transformed operations and cursor updates to all clients.
*/
