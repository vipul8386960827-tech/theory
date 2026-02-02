/* 86_features_of_create_react_app.js

=====================================================
Features of Create React App (CRA)
=====================================================

Definition:
Create React App (CRA) is an officially supported CLI tool to set up a modern React application
without needing to configure build tools manually. It provides a zero-configuration environment.

-----------------------------------------------------
Key Features:
-----------------------------------------------------
1. Zero-Configuration Setup
   - Automatically configures Webpack, Babel, ESLint, and other tools.
   - Developers can focus on writing React code immediately.

2. Development Server
   - Provides `npm start` to run a hot-reloading development server.
   - Includes fast refresh for React components.

3. Production Build
   - Optimized bundling with minification and code splitting using `npm run build`.

4. Testing Support
   - Includes Jest preconfigured for unit and snapshot testing.
   - Can run `npm test` for interactive test watch mode.

5. Ejecting Configuration
   - `npm run eject` exposes underlying Webpack/Babel/ESLint configuration if customization is needed.

6. Environment Variable Support
   - Supports `.env` files with variables prefixed by `REACT_APP_`.

7. Modern JavaScript Features
   - Supports ES6+, JSX, and other modern JS features out of the box.

8. CSS and Asset Support
   - Handles CSS imports, images, fonts, and other static assets automatically.

-----------------------------------------------------
Example Usage:
-----------------------------------------------------
# Create a new React app
npx create-react-app my-app

# Start development server
cd my-app
npm start

# Build production bundle
npm run build

# Run tests
npm test

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- CRA = pre-built car kit:
  - You get a car that runs immediately without assembling each engine part.
  - Optionally, you can open the hood to tweak the engine (eject).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you customize CRA without ejecting?  
A1: Yes, using tools like `react-app-rewired` or `craco`.

Q2: Why is CRA preferred for beginners?  
A2: It abstracts complex setup and lets developers start coding React apps quickly.

Q3: What are the downsides of CRA?  
A3: Limited customization without ejecting; large apps may eventually require manual config.

Q4: Does CRA support TypeScript?  
A4: Yes, via `npx create-react-app my-app --template typescript`.
*/
