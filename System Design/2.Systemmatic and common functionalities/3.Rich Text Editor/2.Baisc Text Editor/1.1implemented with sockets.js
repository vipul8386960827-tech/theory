import "./styles.css";
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

export default function App({ documentId }) {
  const editorRef = useRef(null);
  const socketRef = useRef(null);

  /* ---------------- WebSocket Setup ---------------- */
  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = io("http://localhost:3000", {
      auth: { documentId },  // only send documentId
      withCredentials: true, // sends HTTP-only cookies for auth
    });

    // ---------------- Handle access denied ----------------
    socketRef.current.on("access-denied", () => {
      alert("You do not have access to this document.");
      // Optionally redirect to another page
      window.location.href = "/permission-denied";
    });

    // Receive initial snapshot from server
    socketRef.current.on("snapshot", (html) => {
      if (editorRef.current) editorRef.current.innerHTML = html;
    });

    // Receive edits from other users
    socketRef.current.on("edit", (html) => {
      if (!editorRef.current) return;

      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

      editorRef.current.innerHTML = html;

      if (range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    // Cleanup on unmount or documentId change
    return () => {
      socketRef.current.disconnect();
    };
  }, [documentId]);

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

    emitChange();
  };

  /* ---------------- Emit change to WebSocket ---------------- */
  const emitChange = () => {
    if (!socketRef.current || !editorRef.current) return;

    socketRef.current.emit("edit", {
      documentId,
      content: editorRef.current.innerHTML,
    });
  };

  return (
    <div>
      <h1>Rich Text Editor</h1>

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
        onInput={emitChange}
        style={{ height: "500px", border: "solid black 1px", padding: "4px" }}
      ></div>
    </div>
  );
}
