/*
OBFUSCATION — INTERVIEW EXPLANATION

------------------------------------------
WHAT IS OBFUSCATION

- Obfuscation is the process of making frontend code hard to read and understand
- It does NOT change functionality, only readability

------------------------------------------
WHY WE USE IT

- To protect business logic exposed in frontend
- To make reverse engineering harder
- To slow down scraping and API discovery

IMPORTANT:
- It is NOT a security mechanism
- Only adds friction for attackers

------------------------------------------
HOW I IMPLEMENTED IT

- Used production build tools (Webpack / Vite)

1. Minification
- Removed spaces, shortened code

2. Variable renaming
- Meaningful names → random names

3. String obfuscation
- Encoded API paths / constants

- Done during build step (npm run build)

------------------------------------------
LIMITATIONS (VERY IMPORTANT)

- Code still runs in browser → can be inspected
- DevTools can pretty-print code
- Advanced bots can bypass easily

------------------------------------------
WHERE IT FITS

- Used as a supplementary layer
- Combined with:
  - rate limiting
  - bot detection
  - backend validation

------------------------------------------
INTERVIEW ONE-LINER

"Obfuscation makes frontend code harder to understand by minifying and transforming it,
 which helps slow down reverse engineering and scraping, but it’s not a secure solution since 
 the code is still accessible in the browser."
*/

/*
WEBPACK OBFUSCATION — INTERVIEW EXPLANATION

------------------------------------------
HOW WE DO OBFUSCATION IN WEBPACK

- Obfuscation is applied during the production build step
- Webpack allows plugins to transform code before output

------------------------------------------
STEP 1: USE BUILT-IN MINIFICATION (DEFAULT)

- Webpack uses TerserPlugin in production mode

Example:
mode: "production"

- This automatically:
  - minifies code
  - removes whitespace
  - shortens variable names

------------------------------------------
STEP 2: ADD JAVASCRIPT OBFUSCATOR (ADVANCED)

- Install plugin:
  npm install webpack-obfuscator

------------------------------------------
STEP 3: CONFIGURE IN WEBPACK

- Add plugin in webpack.config.js

Example:

const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: 'production',
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
    }, [])
  ]
};

------------------------------------------
WHAT THIS DOES

- Renames variables to unreadable names
- Encodes strings (like API paths)
- Makes code harder to follow

------------------------------------------
STEP 4: RUN BUILD

- npm run build

→ Output bundle is obfuscated

------------------------------------------
IMPORTANT BEST PRACTICE

- Apply only in production
- Avoid over-obfuscation (can affect performance/debugging)

------------------------------------------
LIMITATIONS (IMPORTANT)

- Code still visible in browser
- Can be reverse engineered
- Only slows attackers

------------------------------------------
INTERVIEW ONE-LINER

"I used Webpack’s production build with Terser for minification and added a plugin like 
webpack-obfuscator to further transform the code, making it harder to reverse engineer while
keeping it functional."
*/
