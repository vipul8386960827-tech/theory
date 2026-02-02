/* 17_custom_error_pages */
/* 17_custom_error_pages */

/*
WHAT ARE CUSTOM ERROR PAGES
Custom error pages let you show user-friendly pages
when something goes wrong instead of default Next.js errors.

They help improve UX and branding.
*/

/*
PAGES ROUTER (pages/)
Next.js supports special files for errors.
*/

/*
1) 404 ERROR PAGE (Page Not Found)
Create this file:
pages/404.js

This page is shown when no route matches.
*

export default function Custom404() {
  return <h1>404 – Page Not Found</h1>;
}

/*
2) 500 ERROR PAGE (Server Error)
Create this file:
pages/500.js

Shown when server crashes or throws error.
*/

export function Custom500() {
  return <h1>500 – Server Error</h1>;
}

/*
3) _error.js (Advanced control)
Create this file:
pages/_error.js

Handles both 404 and 500 errors.
Runs on server and client.

function Error({ statusCode }) {
  return (
    <h1>
      {statusCode
        ? `Error ${statusCode} occurred`
        : "An error occurred"}
    </h1>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : 404;

  return { statusCode };
};

export default Error;

/*
IMPORTANT NOTES (INTERVIEW)
- 404.js is preferred for not-found pages
- 500.js is for server errors
- _error.js gives full control but disables static optimization
*/

/*
APP ROUTER (app/)
Different approach using special files.
*/

/*
1) not-found.js
Used for 404 errors.

export default function NotFound() {
  return <h1>404 – Page Not Found</h1>;
}

/*
2) error.js
Used for runtime errors.
Must be Client Component.
*/

"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}

/*
INTERVIEW ONE-LINER
Pages router uses 404.js, 500.js, _error.js.
App router uses not-found.js and error.js.
*/
