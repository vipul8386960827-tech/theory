import { useRef } from "react";

export default function SquareEditor() {
  const editorRef = useRef(null);

  const handleAction = (command) => {
    // This executes formatting on the currently highlighted text
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const logContent = () => {
    // This is how you get the data out to save it
    console.log("Saving Content:", editorRef.current.innerHTML);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* 1. Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => handleAction("bold")}
          className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50 font-bold"
        >
          B
        </button>
        <button
          onClick={() => handleAction("italic")}
          className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50 italic"
        >
          I
        </button>
        <button
          onClick={() => handleAction("underline")}
          className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50 underline"
        >
          U
        </button>
      </div>

      {/* 2. The Square Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true} // Prevents React from complaining about nested content
        className="w-80 h-80 bg-white border-2 border-blue-400 rounded-lg shadow-xl p-6 outline-none focus:ring-4 focus:ring-blue-100 overflow-auto text-gray-800 text-lg"
      >
        Start typing your story here...
      </div>

      {/* 3. Footer Action */}
      <button
        onClick={logContent}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
      >
        Save to Console
      </button>
    </div>
  );
}
//contentEditable is a global HTML attribute that, when added to an element,
// turns it into an editable field directly in the browser. Unlike a <textarea>,
// which only handles plain text, contentEditable allows you to type, style, and
// structure content (like adding bolding, images, or lists) within that specific element.
