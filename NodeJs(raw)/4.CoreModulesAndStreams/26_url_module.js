/* 26_url_module.js

=====================================================
url Module (WHATWG URL)
=====================================================

Definition (What I should say in the interview):
- "For parsing URLs I use the **WHATWG URL class**, which is the same standard API as in browsers
   and is available globally. new URL(input, base) breaks a URL into protocol, host, pathname,
   search, hash, and gives **searchParams** - a URLSearchParams object to read and modify query
   parameters safely with proper encoding. The legacy url.parse() is deprecated and has security
   issues, so I avoid it."

-----------------------------------------------------
URL Parts
-----------------------------------------------------
https://user:pass@api.example.com:8080/v1/users?page=2&sort=name#top
- protocol: 'https:'          - hostname: 'api.example.com'   - port: '8080'
- host: 'api.example.com:8080'- pathname: '/v1/users'         - search: '?page=2&sort=name'
- hash: '#top'                - origin: 'https://api.example.com:8080'

-----------------------------------------------------
Example
-----------------------------------------------------
const http = require('http');

// Parsing an incoming request (req.url is only the path + query)
http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const page = Number(url.searchParams.get('page')) || 1;
  const tags = url.searchParams.getAll('tag');          // ?tag=a&tag=b -> ['a','b']
  res.end(JSON.stringify({ path: url.pathname, page, tags }));
}).listen(3000);

// Building a URL safely
const api = new URL('https://api.example.com/search');
api.searchParams.set('q', 'node & streams');
api.searchParams.append('limit', '10');
console.log(api.href);  // https://api.example.com/search?q=node+%26+streams&limit=10

// Invalid URL throws
try { new URL('not a url'); } catch (e) { console.log(e.code); } // ERR_INVALID_URL

// File paths <-> file URLs (ESM)
const { fileURLToPath, pathToFileURL } = require('url');
console.log(pathToFileURL('/tmp/a.txt').href);         // file:///tmp/a.txt

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Building query strings with string concatenation -> broken encoding / injection. Use
  URLSearchParams.
- new URL(req.url) without a base throws, because req.url is relative ('/users?x=1').
- URL.canParse(str) (newer Node) checks validity without try/catch.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: url.parse vs new URL?
A1: url.parse is legacy, lenient and can be inconsistent with browsers (security bugs); URL follows
    the WHATWG standard and throws on invalid input.

Q2: querystring module vs URLSearchParams?
A2: querystring is legacy; URLSearchParams is the standard and works the same in browser and Node.
*/
