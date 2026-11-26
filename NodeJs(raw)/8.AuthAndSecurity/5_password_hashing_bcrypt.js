/* 5_password_hashing_bcrypt.js

=====================================================
Password Hashing with bcrypt
=====================================================

Definition (What I should say in the interview):
- "We never store plain passwords; we store a **hash** created with a slow, salted algorithm
   like **bcrypt**. bcrypt automatically generates a random salt and stores it inside the hash
   string, so I do not need a separate salt column. It has a **cost factor** (salt rounds),
   usually 10-12, which makes each hash deliberately slow so brute-forcing leaked hashes is
   expensive. At login I use bcrypt.compare(), which re-hashes the input with the stored salt."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Use the async API (bcrypt.hash / compare) -> runs in the libuv thread pool, not blocking.
2. Cost factor is exponential: each +1 roughly doubles the time.
3. Hash format: $2b$12$<22-char salt><31-char hash> -> version, cost, salt, hash.
4. bcrypt only uses the first **72 bytes** of the password.
5. Fast hashes like MD5 / SHA-256 are NOT for passwords - GPUs try billions per second.
6. Alternatives: **argon2id** (modern recommendation), scrypt (built into Node crypto).

-----------------------------------------------------
Example (Mongoose pre-save hook)
-----------------------------------------------------
const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();   // do not re-hash on every save
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);    // returns Promise<boolean>
};

// password field hidden by default
password: { type: String, required: true, minlength: 8, select: false }

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Using bcrypt.hashSync in a request handler -> blocks the event loop.
- Comparing hashes manually with === (hash twice gives different results because of salt).
- Forgetting isModified check -> hashing an already hashed password.
- Returning the password hash in API responses.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you choose the cost factor?
A1: Pick the highest value where one hash takes around 100-300 ms on your server; 12 is common.

Q2: If two users have the same password, are the hashes equal?
A2: No, each hash has a unique random salt, so the output differs.

Q3: bcrypt vs bcryptjs?
A3: bcrypt is a native C++ addon (faster); bcryptjs is pure JS (no build step, slower). Same API.
*/
