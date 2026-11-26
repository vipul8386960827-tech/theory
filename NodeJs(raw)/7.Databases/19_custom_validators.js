/* 19_custom_validators.js

=====================================================
Custom Validators
=====================================================

Definition (What I should say in the interview):
- "When built-in validators are not enough, Mongoose lets me write a **custom validator** with
   the validate option: a function that returns true/false (or a Promise for **async**
   checks), plus a message. I use them for business rules like a valid phone number, an end date
   after the start date, or an array length limit. They run with document validation on save,
   and on updates only with runValidators, where **this** is the query, not the document."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Field-level: validate: { validator: fn, message }.
2. Async: return a Promise / use async function -> resolve false to fail.
3. Use regular functions (not arrow) when you need this.
4. Schema-level / cross-field: schema.pre('validate') or doc.invalidate().
5. {VALUE} and {PATH} placeholders work in messages.

-----------------------------------------------------
Example
-----------------------------------------------------
const eventSchema = new mongoose.Schema({
  phone: {
    type: String,
    validate: {
      validator: v => /^[6-9]\d{9}$/.test(v),
      message: props => `${props.value} is not a valid Indian mobile number`,
    },
  },
  tags: {
    type: [String],
    validate: [arr => arr.length <= 5, 'Max 5 tags allowed'],
  },
  startDate: Date,
  endDate: {
    type: Date,
    validate: {
      validator: function (v) { return !this.startDate || v > this.startDate; },
      message: 'endDate must be after startDate',
    },
  },
  coupon: {
    type: String,
    validate: {
      validator: async function (code) {
        return !!(await Coupon.exists({ code, active: true }));
      },
      message: 'Invalid coupon',
    },
  },
});

// Cross-field check at schema level
eventSchema.pre('validate', function () {
  if (this.isOnline && !this.meetingUrl) this.invalidate('meetingUrl', 'Required for online events');
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Using this.startDate inside a validator during findOneAndUpdate -> this is the Query, so
  this.startDate is undefined. Use this.getUpdate() or validate in the service layer.
- Using a validator for uniqueness ("email already exists") -> race condition; use a unique index.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can a validator be async?
A1: Yes, return a Promise; Mongoose awaits it during validate().

Q2: How to trigger validation manually?
A2: await doc.validate() or doc.validateSync() (sync skips async validators).
*/
