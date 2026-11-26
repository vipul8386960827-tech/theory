/* 19_microservices_vs_monolith.js

=====================================================
Microservices vs Monolith
=====================================================

Definition (What I should say in the interview):
- "A **monolith** is one application and one deployable unit that contains all features - users,
   orders, payments - usually sharing one database. **Microservices** split the system into
   **small independent services**, each owning its own data, deployed and scaled separately,
   and talking over HTTP/gRPC or message queues. A monolith is faster to build and easier to
   debug at the start; microservices help when the team and traffic grow, but they add network
   calls, distributed data and a lot of DevOps work. Honestly, most projects should start as a
   **well-structured (modular) monolith** and split out services only when there is a clear need."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect            | Monolith                         | Microservices                        |
|-------------------|----------------------------------|--------------------------------------|
| Deployment        | One unit, deploy everything      | Each service independently           |
| Scaling           | Scale the whole app              | Scale only the hot service           |
| Data              | One shared DB, easy transactions | DB per service, eventual consistency |
| Communication     | Function calls (fast)            | Network calls (latency, failures)    |
| Debugging         | Single log/stack trace           | Needs tracing, correlation IDs       |
| Team              | Small teams                      | Many teams owning services           |
| Tech stack        | One stack                        | Each service can differ              |
| Ops overhead      | Low                              | High (K8s, gateway, monitoring)      |

-----------------------------------------------------
Example (typical Node microservice setup)
-----------------------------------------------------
Client -> API Gateway (auth, rate limit, routing)
            |-> user-service    (Express + PostgreSQL)
            |-> order-service   (Express + MongoDB)   --publish "order.created"--> RabbitMQ
            |-> payment-service (NestJS + PostgreSQL)
                                  RabbitMQ --> notification-service (sends email/SMS)

// order-service calling user-service with a timeout
const { data: user } = await axios.get(`${USER_SVC}/users/${userId}`, { timeout: 2000 });

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- "Distributed monolith": services share one DB or must deploy together -> worst of both.
- Too many sync HTTP chains (A -> B -> C -> D) -> one slow service slows everything.
  Use async events where possible, plus timeouts, retries and circuit breakers.
- Need centralized logging, distributed tracing (OpenTelemetry) and health checks.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you handle a transaction across services?
A1: No single DB transaction; use the Saga pattern (sequence of local transactions with
    compensating actions) and events.

Q2: What is an API gateway?
A2: A single entry point that routes requests to services and handles auth, rate limiting, CORS.

Q3: When would you split a monolith?
A3: When one module needs to scale or deploy independently, or teams block each other.
*/
