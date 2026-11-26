/* 21_express_app_vs_router.js

=====================================================
express() app vs express.Router()
=====================================================

Definition (What I should say in the interview):
- "express() creates the **main application** - it has settings, a view engine, app.locals
   and the listen() method to start the server. express.Router() creates a **mini-application**
   that only has routing and middleware - no settings and no listen. Routers are mounted into
   the app with app.use(path, router). Usually there is one app and many routers, one per
   feature or resource."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature                    | express() app            | express.Router()          |
|----------------------------|--------------------------|---------------------------|
| Created by                 | express()                | express.Router()          |
| Starts a server            | app.listen()             | No                        |
| Settings (app.set/enable)  | Yes                      | No                        |
| View engine / render       | Yes                      | No (uses app's)           |
| Middleware + routes        | Yes                      | Yes                       |
| app.locals                 | Yes                      | No                        |
| Mountable                  | Yes (sub-app)            | Yes                       |
| Typical count              | One                      | Many                      |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');

// Router: only routes + middleware
const productRouter = express.Router();
productRouter.use((req, res, next) => { req.feature = 'products'; next(); });
productRouter.get('/', (req, res) => res.json({ feature: req.feature, items: [] }));

// Sub-app: a full app mounted inside another (own settings)
const adminApp = express();
adminApp.set('title', 'Admin Panel');
adminApp.get('/', (req, res) => res.send(adminApp.get('title')));
adminApp.on('mount', (parent) => console.log('Admin app mounted'));

// Main app
const app = express();
app.set('trust proxy', 1);
app.use('/api/products', productRouter);
app.use('/admin', adminApp);
app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A sub-app (express() mounted with app.use) inherits some settings from the parent unless it
  sets its own; it emits a "mount" event.
- Router options: caseSensitive, strict, mergeParams.
- Routers are just middleware functions, so you can test them by mounting in a small test app.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you use a sub-app instead of a router?
A1: When a part of the system needs its own settings, like a different view engine or admin
    section; for normal API grouping a router is enough.

Q2: Can a router be mounted on multiple paths?
A2: Yes - e.g. app.use(['/v1/users', '/users'], userRouter).
*/
