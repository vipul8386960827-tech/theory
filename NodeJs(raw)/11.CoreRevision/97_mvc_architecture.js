/* 26_mvc_architecture.js

=====================================================
MVC Architecture in Express
=====================================================

Definition (What I should say in the interview):
- "MVC stands for **Model-View-Controller**. The **Model** represents data and talks to the
   database, the **View** is what the user sees - HTML templates or, in an API, the JSON
   response - and the **Controller** receives the request, calls the model, and decides what
   to send back. In Express, routes point to controller functions. In real projects I usually
   add a **service layer** between controller and model, so controllers stay thin."

-----------------------------------------------------
Flow
-----------------------------------------------------
Request -> Route -> Middleware -> Controller -> (Service) -> Model -> DB
                                      |
Response  <-  View (EJS / JSON)  <----+

-----------------------------------------------------
Example (Mongoose + EJS)
-----------------------------------------------------
// models/Post.js  (Model)
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({ title: String, body: String });
module.exports = mongoose.model('Post', postSchema);

// controllers/postController.js  (Controller)
const Post = require('../models/Post');
exports.listPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ _id: -1 }).limit(10);
    if (req.accepts('html')) return res.render('posts/index', { posts }); // View (HTML)
    res.json(posts);                                                       // View (JSON)
  } catch (err) { next(err); }
};

// routes/postRoutes.js
const router = require('express').Router();
const { listPosts } = require('../controllers/postController');
router.get('/', listPosts);
module.exports = router;

// views/posts/index.ejs  (View)
// <% posts.forEach(p => { %> <h2><%= p.title %></h2> <% }) %>

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Fat models / thin controllers: business rules shouldn't live in route handlers.
- For pure REST APIs the "View" is the JSON serializer / DTO.
- MVC is a convention in Express; frameworks like NestJS or Sails enforce it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why add a service layer?
A1: Business logic becomes reusable (cron jobs, queues) and testable without req/res.

Q2: Advantages of MVC?
A2: Separation of concerns, parallel work by different developers, easier testing and maintenance.
*/
