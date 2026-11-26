/* 21_cluster_vs_containers.js

=====================================================
Cluster/PM2 vs Containers (Docker, Kubernetes)
=====================================================

Definition (What I should say in the interview):
- "Both are ways to run multiple Node processes, but at different levels. With **cluster or PM2**,
   one machine runs a primary process that forks workers and restarts them. With **containers
   and Kubernetes**, the usual practice is **one Node process per container**, and I scale by
   increasing the number of **replicas**. The orchestrator already does restarts, load balancing,
   health checks and rolling updates, so adding cluster inside a container duplicates that job and
   makes CPU/memory limits and metrics harder to reason about. So: on a plain VM I use PM2 cluster
   mode; in Kubernetes I run single-process containers and scale replicas."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Concern             | Cluster / PM2 on a VM        | Containers + Kubernetes            |
|---------------------|------------------------------|------------------------------------|
| Unit of scaling     | Worker process               | Pod / container replica            |
| Restart on crash    | Primary or PM2 re-forks      | kubelet restarts the container     |
| Load balancing      | Primary round-robin          | Service / Ingress                  |
| Zero-downtime       | pm2 reload                   | Rolling update + readiness probe   |
| Multi-machine       | No (one box only)            | Yes, across nodes                  |
| Resource limits     | Shared by all workers        | Per container (CPU/memory limits)  |
| Health checks       | Manual                       | liveness/readiness probes          |

-----------------------------------------------------
Example (Kubernetes deployment, single process per pod)
-----------------------------------------------------
apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 4
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: myrepo/api:1.4.0
          command: ["node", "server.js"]       # no PM2, no cluster
          resources: { limits: { cpu: "1", memory: "512Mi" } }
          readinessProbe: { httpGet: { path: /health, port: 3000 } }

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Cluster with os.cpus().length inside a container limited to 1 CPU -> may fork one worker per
  HOST core and oversubscribe. (os.availableParallelism() is better, but limits still matter.)
- If a cluster worker dies inside a pod, Kubernetes does not see it -> health checks can lie.
- Exception: if you are forced to run one big container (e.g. a single VM with Docker only),
  PM2 (pm2-runtime) or cluster inside the container is acceptable.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is "one process per container" preferred?
A1: Clear resource limits, simple logs/metrics, and the orchestrator handles restarts and scaling.

Q2: How do you scale a Node app in Kubernetes?
A2: Increase replicas manually or with a HorizontalPodAutoscaler based on CPU or custom metrics.
*/
