/* 7_vertical_vs_horizontal_scaling.js

=====================================================
Vertical vs Horizontal Scaling
=====================================================

Definition (What I should say in the interview):
- "**Vertical scaling** (scale up) means giving one server **more resources**, like more CPU or
   RAM. **Horizontal scaling** (scale out) means **adding more servers or instances** and putting
   a load balancer in front. Vertical is simple but has a hardware limit and a single point of
   failure. Horizontal is more resilient and almost unlimited, but the app must be
   **stateless**. For Node specifically, adding CPU cores only helps if I also run more processes,
   because one Node process uses one core for JavaScript."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect             | Vertical (Scale Up)         | Horizontal (Scale Out)           |
|--------------------|-----------------------------|----------------------------------|
| How                | Bigger machine              | More machines / containers       |
| Limit              | Hardware ceiling            | Practically none                 |
| Downtime           | Often needs restart/resize  | Add instances with no downtime   |
| Failure            | Single point of failure     | Redundant                        |
| Code changes       | None                        | Must be stateless, shared store  |
| Cost               | Gets expensive fast         | Pay per instance, autoscaling    |

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Node detail: a 16-core box with ONE node process wastes 15 cores -> use cluster/PM2
   (this is still "scaling up" the machine, but you need multiple processes to use it).
2. Horizontal needs: load balancer, shared sessions (Redis), shared file storage (S3),
   central DB, centralized logs.
3. Databases are harder to scale horizontally -> read replicas, sharding.
4. Autoscaling (AWS ASG, Kubernetes HPA) adds/removes instances based on CPU or requests.

-----------------------------------------------------
Example (Kubernetes horizontal autoscaling)
-----------------------------------------------------
kubectl scale deployment api --replicas=5
kubectl autoscale deployment api --cpu-percent=70 --min=2 --max=10

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Scaling out an app that keeps uploads on local disk -> files missing on other instances.
- Scaling servers when the real bottleneck is a slow DB query -> fix the query/index first.
- Usually you do both: right-size the instance (vertical) and run several of them (horizontal).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one would you choose first?
A1: For a small app, vertical is quickest. For production with traffic growth and uptime
    needs, horizontal behind a load balancer.

Q2: Is running cluster on one machine horizontal or vertical?
A2: It is using the machine's cores better (process-level scaling on one box). True
    horizontal scaling means multiple machines/containers.
*/
