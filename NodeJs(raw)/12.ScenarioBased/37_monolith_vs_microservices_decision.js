/* 37_monolith_vs_microservices_decision.js

=====================================================
Scenario: Should we break the monolith into microservices?
=====================================================

The Question (how the interviewer asks it):
- "Our team wants to break our Node.js monolith into microservices because
   'it is the modern way'. What is your opinion?"

What the interviewer is checking:
- Do you choose architecture by real problems, not by hype?
- Do you know the costs of microservices (network, ops, data consistency)?
- Do you know the "modular monolith first" approach?
- Do you understand sync vs async communication and data ownership?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Ask "what problem are we solving?" Slow deploys? Teams blocking each
   other? One part needs very different scaling? If there is no clear pain,
   microservices add cost without benefit.
2. List the costs: network calls can fail, harder debugging (need tracing),
   many deployments and pipelines, data consistency across services, more
   infrastructure (Kubernetes, service discovery, monitoring).
3. Suggest a modular monolith first: one deployable app, but clear modules
   (users, orders, payments) with their own folders, interfaces and tables.
   No module touches another module's tables directly.
4. Extract a service only when there is a clear reason: e.g. image
   processing needs heavy CPU scaling, or a separate team owns payments.
   Use the strangler fig pattern: move one piece at a time behind the same
   API.
5. Communication: sync (REST/gRPC) when you need an answer now; async
   (RabbitMQ, Kafka, SQS) for events like "OrderCreated" so services stay
   loosely coupled.
6. Data ownership: each service owns its database. Others get data via API
   or events. For multi-step flows use the saga pattern instead of
   distributed transactions.
7. Before splitting, have the basics: CI/CD, centralized logs, correlation
   ids, tracing (OpenTelemetry), health checks.

-----------------------------------------------------
Code Example (comparison + diagram)
-----------------------------------------------------
| Topic          | Modular monolith           | Microservices               |
|----------------|----------------------------|-----------------------------|
| Deploy         | one app                    | many independent apps       |
| Calls          | function calls (fast)      | network calls (can fail)    |
| Data           | one DB, separate tables    | DB per service              |
| Transactions   | normal DB transactions     | sagas, eventual consistency |
| Debugging      | one log, one stack trace   | need tracing + correlation  |
| Scaling        | scale the whole app        | scale each service alone    |
| Best for       | small/medium teams         | many teams, clear domains   |

Event-driven example after extracting a service:

  [Client] -> [API Gateway]
                  |
        +---------+----------+
        |                    |
  [Orders service]     [Users service]
   (orders DB)          (users DB)
        |
        |  publish "OrderCreated"
        v
   [ Message queue: RabbitMQ / Kafka / SQS ]
        |                    |
        v                    v
  [Email service]     [Inventory service]
   sends receipt       reserves stock

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would not split just because it is modern. First I ask what problem we
   have: slow deploys, team conflicts or one part with special scaling
   needs. Microservices bring real costs: network failures, distributed
   data, more DevOps and harder debugging. My usual advice is a modular
   monolith first with clear module boundaries, then extract services one by
   one when there is a real reason, using events through a message queue and
   giving each service its own data."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Microservices are always better / more scalable."
- Many services sharing one database (a "distributed monolith").
- Long chains of synchronous HTTP calls - one slow service breaks everything.
- Splitting without logging, tracing, and CI/CD in place.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a distributed monolith?
A1: Services that are deployed separately but still tightly coupled (shared
    DB, must deploy together). You get the costs of both and benefits of none.

Q2: How do you keep data consistent across services?
A2: Use the saga pattern: each step is a local transaction that publishes an
    event; on failure, run compensating actions (e.g. refund). Use the
    outbox pattern so DB writes and events do not get out of sync.

Q3: When do you use a queue instead of a direct HTTP call?
A3: When the caller does not need an immediate answer, the work is slow, or
    we want to survive the other service being down for a while.
*/
