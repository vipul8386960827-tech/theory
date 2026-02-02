/* 442_dns_module.js

=====================================================
DNS Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `dns` module in Node.js provides **functions to perform DNS (Domain Name System) lookups** 
   and resolve domain names into IP addresses. It allows both asynchronous and synchronous resolution, 
   supports different record types, and can be used to query DNS servers directly."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **dns.lookup(hostname[, options], callback)** → Resolves a hostname into an IP address.
2. **dns.resolve(hostname[, rrtype], callback)** → Resolves specific DNS record types (A, AAAA, MX, TXT, CNAME, etc.).
3. **dns.resolve4 / dns.resolve6** → Resolve IPv4 or IPv6 addresses specifically.
4. **dns.reverse(ip, callback)** → Performs reverse DNS lookup to get the hostname from an IP.
5. **dnsPromises** → Promise-based API for modern async/await usage.
6. Can use custom DNS servers with **dns.setServers([...])**.
7. Event-driven API for handling resolution results and errors.

-----------------------------------------------------
Basic Example (Simple Lookup)
-----------------------------------------------------
const dns = require('dns');

dns.lookup('example.com', (err, address, family) => {
  if (err) throw err;
  console.log('Address:', address, 'Family:', family);
});

-----------------------------------------------------
Example (Resolve MX Records)
-----------------------------------------------------
dns.resolve('example.com', 'MX', (err, addresses) => {
  if (err) throw err;
  console.log('MX Records:', addresses);
});

-----------------------------------------------------
Example (Using Promises)
-----------------------------------------------------
const dnsPromises = require('dns').promises;

async function resolveDomain() {
  try {
    const addresses = await dnsPromises.resolve4('example.com');
    console.log('IPv4 Addresses:', addresses);
  } catch (err) {
    console.error(err);
  }
}

resolveDomain();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Translating domain names to IP addresses in Node.js applications.
- Checking DNS records for email servers (MX records) or other services.
- Reverse lookups for logging or auditing purposes.
- Using custom DNS servers for testing or routing.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. **dns.lookup** uses the operating system’s DNS resolution, while **dns.resolve** queries the DNS server directly.
2. Supports multiple DNS record types: A, AAAA, MX, TXT, CNAME, NS, etc.
3. Prefer **dnsPromises** for modern async/await code.
4. Handle errors properly; failed lookups will trigger callbacks or throw exceptions in promises.
5. Useful in networking, monitoring, and server-side applications needing domain resolution.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the DNS module as a **phone book**:
  - You provide a domain name (person's name), and it gives you the corresponding IP address (phone number).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `dns.lookup` and `dns.resolve`?  
A1: `dns.lookup` uses the OS resolver, while `dns.resolve` queries DNS servers directly.

Q2: How do you perform a reverse DNS lookup?  
A2: Use `dns.reverse(ip, callback)` to get the hostname for a given IP.

Q3: Can you use promises with the dns module?  
A3: Yes, using `dns.promises` API.

Q4: What DNS record types can be resolved?  
A4: A, AAAA, MX, TXT, CNAME, NS, SOA, SRV, etc.

Q5: How can you set custom DNS servers?  
A5: Use `dns.setServers(['8.8.8.8', '8.8.4.4'])`.
*/
