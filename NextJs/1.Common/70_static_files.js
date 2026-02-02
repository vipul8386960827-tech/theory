/* 70_static_files */
/*
Key Points (Interviewer Keywords + Explanation):
1. Static Files – Files placed in the `public/` folder in Next.js
   that are served directly without Webpack processing.

2. Purpose – Store assets like images, fonts, icons, robots.txt, favicon, etc.

3. Implementation – Place files in `public/` and access them via
   absolute paths starting with `/`.

4. Features –
   - Directly accessible via `/filename.ext` in the browser
   - Not processed or bundled by Next.js
   - Works with both Pages Router and App Router

5. Benefits – Simple way to serve static assets, improves performance,
   and ensures public accessibility of files.
*/

/*
Definition (Using Specific Terms):
Static files in Next.js are assets inside the `public/` folder that
can be accessed directly through a URL path. They bypass Webpack
and are served as-is.
*/

/*
Code Example:

// Project structure:
// public/
// ├─ logo.png
// ├─ favicon.ico
// └─ robots.txt

// Using a static image in a component
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Static Files Example</h1>
      <Image src="/logo.png" alt="Logo" width={150} height={150} />
      <p>Check robots.txt at /robots.txt</p>
    </div>
  );
}
*/

/*
Important Notes:
- Any file in `public/` is accessible via `/filename.ext`.
- Avoid storing sensitive data in `public/`.
- Suitable for images, fonts, text files, icons, etc.
- Works with both Pages Router and App Router.
- Changes in `public/` are reflected immediately without rebuild.
*/

/*
Follow-up Questions + Answers:

Q1: What are static files in Next.js?
A1: Files in the `public/` folder served directly without processing.

Q2: How do you reference a static file?
A2: Use `/filename.ext`, e.g., `/logo.png`.

Q3: Can next/image use public folder images?
A3: Yes, by setting src="/image.png" with width and height.

Q4: Are static files bundled by Webpack?
A4: No, they are served as-is.

Q5: Can sensitive data be stored in public/?
A4: No, public/ is publicly accessible; avoid secrets.
*/
