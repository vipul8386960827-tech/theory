/*
========================================
25_static_assets_pages_router (Next.js)
========================================

Definition:
Static assets in Next.js Pages Router refer to images, fonts, icons, 
JavaScript, or CSS files that do not change dynamically. They are served 
directly to the client and cached for better performance.

--------------------------------
1) Public Folder:
- Place static files in the /public folder
- Accessible via root path
- Example:
  /public/logo.png → accessible at /logo.png

Example:
<img src="/logo.png" alt="Logo" />

Notes:
- No import needed for files in /public
- Ideal for favicons, static images, robots.txt, sitemap.xml

--------------------------------
2) Static Imports:
- Import assets directly in components
- Next.js optimizes images if imported
Example:
import logo from '../public/logo.png'
<img src={logo} alt="Logo" />

--------------------------------
3) CSS and JS Files:
- Static CSS files can be placed in /public or imported globally
- Static JS files can be placed in /public
- Use <link> or <script> in _document.js or _app.js

--------------------------------
4) Caching & Optimization:
- Static assets served from /public are cached by browser and CDN
- For large files, consider using next/image for optimization
- Configure Cache-Control headers if needed

--------------------------------
5) Best Practices:
- Keep large media files in /public or external CDN
- Use descriptive file names for SEO
- Avoid storing dynamic content in /public
- Prefer static imports for small assets for tree-shaking benefits

--------------------------------
Interview-ready one-liner:
"Pages Router serves static assets from the /public folder or via static imports, allowing efficient caching, optimization, and direct access to files like images, fonts, and scripts."
*/
