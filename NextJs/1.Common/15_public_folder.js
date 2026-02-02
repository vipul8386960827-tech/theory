/* 15_public_folder */
/*
Key Points (Interviewer Keywords + Explanation):
1. Public Folder – The /public folder in Next.js stores static assets
   like images, fonts, and files that don’t need processing.

2. Direct Access – Files in /public are served at the root URL
   without needing import or special handling.

3. No Bundling – Assets here are not bundled by Webpack,
   they are served as-is.

4. Common Use Cases – Logos, favicons, robots.txt,
   downloadable files, and static images.

5. Path Usage – Access using absolute paths starting with '/'
   e.g., /logo.png
*/

/*
Definition (Using Specific Terms):
The /public folder in Next.js is used for static assets that need
to be publicly accessible at a fixed URL. Assets here bypass
the build process and can be referenced directly in HTML,
JSX, or CSS.
*/

/*
Code Example (Usage):

// File structure:
// public/logo.png

// In JSX:
<img src="/logo.png" alt="Logo" />

// In CSS:
background-image: url("/logo.png");
*/

/*
Important Notes:
- No need to import files from /public.
- Keep only static, non-processed assets here.
- Files are accessible via absolute URL at runtime.
*/

/*
Follow-up Questions + Answers:

Q1: What is the /public folder for?
A1: Storing static assets accessible directly via URL.

Q2: Do we need to import files from /public?
A2: No, they can be referenced with absolute paths.

Q3: Are files in /public processed by Webpack?
A3: No, they are served as-is.

Q4: Can we use /public for dynamic images?
A4: No, dynamic images should be imported or handled via Image component.

Q5: Example of a file in /public?
A5: /public/robots.txt, /public/favicon.ico, /public/logo.png
*/
/*
Key Points (Interviewer Keywords + Explanation):
1. Public Folder – The /public folder in Next.js stores static assets
   like images, fonts, and files that don’t need processing.

2. Direct Access – Files in /public are served at the root URL
   without needing import or special handling.

3. No Bundling – Assets here are not bundled by Webpack,
   they are served as-is.

4. Common Use Cases – Logos, favicons, robots.txt,
   downloadable files, and static images.

5. Path Usage – Access using absolute paths starting with '/'
   e.g., /logo.png
*/

/*
Definition (Using Specific Terms):
The /public folder in Next.js is used for static assets that need
to be publicly accessible at a fixed URL. Assets here bypass
the build process and can be referenced directly in HTML,
JSX, or CSS.
*/

/*
Code Example (Usage):

// File structure:
// public/logo.png

// In JSX:
<img src="/logo.png" alt="Logo" />

// In CSS:
background-image: url("/logo.png");
*/

/*
Important Notes:
- No need to import files from /public.
- Keep only static, non-processed assets here.
- Files are accessible via absolute URL at runtime.
*/

/*
Follow-up Questions + Answers:

Q1: What is the /public folder for?
A1: Storing static assets accessible directly via URL.

Q2: Do we need to import files from /public?
A2: No, they can be referenced with absolute paths.

Q3: Are files in /public processed by Webpack?
A3: No, they are served as-is.

Q4: Can we use /public for dynamic images?
A4: No, dynamic images should be imported or handled via Image component.

Q5: Example of a file in /public?
A5: /public/robots.txt, /public/favicon.ico, /public/logo.png
*/
