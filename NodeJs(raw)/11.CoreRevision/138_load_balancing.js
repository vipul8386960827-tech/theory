/* 6_load_balancing.js

=====================================================
Load Balancing
=====================================================

Definition (What I should say in the interview):
- "Load balancing means **distributing incoming traffic across multiple server instances** so
   no single instance is overloaded. It gives better **throughput**, **high availability** (if
   one instance dies, traffic goes to the others) and lets me scale horizontally. In Node
   projects the load balancer is usually **Nginx**, a cloud LB like **AWS ALB**, or a
   Kubernetes Service, and inside one machine the cluster module or PM2 does it."

-----------------------------------------------------
Common Algorithms
-----------------------------------------------------
| Algorithm          | How it works                                  | Good when                |
|--------------------|-----------------------------------------------|--------------------------|
| Round robin        | Requests go to servers in turn                | Servers are equal        |
| Weighted RR        | Bigger servers get more requests              | Mixed instance sizes     |
| Least connections  | Pick server with fewest active connections    | Long-lived requests/WS   |
| IP hash            | Same client IP -> same server                 | Need sticky behavior     |
| Random / P2C       | Random pick (power of two choices)            | Large fleets             |

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Layer 4** (TCP) LB forwards connections; **Layer 7** (HTTP) LB can route by path/header.
2. **Health checks** -> LB stops sending traffic to an unhealthy instance (e.g. GET /health).
3. **SSL termination** is often done at the LB.
4. The app should be **stateless** so any instance can serve any request.

-----------------------------------------------------
Example (health check endpoint + nginx upstream)
-----------------------------------------------------
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'db down' });
  }
});

# nginx
upstream api {
  least_conn;
  server 10.0.0.1:3000;
  server 10.0.0.2:3000;
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Load balancer itself can be a single point of failure -> managed LBs are redundant.
- Forgetting to read the real client IP -> use X-Forwarded-For and app.set('trust proxy', 1).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which algorithm for WebSocket servers?
A1: Least connections, often plus sticky sessions, because connections live for a long time.

Q2: What is the difference between a load balancer and a reverse proxy?
A2: A reverse proxy sits in front of servers (caching, SSL, routing); load balancing is one
    of its jobs when there are multiple backends. Nginx can do both.
*/
