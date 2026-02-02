/*
=====================================
Common Folder Structure of React Project
=====================================

Definition:
A well-structured React project improves maintainability, scalability, 
and readability. The structure separates concerns like components, 
pages, assets, and utilities.

-------------------------------------
Key Points:
-------------------------------------
- Keep files organized by feature or type.  
- Common folders: components, pages, assets, hooks, context, utils, services.  
- Use index.js files to simplify imports.  
- Organize styles, images, and tests inside relevant folders.  
- Structure may vary based on project size and team preference.

-------------------------------------
Example: Common Folder Structure
-------------------------------------
my-react-app/
│
├─ public/                 # Static assets (index.html, favicon, etc.)
│
├─ src/
│   ├─ assets/             # Images, fonts, icons
│   │   ├─ images/
│   │   └─ styles/
│   │
│   ├─ components/         # Reusable UI components
│   │   ├─ Button/
│   │   │   ├─ Button.js
│   │   │   └─ Button.css
│   │   └─ Header/
│   │       ├─ Header.js
│   │       └─ Header.css
│   │
│   ├─ pages/              # Page components
│   │   ├─ Home/
│   │   │   └─ Home.js
│   │   └─ About/
│   │       └─ About.js
│   │
│   ├─ hooks/              # Custom React hooks
│   │   └─ useWindowSize.js
│   │
│   ├─ context/            # Context API providers
│   │   └─ AuthContext.js
│   │
│   ├─ services/           # API calls and services
│   │   └─ api.js
│   │
│   ├─ utils/              # Utility/helper functions
│   │   └─ formatDate.js
│   │
│   ├─ App.js              # Root component
│   ├─ index.js            # Entry point
│   └─ index.css           # Global styles
│
└─ package.json

-------------------------------------
Real-Life Analogy:
-------------------------------------
Think of a React project like a house 🏠:  
- public/ = foundation & structure  
- components/ = furniture & decor (reusable pieces)  
- pages/ = rooms  
- assets/ = paint, tools, decorations  
- utils/services/hooks = appliances & utilities

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can we organize by feature instead of type?
A1: Yes, feature-based structure groups all files (component, styles, tests) per feature.

Q2: Where should tests go?
A2: Typically next to the component (`Button.test.js`) or in a separate `__tests__/` folder.

Q3: Should we separate smart and dumb components?
A3: It’s optional; functional components with hooks reduce the need for such separation.

Q4: How do you manage global styles?
A4: Use `index.css`, CSS Modules, or CSS-in-JS libraries like styled-components.

Q5: Is this folder structure mandatory?
A5: No, it’s a widely used convention; adapt based on project/team needs.
*/
