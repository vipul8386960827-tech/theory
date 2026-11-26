/* 17_dynamic_import.js

=====================================================
Dynamic import()
=====================================================

Definition (What I should say in the interview):
- "Dynamic import() lets me load a module **at runtime, on demand**, instead of at startup. It
   looks like a function call, takes a specifier that can be a variable, and returns a **Promise**
   that resolves to the module namespace object. It works in both ESM and CommonJS, so it is also
   the standard way for CommonJS code to load an ES module. I use it for lazy loading heavy
   libraries, loading plugins by name, or conditional loading."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Returns Promise<namespace> -> use await or .then().
2. Default export is under .default; named exports are properties.
3. Specifier can be computed: import(`./locales/${lang}.js`).
4. Works in CJS files -> how CJS loads ESM-only packages (chalk 5, node-fetch 3, etc.).
5. Results are cached like normal imports - second import() is fast.

-----------------------------------------------------
Example
-----------------------------------------------------
// Lazy-load a heavy library only when the route is hit
app.get('/report', async (req, res) => {
  const { default: PDFDocument } = await import('pdfkit');
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.text('Monthly report');
  doc.end();
});

// Plugin loading by name
async function loadPlugin(name) {
  const mod = await import(`./plugins/${name}.js`);
  return mod.default;
}

// CommonJS file using an ESM-only package
// index.cjs
(async () => {
  const { default: chalk } = await import('chalk');
  console.log(chalk.green('ok'));
})();

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Forgetting .default: const chalk = await import('chalk') gives the namespace, not the function.
- Bundlers cannot analyze fully dynamic paths; keep part of the path static.
- Absolute file paths on Windows must be URLs: import(pathToFileURL(p).href), not 'C:\x.js'.
- Never pass user input directly into import() - it can load arbitrary files.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between static import and import()?
A1: Static is hoisted, top level only, resolved before execution. import() runs at that line,
    can be conditional, and is asynchronous.

Q2: Can you use import() in a CommonJS module?
A2: Yes, it is available in both systems. That is the classic way to use ESM-only packages from CJS.

Q3: How do you handle a module that fails to load?
A3: import() rejects, so wrap it in try/catch with await (or .catch()) and fall back.
*/
