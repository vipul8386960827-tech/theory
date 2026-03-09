import { useRef } from "react";
import "./styles.css";

export default function App() {
  const editorRef = useRef(null);
  const applyFormat = (tagname) => {
    const selection = window.getSelection();

    const range = selection.getRangeAt(0);
    const wrapper = document.createElement(tagname);

    range.surroundContents(wrapper);
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
      </div>
      <div
        ref={editorRef}
        contentEditable={true}
        style={{ height: "500px", padding: "8px", border: "solid 1px black" }}
      ></div>
    </div>
  );
}
