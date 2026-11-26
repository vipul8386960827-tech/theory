/* 15_nginx_reverse_proxy.js

=====================================================
Nginx as a Reverse Proxy for Node.js
=====================================================

Definition (What I should say in the interview):
- "A **reverse proxy** sits in front of my Node app and receives all client requests, then
   forwards them to the app. I usually put **Nginx** in front of Node because it handles things
   Nginx is better at: **SSL termination**, serving **static files**, **gzip**, **load balancing**
   across multiple Node instances, request size limits and basic rate limiting. The Node app
   then runs on a private port like 3000 and only Nginx is exposed on 80/443."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Clients -> Nginx (443) -> Node (127.0.0.1:3000). Node is not directly exposed.
2. Pass real client info with X-Forwarded-For / X-Forwarded-Proto headers.
3. In Express set app.set('trust proxy', 1) so req.ip and req.protocol are correct.
4. WebSockets need the Upgrade and Connection headers forwarded.
5. Nginx is event-driven too, very good at many slow clients and static content.

-----------------------------------------------------
Example (nginx config)
-----------------------------------------------------
server {
  listen 443 ssl;
  server_name api.example.com;
  ssl_certificate     /etc/letsencrypt/live/api.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

  client_max_body_size 10m;
  gzip on;

  location /static/ {
    root /var/www/app;            # served by nginx, never reaches Node
    expires 7d;
  }

  location /socket.io/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Forgetting trust proxy -> every request seems to come from 127.0.0.1, rate limiting breaks.
- Missing Upgrade headers -> WebSocket connections fail and fall back to polling.
- Default proxy_read_timeout is 60s -> long requests or SSE get cut; increase if needed.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just expose Node on port 80/443?
A1: You can, but Nginx handles TLS, static files and slow clients more efficiently, and
    binding ports below 1024 needs root privileges.

Q2: Forward proxy vs reverse proxy?
A2: A forward proxy acts for clients (hides the client). A reverse proxy acts for servers
    (hides the backend).
*/
