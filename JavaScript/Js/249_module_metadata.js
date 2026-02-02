/* 249_module_metadata.js

=====================================================
Module Metadata in JavaScript (import.meta) – Interview-Ready Answer
=====================================================

Definition:
- "Module metadata in JavaScript provides information about the current ES module. 
   This is accessed using the `import.meta` object."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. `import.meta` is an object containing metadata about the current module.
2. Commonly used property: `import.meta.url`
   - Returns the absolute URL of the module file.
3. Mainly available in ES modules (not in CommonJS).
4. Helps in working with file paths, module location, and module-specific operations.
5. Useful in environments like browsers and Node.js (with ESM).

-----------------------------------------------------
Examples:

// Example 1: Getting module URL
console.log(import.meta.url);
// e.g., "file:///Users/kaizer/projects/module.js"

// Example 2: Using in Node.js (ESM)
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename); // Full path to current file
console.log(__dirname);  // Directory of current file

// Example 3: Custom environments
// Some tools/frameworks extend import.meta with extra properties
console.log(import.meta.env); // Common in Vite.js for env variables

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of `import.meta` like a book’s cover page:
  It tells you details about the book itself (title, author, edition).
  Similarly, `import.meta` gives details about the module itself.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `import.meta` provides contextual info about the current file/module.
- `import.meta.url` is the most widely used property.
- It bridges file-based operations (like resolving paths) in ESM environments.

-----------------------------------------------------
Example / Usage:

// Vite.js / Frontend Example
if (import.meta.env.DEV) {
  console.log("Running in development mode");
}

// Node.js Example
console.log("Current module URL:", import.meta.url);

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is `import.meta.url` used for?
A1: To get the absolute URL of the current module, often used for resolving file paths.

Q2: Is `import.meta` available in CommonJS?
A2: No, it’s only available in ES modules.

Q3: Can `import.meta` be extended?
A3: Yes, bundlers like Vite.js extend it with custom properties like `import.meta.env`.

Q4: Difference between `__dirname` and `import.meta.url` in Node.js?
A4: `__dirname` is CommonJS-specific, while `import.meta.url` is the ESM equivalent.

Q5: Why is module metadata important?
A5: It allows modules to be self-aware of their location and environment, 
    which helps in tasks like path resolution and environment-specific configurations.
*/
