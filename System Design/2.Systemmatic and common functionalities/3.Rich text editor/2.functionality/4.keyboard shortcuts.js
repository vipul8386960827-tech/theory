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

  const handleKeyDown = (e) => {
    const shortCuts = {
      b: "strong",
      i: "em",
      u: "u",
    };
    const key = e.key.toLowerCase();
    const isModifier = e.ctrlKey;
    console.log(e.ctrlKey);

    if (isModifier && shortCuts[key]) {
      e.preventDefault();
      applyFormat(shortCuts[key]);
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
