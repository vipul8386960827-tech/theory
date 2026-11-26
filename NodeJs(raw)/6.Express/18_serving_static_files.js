/* 18_serving_static_files.js

=====================================================
Serving Static Files
=====================================================

Definition (What I should say in the interview):
- "Express serves static files like images, CSS, JS and a built React app using the built-in
   **express.static()** middleware. You give it a root folder, and it maps the URL path to a
   file in that folder, sets the right Content-Type, and handles caching headers like ETag and
   Last-Modified. In production I usually let Nginx or a CDN serve static assets, because that's
   faster and keeps the Node event loop free for API work."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. app.use(express.static('public')) -> public/logo.png is served at /logo.png.
2. Folder name is NOT part of the URL unless you add a mount path.
3. Use path.join(__dirname, 'public') -> relative paths depend on where node was started.
4. Multiple static folders are checked in order.
5. If no file is found, it calls next() -> continues to your routes.

-----------------------------------------------------
Example (API + React SPA build)
-----------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();

// /static/css/app.css -> ./assets/css/app.css, cached for 7 days
app.use('/static', express.static(path.join(__dirname, 'assets'), { maxAge: '7d' }));

// React build folder
const clientBuild = path.join(__dirname, 'client', 'build');
app.use(express.static(clientBuild));

app.get('/api/products', (req, res) => res.json([{ id: 1 }]));

// SPA fallback: any other GET returns index.html so client-side routing works.
// Using a regex avoids wildcard syntax differences between Express 4 and 5.
app.get(/^\/(?!api)/, (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- express.static protects against path traversal (../../etc/passwd) automatically.
- res.sendFile requires an absolute path (or the root option).
- Dotfiles (.env) are ignored by default (dotfiles: 'ignore') - still never put secrets in public.
- Place static middleware before heavy middleware like auth to keep asset requests cheap.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: res.sendFile vs res.download?
A1: sendFile displays inline; download sets Content-Disposition: attachment so the browser saves it.

Q2: Why use a CDN instead of express.static in production?
A2: Edge caching, lower latency, and the Node process doesn't spend time on file I/O.
*/
