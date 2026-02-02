/* 43_avoid_relative_path_imports_in_create_react_app.js

=====================================================
Avoiding Relative Path Imports in Create React App (CRA)
=====================================================

Definition:
In React projects created with CRA, importing files with long relative paths 
(../../../components/Button) quickly becomes messy and hard to maintain.  
CRA allows using absolute imports or custom path aliases to simplify imports.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. Problem with Relative Imports
   - Hard to read and maintain in large projects.
   - Difficult to refactor when moving files around.
   - Prone to mistakes due to counting `../` levels.

2. Solutions in CRA
   a) Absolute Imports with `jsconfig.json` (or `tsconfig.json` in TypeScript):
      - Create a `jsconfig.json` file in the project root.
      - Example:
        {
          "compilerOptions": {
            "baseUrl": "src"
          }
        }
      - Now you can import like:
        import Button from "components/Button";

   b) Path Aliases:
      - In `jsconfig.json`:
        {
          "compilerOptions": {
            "baseUrl": "src",
            "paths": {
              "@components/*": ["components/*"],
              "@utils/*": ["utils/*"]
            }
          }
        }
      - Usage:
        import Button from "@components/Button";
        import formatDate from "@utils/date";

3. Benefits
   - Cleaner imports.
   - Easier refactoring.
   - Better readability in large-scale apps.

-----------------------------------------------------
Example:
-----------------------------------------------------
// Without absolute imports:
import Button from "../../../components/Button";

// With absolute imports:
import Button from "components/Button";

// With alias:
import Button from "@components/Button";

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Relative paths are like using **small alleyways** to navigate a city:  
  confusing, error-prone, and slow.  
- Absolute imports/aliases are like **main roads with signboards**:  
  clear, structured, and easier to follow.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How do absolute imports work internally in CRA?  
A1: CRA configures webpack with `baseUrl` set to `src`, so imports resolve from there.

Q2: Do absolute imports increase bundle size?  
A2: No, they only affect developer experience; the final bundle is the same.

Q3: Can path aliases be used without ejecting CRA?  
A3: Yes, by using `jsconfig.json` (for JS) or `tsconfig.json` (for TS). No eject needed.

Q4: What are alternatives in non-CRA setups?  
A4: In custom webpack setups, use the `resolve.alias` configuration.
*/
