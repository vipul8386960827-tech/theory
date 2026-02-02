/* 85_react_scripts.js

=====================================================
React Scripts
=====================================================

Definition:
`react-scripts` is a package provided by Create React App (CRA) that abstracts all configuration for building,
running, and testing React applications. It includes Webpack, Babel, ESLint, and other tools preconfigured.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Purpose
   - Simplifies setup by hiding complex build configuration.
   - Provides scripts for common tasks: start, build, test, eject.

2. Common Commands
   - `npm start` / `yarn start`: Starts development server with hot reloading.
   - `npm run build` / `yarn build`: Builds production-ready optimized bundle.
   - `npm test` / `yarn test`: Runs tests using Jest.
   - `npm run eject` / `yarn eject`: Exposes underlying configuration (irreversible).

3. Benefits
   - No need to manually configure Webpack/Babel.
   - Encourages best practices and consistency.
   - Enables zero-configuration development.

-----------------------------------------------------
Example:
-----------------------------------------------------
# Start development server
npm start

# Build production bundle
npm run build

# Run tests
npm test

# Eject configuration (if needed)
npm run eject

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- React Scripts = ready-made kitchen appliance:
  - You get a blender that works out of the box (CRA app) without assembling parts (Webpack/Babel).
  - If needed, you can open it up and modify (eject).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you eject react-scripts?  
A1: The configuration becomes fully visible, and you manage Webpack/Babel manually.

Q2: Can you use react-scripts outside CRA?  
A2: Technically yes, but it's designed to work with CRA projects.

Q3: Why not always eject immediately?  
A3: Ejecting adds complexity and maintenance overhead; only do it if custom configuration is necessary.

Q4: How does react-scripts handle environment variables?  
A4: By prefixing variables with REACT_APP_ in .env files, they are injected into the app at build time.
*/
