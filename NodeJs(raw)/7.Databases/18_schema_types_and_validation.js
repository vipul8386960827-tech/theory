/* 18_schema_types_and_validation.js

=====================================================
Schema Types and Built-in Validation
=====================================================

Definition (What I should say in the interview):
- "Mongoose SchemaTypes define the **data type of each field** - String, Number, Date, Boolean,
   ObjectId, Array, Buffer, Map, Decimal128, Mixed and nested schemas. On top of types, Mongoose
   has **built-in validators** like required, min/max, minLength/maxLength, enum and match.
   Validation runs automatically **before save()** and create(); for update queries it only runs
   if I pass **runValidators: true**."

-----------------------------------------------------
Built-in validators by type
-----------------------------------------------------
| Type    | Validators / options                                    |
|---------|---------------------------------------------------------|
| All     | required, default, validate, immutable, select          |
| String  | enum, match, minLength, maxLength, trim, lowercase      |
| Number  | min, max, enum                                          |
| Date    | min, max, expires (TTL index)                           |
| ObjectId| ref (for populate)                                      |

-----------------------------------------------------
Example
-----------------------------------------------------
const productSchema = new mongoose.Schema({
  title:    { type: String, required: [true, 'Title is required'], trim: true, maxLength: 120 },
  sku:      { type: String, match: [/^[A-Z0-9-]+$/, 'Invalid SKU'], immutable: true },
  price:    { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  category: { type: String, enum: { values: ['phone', 'laptop'], message: '{VALUE} not allowed' } },
  tags:     [String],
  seller:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meta:     { type: Map, of: String },
  password: { type: String, select: false },       // excluded from queries by default
});

// Handling the error
try {
  await Product.create({ price: -5 });
} catch (err) {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }
  throw err;
}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- unique is an index, not a validator (duplicate -> E11000 error, not ValidationError).
- Mixed type (Schema.Types.Mixed or {}) is not change-tracked; call doc.markModified('field').
- Arrays default to [] - required on an array does not fail for an empty array.
- Still validate request input at the API layer (Joi/Zod/express-validator) for clear errors.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does validation run on updateOne?
A1: Only with { runValidators: true }, and then only on the fields being updated; required
    checks only fire for fields you $unset or set to null.

Q2: CastError vs ValidationError?
A2: CastError = value cannot be converted to the type (e.g. 'abc' to Number in a query).
    ValidationError = a validator failed when saving a document (it can wrap cast errors too).
*/
