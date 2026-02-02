/*
=====================================
Popular React Linters
=====================================

Definition:
Linters are tools that analyze code to find errors, enforce coding 
standards, and improve code quality. In React projects, linters 
help catch bugs, enforce best practices, and maintain consistent style.

-------------------------------------
Key Points:
-------------------------------------
- Linters can check JavaScript, JSX, and CSS/SCSS in React projects.  
- Often combined with formatters like Prettier for automatic code formatting.  
- Can be integrated into IDEs, CI/CD pipelines, or pre-commit hooks.

-------------------------------------
Popular Linters:
-------------------------------------
1. **ESLint**  
   - The most popular linter for JavaScript and React.  
   - Can detect syntax errors, unused variables, and bad practices.  
   - React-specific rules available via plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks`.  
   - Install: `npm install eslint eslint-plugin-react eslint-plugin-react-hooks --save-dev`  
   - Example `.eslintrc.js`:
     ```js
     module.exports = {
       env: { browser: true, es2021: true },
       extends: ["eslint:recommended", "plugin:react/recommended"],
       parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 12, sourceType: "module" },
       plugins: ["react", "react-hooks"],
       rules: { "react/prop-types": "off" }
     };
     ```

2. **TSLint** (for React + TypeScript)  
   - Lints TypeScript code and catches type-related issues.  
   - Deprecated in favor of ESLint with TypeScript plugin.  

3. **Prettier**  
   - Not strictly a linter but a code formatter.  
   - Works with ESLint to enforce consistent code style.  
   - Install: `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`  

4. **Stylelint**  
   - Lints CSS, SCSS, and styled-components in React projects.  
   - Helps maintain consistent styling and catch errors in CSS.  
   - Install: `npm install stylelint stylelint-config-standard --save-dev`  

5. **SonarLint**  
   - IDE plugin for on-the-fly static analysis.  
   - Detects bugs, vulnerabilities, and code smells in React projects.

-------------------------------------
Real-Life Analogy:
-------------------------------------
Linters are like spell-checkers 📝 for your code:  
- They catch mistakes early, suggest improvements,  
- And help keep code clean and readable for the team.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why use ESLint with React?
A1: It enforces best practices specific to React and prevents common errors like missing hooks dependencies.

Q2: Can Prettier replace ESLint?
A2: No, Prettier handles formatting; ESLint handles logic and potential errors. They are complementary.

Q3: How to integrate linters in CI/CD?
A3: Run linter scripts in pre-build steps to prevent bad code from being merged.

Q4: Can linters fix errors automatically?
A4: ESLint and Prettier have `--fix` options to automatically correct some issues.

Q5: Do linters impact runtime performance?
A5: No, they run at development/build time and do not affect production performance.
*/
