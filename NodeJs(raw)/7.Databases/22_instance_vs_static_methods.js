/* 22_instance_vs_static_methods.js

=====================================================
Instance Methods vs Static Methods
=====================================================

Definition (What I should say in the interview):
- "**Instance methods** are defined on schema.methods and are available on **each document**,
   so this refers to that document - for example user.comparePassword(). **Static methods** are
   defined on schema.statics and are called on the **Model itself**, so this refers to the model
   - for example User.findByEmail(). I use instance methods for logic about one record and
   statics for queries or operations across the collection."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature        | Instance method           | Static method               |
|----------------|---------------------------|-----------------------------|
| Defined on     | schema.methods            | schema.statics              |
| Called on      | document (user.x())       | Model (User.x())            |
| this           | the document              | the Model                   |
| Typical use    | comparePassword, toPublic | findByEmail, search, stats  |

-----------------------------------------------------
Example
-----------------------------------------------------
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, select: false },
  isActive: Boolean,
});

// Instance method
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Static method
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// Query helper (bonus): chainable
userSchema.query.active = function () { return this.where({ isActive: true }); };

const User = mongoose.model('User', userSchema);

// Usage in login
const user = await User.findByEmail(req.body.email);
if (!user || !(await user.comparePassword(req.body.password))) {
  return res.status(401).json({ message: 'Invalid credentials' });
}
res.json({ token: user.generateToken() });

const activeUsers = await User.find().active();

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Arrow functions -> this is not the doc/model.
- Defining methods after mongoose.model() -> they are not attached.
- Instance methods do not exist on lean() results (plain objects).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why put this logic in the model instead of the controller?
A1: Reuse and a "fat model, thin controller" structure; every place that loads a user gets the
    same comparePassword logic.

Q2: Static method vs a separate service function?
A2: Both work. Statics keep DB-specific queries close to the schema; services are better for
    business logic that touches multiple models.
*/
