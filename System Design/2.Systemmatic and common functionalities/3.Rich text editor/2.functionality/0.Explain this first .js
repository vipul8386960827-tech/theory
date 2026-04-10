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
/*
  THEORY OF THIS APPROACH (The Native DOM Strategy):
  
  1. The "Source of Truth" is the DOM: 
     The app relies on the browser's internal 'contentEditable' engine to 
     handle typing, cursor movement, and internal HTML structure.

  2. Selection API (window.getSelection):
     When the user clicks 'Bold', we query the browser for the 'Selection' object. 
     This represents the physical range of text the user highlighted with their mouse.

  3. Range API (selection.getRangeAt(0)):
     We extract the first 'Range' (the start and end points in the DOM tree).
     This range knows exactly which text nodes it spans.

  4. DOM Mutation (surroundContents):
     We manually create a new DOM element (e.g., <strong>).
     The browser then tries to 'wrap' the selected text inside this new tag.
     It physically moves nodes around in the Live DOM tree.
*/
