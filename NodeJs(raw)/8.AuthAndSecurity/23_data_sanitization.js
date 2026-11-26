/* 23_data_sanitization.js

=====================================================
Data Validation and Sanitization
=====================================================

Definition (What I should say in the interview):
- "**Validation** checks that input matches what we expect - correct type, format, length and
   allowed values - and rejects it otherwise. **Sanitization** cleans or transforms input, like
   trimming, normalizing emails, removing $ operators, or stripping dangerous HTML. My rule is
   never trust the client: I validate every body, query and params at the API boundary with a
   schema library like zod or joi, whitelist the fields I accept, and escape on output."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Whitelist over blacklist**: define what is allowed, reject everything else.
2. Validate type, length, format, range, enum - and strip unknown fields.
3. Prevent **mass assignment**: never pass req.body directly to create/update.
4. Limit body size: express.json({ limit: '10kb' }) to block huge payloads.
5. Sanitization depends on context: HTML (DOMPurify), Mongo ($ keys), file names (path traversal).
6. Frontend validation is for UX only; the server is the real gate.

-----------------------------------------------------
Example (zod validation middleware)
-----------------------------------------------------
const { z } = require('zod');

const signupSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72),          // bcrypt 72-byte limit
}).strict();                                     // unknown keys like "role" -> error

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.flatten() });
  req.body = result.data;                        // use cleaned data only
  next();
};

app.use(express.json({ limit: '10kb' }));
app.post('/api/auth/signup', validate(signupSchema), async (req, res) => {
  const { name, email, password } = req.body;    // explicit fields -> no mass assignment
  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user.id, name: user.name });
});

// path traversal: never build file paths straight from input
const path = require('path');
const safeName = path.basename(req.params.file);   // strips "../../"

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Validating req.body but forgetting req.query and req.params.
- Sanitizing by removing "<script>" with a regex - easy to bypass.
- Returning full DB documents (with password hash, internal fields) in responses -> also
  sanitize OUTPUT using DTOs / select().

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Validation vs sanitization?
A1: Validation rejects bad input; sanitization modifies input to make it safe or normalized.

Q2: express-validator vs zod/joi?
A2: express-validator is middleware-chain style for Express; zod/joi are schema-based and
    reusable anywhere. zod also gives TypeScript types.
*/
