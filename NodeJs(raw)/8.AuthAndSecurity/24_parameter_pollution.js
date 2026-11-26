/* 24_parameter_pollution.js

=====================================================
HTTP Parameter Pollution (HPP)
=====================================================

Definition (What I should say in the interview):
- "HTTP Parameter Pollution is when a client sends the **same query parameter multiple
   times**, like ?sort=price&sort=name. Express's query parser turns that into an **array**
   instead of a string, so code that expects a string can crash - for example calling
   .split() on an array - or bypass validation. The fix is to validate types, and use the hpp
   middleware which keeps only the last value, with a whitelist for parameters that are
   allowed to repeat."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. ?role=user&role=admin -> req.query.role = ['user', 'admin'].
2. ?filter[price]=10 -> req.query.filter = { price: '10' } (nested objects with qs parser).
3. Risks: TypeError crashes (DoS), validation bypass, unexpected DB queries.
4. Express 4 uses the "extended" qs parser by default; Express 5 defaults to "simple"
   (querystring), which still produces arrays for repeated keys.

-----------------------------------------------------
Example
-----------------------------------------------------
// Vulnerable
app.get('/api/products', async (req, res) => {
  const sortBy = req.query.sort.split(',').join(' ');   // array -> TypeError -> 500
  res.json(await Product.find().sort(sortBy));
});

// Fix 1: hpp middleware (after body/query parsing)
const hpp = require('hpp');
app.use(hpp({ whitelist: ['price', 'category'] }));     // these may repeat
// ?sort=price&sort=name -> req.query.sort === 'name'

// Fix 2: validate the type explicitly
const allowedSort = ['price', 'name', 'createdAt'];
const sort = typeof req.query.sort === 'string' ? req.query.sort : 'createdAt';
if (!allowedSort.includes(sort)) return res.status(400).json({ message: 'Invalid sort' });

// Fix 3: choose a simpler parser
app.set('query parser', 'simple');

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Different layers (proxy, WAF, app) may pick first vs last value differently -> a WAF may
  check one value while the app uses another.
- Wrap async handlers / use an error middleware so a TypeError becomes a 400/500, not a crash.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why whitelist some params in hpp?
A1: Filters like ?category=a&category=b legitimately need multiple values.

Q2: How is this related to NoSQL injection?
A2: The same qs parsing that creates arrays also creates objects like ?price[$gt]=0, so
    type validation solves both.
*/
