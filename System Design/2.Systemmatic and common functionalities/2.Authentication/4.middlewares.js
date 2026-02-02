/*
Middleware in Next.js runs before a request reaches a route or page.
It executes on the server or edge and is mainly used for authentication,
authorization, redirects, and request preprocessing.

In middleware, we can read tokens and user roles from HttpOnly cookies.
This allows us to protect routes, for example preventing non-admin users
from accessing admin-only pages.

Middleware runs on every matching request before rendering or API execution.
If a token is missing or expired, we can immediately redirect the user
back to the login page.

We control where middleware runs using matchers, which specify the paths
that should be checked before each request.
*/
