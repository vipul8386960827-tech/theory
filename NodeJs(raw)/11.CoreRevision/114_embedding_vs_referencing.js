/* 25_embedding_vs_referencing.js

=====================================================
Embedding vs Referencing (Data Modeling)
=====================================================

Definition (What I should say in the interview):
- "In MongoDB I can model relationships in two ways. **Embedding** puts related data inside the
   parent document, so one read gets everything and updates to it are atomic. **Referencing**
   stores only the ObjectId and keeps the data in another collection, which avoids duplication
   and huge documents. My rule: **embed what is read together and bounded in size, reference
   what is large, unbounded, shared or updated independently**."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Factor              | Embedding                    | Referencing                   |
|---------------------|------------------------------|-------------------------------|
| Read performance    | 1 query                      | Extra query / populate        |
| Atomic update       | Yes (single document)        | Needs transaction             |
| Duplication         | Possible                     | No                            |
| Document size       | Grows (16MB limit)           | Small                         |
| Best relation       | One-to-few                   | One-to-many (large), many-to-many |

-----------------------------------------------------
Example
-----------------------------------------------------
// Embed: user addresses (one-to-few, always shown with the user)
const userSchema = new Schema({
  name: String,
  addresses: [{ street: String, city: String, _id: false }],
});

// Reference: order -> user (users are shared, updated independently)
const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  // Hybrid: snapshot of fields needed at order time (price must not change later)
  items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, title: String, price: Number }],
});

// Reference from the child side for one-to-many (comments of a post)
const commentSchema = new Schema({ post: { type: Schema.Types.ObjectId, ref: 'Post', index: true } });

-----------------------------------------------------
Decision checklist
-----------------------------------------------------
1. Is it always read with the parent? -> embed.
2. Can it grow without limit (comments, logs)? -> reference (child stores parent id).
3. Is it shared by many parents (categories, users)? -> reference.
4. Is it a historical snapshot (price at purchase)? -> embed a copy.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you model many-to-many (students and courses)?
A1: Arrays of refs on one or both sides if they stay small, or a separate enrollment
    collection { studentId, courseId, enrolledAt } when large or with extra attributes.

Q2: What is the subset pattern?
A2: Embed only the most recent / important items (e.g. last 5 reviews) in the parent and keep
    the full list in a separate collection.
*/
