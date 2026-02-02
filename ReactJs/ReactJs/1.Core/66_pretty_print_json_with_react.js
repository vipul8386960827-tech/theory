/*
=====================================
Pretty Print JSON in ReactJS
=====================================

Definition:
Pretty printing JSON in ReactJS means displaying JSON data in a 
human-readable format with proper indentation and structure.

-------------------------------------
Key Points:
-------------------------------------
- Use `JSON.stringify(data, null, spacing)` to format JSON.  
  - `data` → JavaScript object or array  
  - `null` → replacer function (not needed for basic formatting)  
  - `spacing` → number of spaces for indentation  
- Display using `<pre>` tag to preserve formatting.  
- Can also use libraries for syntax highlighting (optional).

-------------------------------------
Example 1: Basic Pretty Print
-------------------------------------
import React from "react";

function PrettyJSON({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Usage:
// const user = { id: 1, name: "Alice", age: 25 };
// <PrettyJSON data={user} />

-------------------------------------
Example 2: Handling Array of Objects
-------------------------------------
function UsersList({ users }) {
  return <pre>{JSON.stringify(users, null, 4)}</pre>;
}

// Usage:
// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" }
// ];
// <UsersList users={users} />

-------------------------------------
Example 3: Optional Syntax Highlighting
-------------------------------------
import React from "react";
import ReactJson from "react-json-view"; // npm install react-json-view

function PrettyJSONView({ data }) {
  return <ReactJson src={data} theme="monokai" />;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Pretty printing JSON is like formatting a book 📖 with paragraphs, 
indentation, and spacing — easier to read and understand.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why use `<pre>` tag?
A1: It preserves spaces and line breaks, keeping the formatted JSON readable.

Q2: What does the second argument `null` in JSON.stringify mean?
A2: It’s a replacer function to filter/transform values; null means no transformation.

Q3: Can you pretty print large JSON efficiently?
A3: For large JSON, consider libraries like react-json-view to prevent UI lag.

Q4: Can you make it editable in React?
A4: Yes, libraries like react-json-view allow editing, collapsing, and expanding nodes.

Q5: Why not just use console.log?
A5: console.log is fine for debugging, but pretty printing in the UI allows end-users or admin panels to view structured JSON.
*/
