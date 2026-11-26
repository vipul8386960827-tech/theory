/* 36_dns_lookup_vs_resolve.js

=====================================================
dns.lookup vs dns.resolve
=====================================================

Definition (What I should say in the interview):
- "Both turn a hostname into an IP address, but they work very differently. **dns.lookup** uses
   the operating system's getaddrinfo, so it respects /etc/hosts and OS DNS config, but
   getaddrinfo is blocking, so libuv runs it on the **thread pool**. **dns.resolve** and the
   resolve4/resolveMx family use the **c-ares** library, which sends DNS queries over the network
   directly and asynchronously, **without the thread pool** and without reading the hosts file.
   http.get and most clients use dns.lookup by default."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect              | dns.lookup                    | dns.resolve / resolve4 / resolveMx |
|---------------------|-------------------------------|------------------------------------|
| Implementation      | OS getaddrinfo                | c-ares library                     |
| Thread pool         | YES                           | NO (async network I/O)             |
| Reads /etc/hosts    | yes                           | no                                 |
| Record types        | addresses only (A/AAAA)       | A, AAAA, MX, TXT, SRV, CNAME, NS...|
| Used by http/net    | yes, by default               | no (unless custom lookup)          |
| Behaves like        | ping / other OS programs      | a real DNS query                   |

-----------------------------------------------------
Example
-----------------------------------------------------
const dns = require('dns');

dns.lookup('localhost', (err, address, family) => {
  console.log('lookup:', address, 'IPv' + family);     // lookup: 127.0.0.1 IPv4 (or ::1)
});

dns.resolve4('example.com', (err, addresses) => {
  console.log('resolve4:', err ? err.code : addresses); // direct DNS server answer
});

dns.resolveMx('gmail.com', (err, records) => {
  console.log('mx:', err ? err.code : records.slice(0, 2));
});

// dns.resolve4('localhost') usually fails - c-ares does not read the hosts file.

-----------------------------------------------------
Production Issue Worth Mentioning
-----------------------------------------------------
- An app making many outgoing HTTP calls + doing heavy fs/crypto: dns.lookup calls queue behind
  them in the 4-thread pool, so outbound requests feel slow. Fixes: increase UV_THREADPOOL_SIZE,
  enable keep-alive agents (fewer lookups), or cache DNS results.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one would you use to validate an email domain?
A1: dns.resolveMx, because I need MX records, which lookup cannot return.

Q2: Does Node cache DNS results?
A2: No built-in cache for lookup; it relies on the OS. Libraries or a custom lookup function can add caching.

Q3: How do you make http use c-ares?
A3: Pass a custom lookup function in the request/agent options that uses dns.resolve.
*/
