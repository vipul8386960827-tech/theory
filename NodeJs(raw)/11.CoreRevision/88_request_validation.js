/* 10_request_validation.js

=====================================================
Request Validation
=====================================================

Definition (What I should say in the interview):
- "Request validation means checking that the incoming body, params and query match what the
   API expects **before** the data reaches the business logic or the database. Express has no
   built-in validation, so we use libraries like **Joi, Zod or express-validator**, usually
   wrapped in a reusable middleware that returns a 400 with clear error messages. Validating at
   the edge keeps handlers clean and protects against bad data and injection attacks."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Never trust client input - validate type, format, length, allowed values.
2. Validate body, params AND query - not just the body.
3. Return 400 (Bad Request) or 422 (Unprocessable Entity) with field-level errors.
4. Strip unknown fields to prevent mass assignment (e.g. client sending role: 'admin').
5. DB schema validation (Mongoose) is a second layer, not a replacement.

-----------------------------------------------------
Example (Joi validation middleware)
-----------------------------------------------------
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const validate = (schema, source = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ errors: error.details.map((d) => d.message) });
  }
  req.validated = value;     // use the cleaned data (req.query isn't writable in Express 5)
  next();
};

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
});

app.post('/users', validate(createUserSchema), (req, res) => {
  res.status(201).json({ user: req.validated });
});

app.listen(3000);

-----------------------------------------------------
Comparison of libraries
-----------------------------------------------------
| Library            | Style                      | Notes                        |
|--------------------|----------------------------|------------------------------|
| Joi                | Schema object              | Mature, very expressive      |
| Zod                | Schema + TypeScript types  | Infers TS types from schema  |
| express-validator  | Middleware chain per field | body('email').isEmail()      |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Client-side validation exists, why validate on server?
A1: Client checks can be bypassed with Postman/curl; the server is the only trusted layer.

Q2: 400 vs 422?
A2: 400 for malformed/invalid request generally; some teams use 422 for well-formed but
    semantically invalid data. Consistency across the API matters most.
*/
