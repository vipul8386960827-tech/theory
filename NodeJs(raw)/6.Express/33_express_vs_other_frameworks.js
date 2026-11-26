/* 33_express_vs_other_frameworks.js

=====================================================
Express vs Other Node.js Frameworks (Fastify, NestJS, Koa)
=====================================================

Definition (What I should say in the interview):
- "Express is the most widely used Node framework - minimal, flexible and with the biggest
   ecosystem, so it's a safe default. **Fastify** focuses on performance and has built-in JSON
   schema validation and serialization. **Koa** was made by the Express team and uses a
   cleaner async/await middleware model with a single ctx object. **NestJS** is an opinionated,
   TypeScript-first framework with modules, decorators and dependency injection - and it
   actually runs on top of Express or Fastify. I'd pick based on team size and requirements."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature            | Express          | Fastify             | Koa               | NestJS                |
|--------------------|------------------|---------------------|-------------------|-----------------------|
| Style              | Minimal          | Minimal + plugins   | Very minimal      | Opinionated, Angular-like |
| Performance        | Good             | Very high           | Good              | Depends on adapter    |
| Async support      | Callbacks (5: promises) | Native async | Native async      | Native async          |
| Validation         | Third-party      | Built-in JSON schema| Third-party       | class-validator pipes |
| TypeScript         | Via @types       | Good                | Via @types        | First-class           |
| Structure          | You decide       | Plugins/encapsulation | You decide      | Modules, DI enforced  |
| Ecosystem          | Largest          | Growing             | Smaller           | Large                 |
| Learning curve     | Low              | Low-medium          | Low               | Higher                |

-----------------------------------------------------
Same endpoint in each
-----------------------------------------------------
// Express
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));

// Fastify
fastify.get('/users/:id', async (request) => ({ id: request.params.id }));

// Koa (with @koa/router)
router.get('/users/:id', async (ctx) => { ctx.body = { id: ctx.params.id }; });

// NestJS
// @Controller('users')
// export class UsersController {
//   @Get(':id') findOne(@Param('id') id: string) { return { id }; }
// }

-----------------------------------------------------
When to choose what
-----------------------------------------------------
- Express  -> most projects, quick APIs, team familiarity, huge middleware choice.
- Fastify  -> high-throughput services where latency matters.
- NestJS   -> large teams / enterprise apps that need enforced structure and DI.
- Koa      -> want Express-like minimalism with a cleaner async middleware model.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is Fastify faster than Express?
A1: Optimised radix-tree router, schema-based fast JSON serialization, and less overhead per request.

Q2: Is Express outdated?
A2: Not really - Express 5 is actively maintained, adds native promise support, and it's still the most used.
*/
