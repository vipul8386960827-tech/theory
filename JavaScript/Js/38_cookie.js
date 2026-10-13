/*
38_cookie.js – Interview-Ready Answer

"Cookies are small pieces of data stored by the browser.
They are commonly used for session management, authentication,
and storing user preferences. Cookies can be sent automatically
with HTTP requests to the server, depending on their attributes."

1. KEY POINTS

- Cookies are stored as name-value pairs.
- A cookie is typically limited to approximately 4 KB.
- Cookies can have expiration, path, domain, and security attributes.
- Matching cookies are automatically sent with HTTP requests.
- JavaScript can access cookies through document.cookie,
  unless they are marked HttpOnly.

2. SET A COOKIE

document.cookie = "theme=dark; max-age=3600; path=/; SameSite=Lax";

- theme=dark: cookie name and value.
- max-age=3600: expires after 3600 seconds.
- path=/: makes it available throughout the site.
- SameSite=Lax: restricts certain cross-site cookie requests.

3. READ COOKIES

console.log(document.cookie);

// Example output:
// "theme=dark; username=Alex"

document.cookie returns a string containing accessible cookies,
not a normal JavaScript object.

4. DELETE A COOKIE

document.cookie = "theme=; Max-Age=0; path=/; SameSite=Lax";

The path and domain must match the cookie's original scope
for deletion to work correctly.

5. IMPORTANT COOKIE ATTRIBUTES

- Secure:
  Sends the cookie only over HTTPS.

- HttpOnly:
  Prevents JavaScript from accessing the cookie.
  Set through an HTTP response header, not document.cookie.

- SameSite:
  Controls when cookies are sent with cross-site requests.
  Common values: Strict, Lax, and None.

- Expires / Max-Age:
  Determines when the cookie expires.

- Path / Domain:
  Controls the URLs or hosts to which the cookie applies.

6. SECURITY

- Authentication cookies should generally use Secure and HttpOnly.
- Choose an appropriate SameSite policy.
- HttpOnly reduces cookie theft through JavaScript but does not
  eliminate the impact of XSS attacks.
- SameSite helps mitigate CSRF but is not a complete CSRF defense.
- Never store sensitive authentication tokens in ordinary
  JavaScript-readable cookies without considering the risks.

7. COOKIES VS LOCALSTORAGE VS SESSIONSTORAGE

Cookies:
- Small storage capacity.
- Can be sent automatically with matching HTTP requests.
- Can be configured with HttpOnly, Secure, and SameSite.

localStorage:
- Stores data across browser sessions.
- Not automatically sent with HTTP requests.
- Accessible through JavaScript.

sessionStorage:
- Usually persists for the lifetime of a page session in a tab.
- Not automatically sent with HTTP requests.
- Accessible through JavaScript.

8. FOLLOW-UP INTERVIEW QUESTIONS

Q1. What is HttpOnly?
A: It prevents JavaScript from reading a cookie.

Q2. What is SameSite?
A: It controls whether cookies are sent with cross-site requests.

Q3. How do you delete a cookie?
A: Set Max-Age=0 or an expiration date in the past,
   matching the cookie's path and domain scope.

Q4. Are cookies automatically sent to the server?
A: Yes, when the request matches the cookie's domain, path,
   security, SameSite, and other applicable rules.

Q5. Can JavaScript set an HttpOnly cookie?
A: No. It must be set by the server using Set-Cookie.
*/