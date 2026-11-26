/* 11_project_structure.js

=====================================================
Express Project Structure
=====================================================

Definition (What I should say in the interview):
- "Since Express is unopinionated, I follow a **layered structure**: routes only map URLs to
   controllers, controllers handle req and res, services contain the business logic, and
   models talk to the database. Config, middleware and utils live in their own folders. I also
   separate app.js, which builds the Express app, from server.js, which calls listen - that
   makes it easy to test the app with Supertest without opening a real port."

-----------------------------------------------------
Typical structure
-----------------------------------------------------
src/
  config/          -> env loading, db connection
  routes/          -> user.routes.js (URL -> controller)
  controllers/     -> user.controller.js (req/res handling)
  services/        -> user.service.js (business logic, no req/res)
  models/          -> user.model.js (Mongoose / Sequelize / Prisma)
  middlewares/     -> auth.js, validate.js, errorHandler.js
  utils/           -> AppError.js, asyncHandler.js, logger.js
  validators/      -> Joi / Zod schemas
  app.js           -> creates and configures express app
  server.js        -> starts server, graceful shutdown
tests/

-----------------------------------------------------
Example (layers in action)
-----------------------------------------------------
// services/user.service.js
const User = require('../models/user.model');
exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

// controllers/user.controller.js
const userService = require('../services/user.service');
exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) { next(err); }
};

// routes/user.routes.js
router.get('/:id', auth, userController.getUser);

// server.js
const app = require('./app');
const server = app.listen(process.env.PORT || 3000);
process.on('SIGTERM', () => server.close(() => process.exit(0)));

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Services shouldn't know about req/res -> reusable from cron jobs, queues, tests.
- Some teams prefer feature-based folders (users/, orders/ each with routes+controller+service)
  which scales better in large codebases.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why separate app.js and server.js?
A1: Tests can import app and use supertest(app) without binding to a port.

Q2: Layer-based vs feature-based structure?
A2: Layer-based is simple for small apps; feature-based keeps related code together as the app grows.
*/
