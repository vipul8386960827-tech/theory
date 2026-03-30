/*
 Webpack = Module Bundler

 👉 What it does:
 - Takes all your project files (JS, CSS, images, etc.)
 - Builds a dependency graph
 - Bundles everything into optimized files for the browser


 👉 Main uses:

 1. Bundling
 Combines multiple files into fewer files
 Example: 50 JS files → 1 bundle.js

 2. Dependency Management
 Automatically resolves imports across files
 import A → import B → import C → handled internally

 3. Code Splitting
 Splits code into chunks and loads them when needed
 Example: load dashboard code only when user opens dashboard

 4. Asset Handling
 Allows importing non-JS files
 import "./styles.css"
 import image from "./logo.png"

 5. Transpiling (via loaders)
 Converts modern JS → older browser-compatible JS
 Uses tools like Babel

 6. Optimization
 - Minifies code (reduces size)
 - Tree shaking (removes unused code)
 - Adds hashes (e.g., [contenthash]) for caching

 7. Development Features
 - Hot Module Replacement (HMR)
 - Fast rebuilds during development


 👉 Core Concepts:

 Entry → Starting point of the app
 entry: "./src/index.js"

 Output → Where bundled files go
 output: {
   filename: "bundle.js"
 }

 Loaders → Handle different file types
 Example: babel-loader, css-loader

 Plugins → Extend functionality
 Example: HTML generation, environment variables


 👉 Simple idea:
 Webpack = Takes your messy project files → outputs clean, optimized bundles

 */
