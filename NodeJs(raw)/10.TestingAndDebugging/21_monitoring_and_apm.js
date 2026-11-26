/* 21_monitoring_and_apm.js

=====================================================
Monitoring and APM
=====================================================

Definition (What I should say in the interview):
- "Monitoring means continuously collecting data about the running app - metrics like CPU,
   memory, request rate, error rate and latency - and alerting when something goes wrong.
   **APM**, Application Performance Monitoring, tools like New Relic, Datadog, Dynatrace or
   Elastic APM go deeper: they instrument the Node app automatically and show slow endpoints,
   slow DB queries, error traces and distributed traces across services. Together with logs,
   these are the three pillars of observability: **logs, metrics and traces**."

-----------------------------------------------------
What I monitor in a Node service
-----------------------------------------------------
1. Golden signals: latency (p50/p95/p99), traffic (req/s), errors (5xx rate), saturation.
2. Node specific: event loop lag, heap used, GC pauses, active handles.
3. Dependencies: DB query time, external API latency, queue length.
4. Health endpoints: /health (liveness) and /ready (readiness) for load balancers / Kubernetes.

-----------------------------------------------------
Example - Prometheus metrics with prom-client
-----------------------------------------------------
const client = require('prom-client');
client.collectDefaultMetrics();              // heap, GC, event loop lag, CPU

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status'],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () =>
    end({ method: req.method, route: req.route?.path || req.path, status: res.statusCode }));
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});
// Prometheus scrapes /metrics -> Grafana dashboards + alerts

// APM agent: usually must load FIRST so it can patch http, DB drivers, etc.
//   node -r dd-trace/init app.js            (Datadog)
//   require('newrelic');  // first line of app.js (New Relic)
// OpenTelemetry is the vendor-neutral standard for traces and metrics.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Alert on symptoms users feel (error rate, latency) rather than every CPU spike.
- Error tracking tools (Sentry) group exceptions with stack traces and release info.
- Process managers (PM2) also give basic monitoring: pm2 monit.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why look at p95/p99 instead of average latency?
A1: Averages hide outliers; p99 shows what the slowest 1% of users experience, which is often
    where problems like GC pauses or slow queries show up.

Q2: What is distributed tracing?
A2: Passing a trace id through all services a request touches, so you can see one request's
    full path and timing across API gateway, services and databases.
*/
