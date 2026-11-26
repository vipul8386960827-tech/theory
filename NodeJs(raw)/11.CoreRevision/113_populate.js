/* 24_populate.js

=====================================================
populate()
=====================================================

Definition (What I should say in the interview):
- "populate() **replaces an ObjectId reference with the actual document** from another
   collection. I define the field with type ObjectId and a **ref** to the model name, and when I
   call .populate('field') Mongoose runs **an extra query** using $in on the referenced
   collection and fills in the results. It is very convenient for things like order.user or
   post.author, but every populated path is one more database round trip."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Schema: author: { type: Schema.Types.ObjectId, ref: 'User' }.
2. Select fields: populate('author', 'name email') - avoid sending password etc.
3. Options object: { path, select, match, options: { sort, limit }, populate (nested) }.
4. If the referenced doc is missing, the field becomes null (array refs: removed).
5. Works on arrays of refs, nested paths, virtuals, and on existing docs (doc.populate()).

-----------------------------------------------------
Example
-----------------------------------------------------
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Basic
await Post.find().populate('author', 'name avatar');

// Multiple + options + nested
await Post.findById(id).populate([
  { path: 'author', select: 'name' },
  {
    path: 'comments',
    match: { isApproved: true },
    options: { sort: { createdAt: -1 }, limit: 10 },
    populate: { path: 'user', select: 'name' },      // comment.user
  },
]);

// Under the hood (roughly):
// 1) db.posts.find(...)
// 2) db.users.find({ _id: { $in: [authorIds] } })
// 3) db.comments.find({ _id: { $in: [commentIds] }, isApproved: true })

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Using populate's match to filter PARENT docs -> it only filters populated docs; parents still
  come back with null/empty fields.
- Deep nested populates on list endpoints -> many queries, slow responses.
- Wrong ref name (must match the model name, e.g. 'User', not 'users').
- limit inside populate options on a find() of many parents applies across all, not per parent
  (Mongoose has perDocumentLimit for that).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: populate vs $lookup?
A1: populate = Mongoose, separate queries, easy, returns docs. $lookup = server-side join in an
    aggregation, needed to filter/sort/group on joined fields.

Q2: How do you make populate fast?
A2: select only needed fields, combine with lean(), avoid deep nesting, and ensure the
    referenced _id (always indexed) or foreignField for virtual populate is indexed.
*/
