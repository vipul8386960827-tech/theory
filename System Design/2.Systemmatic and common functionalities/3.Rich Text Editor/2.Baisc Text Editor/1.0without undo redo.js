import "./styles.css";

export default function App() {
  const handleAction = (action) => {
    const element = document.getElementById("edit-area");
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
  };
  return (
    <div>
      <h1>Rich Text Editor</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          <button>Undo</button>
          <button>Redo</button>
        </div>
      </div>
      <div
        id="edit-area"
        contentEditable={true}
        style={{ height: "500px", border: "solid black 1px", padding: "4px" }}
      ></div>
    </div>
  );
}
