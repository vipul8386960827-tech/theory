/* 42_use_https_in_create_react_app.js

=====================================================
Using HTTPS in Create React App (CRA)
=====================================================

Definition:
By default, a Create React App project runs the development server over HTTP.  
You can configure CRA to run over HTTPS, which is useful when testing features 
that require secure contexts (like Service Workers, geolocation, or payment APIs).

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. Why HTTPS in Development?
   - Some APIs (geolocation, clipboard, notifications, etc.) require a secure context.
   - Closer match to production environments that typically run on HTTPS.
   - Helps prevent "mixed content" issues during development.

2. Enabling HTTPS in CRA
   a) Temporary (per session):
      Run the following command in the terminal:
      - macOS/Linux:
        HTTPS=true npm start
      - Windows (PowerShell):
        set HTTPS=true&&npm start

   b) Permanent (via .env file):
      - Create a `.env` file in the root of your project.
      - Add:
        HTTPS=true
        SSL_CRT_FILE=path/to/cert.crt
        SSL_KEY_FILE=path/to/cert.key
      - Restart the development server.

3. Self-Signed Certificates
   - If you don’t provide custom certificates, CRA will generate self-signed ones.
   - Browsers may show a "Not Secure" warning for self-signed certs.

4. Example `.env`
   HTTPS=true
   SSL_CRT_FILE=./certs/cert.pem
   SSL_KEY_FILE=./certs/key.pem

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Using HTTPS in development is like practicing with **safety gear**.  
  You may not strictly need it for local runs, but it prepares you for 
  the real environment where security is mandatory.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why might you need HTTPS in local development?  
A1: To test APIs and features that only work in secure contexts, like Service Workers and push notifications.

Q2: How can you make HTTPS permanent in CRA?  
A2: By creating a `.env` file with `HTTPS=true` and optional SSL cert/key paths.

Q3: What happens if you don’t configure certificates?  
A3: CRA generates a self-signed certificate, which shows a warning in browsers.

Q4: Can HTTPS be enabled in production builds automatically?  
A4: No, CRA only affects the development server. In production, HTTPS must be configured in the hosting environment (e.g., Nginx, Apache, Vercel, Netlify).
*/
