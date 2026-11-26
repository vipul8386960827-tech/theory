/* 28_template_engines.js

=====================================================
Template Engines (EJS, Pug, Handlebars)
=====================================================

Definition (What I should say in the interview):
- "A template engine lets the server **generate HTML dynamically** by combining a template
   file with data. In Express we configure it with app.set('view engine', 'ejs') and render
   with res.render('page', data). This is **server-side rendering** - useful for admin panels,
   emails or simple sites. Most of my work has been JSON APIs with a React frontend, but I've
   used EJS for things like email templates and small internal dashboards."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Engine      | Syntax style                    | Notes                           |
|-------------|---------------------------------|---------------------------------|
| EJS         | HTML + <%= %> JS tags           | Easiest, plain JavaScript       |
| Pug         | Indentation-based, no tags      | Concise, learning curve         |
| Handlebars  | {{ }} logic-less                | Clean separation, helpers       |

-----------------------------------------------------
Example (EJS)
-----------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.siteName = 'My Shop';                 // available in ALL templates

app.get('/products', (req, res) => {
  res.locals.user = { name: 'Alice' };           // available in this request's template
  res.render('products', { products: [{ name: 'Pen', price: 10 }] });
});

app.listen(3000);

// views/products.ejs
// <h1><%= siteName %> - Welcome <%= user.name %></h1>
// <ul>
//   <% products.forEach(p => { %>
//     <li><%= p.name %> - Rs <%= p.price %></li>
//   <% }) %>
// </ul>
// <%- include('partials/footer') %>

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- <%= %> escapes HTML (safe from XSS); <%- %> outputs raw HTML - only use for trusted content.
- In production (NODE_ENV=production) Express caches compiled views.
- Data priority: render() locals > res.locals > app.locals.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: SSR with templates vs SPA with React?
A1: SSR gives fast first paint and SEO with simple pages; SPA gives rich interactivity and the
    server just exposes an API.

Q2: Can you render a template without sending it?
A2: Yes - app.render(view, data, callback) returns the HTML string, e.g. for emails.
*/
