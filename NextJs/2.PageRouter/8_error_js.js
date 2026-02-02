/* 8_error_js */
/*
Key Points (Interviewer Keywords + Explanation):
1. _error.js – Special Pages Router file in Next.js used for custom error handling.

2. Purpose – Render a custom error page for 404 (Not Found), 500 (Server Error),
   or other HTTP status codes.

3. Features –
   - Located at `pages/_error.js`.
   - Receives `statusCode` prop to display different messages.
   - Can override default Next.js error page.
   - Can be combined with getInitialProps for server-side error data.

4. Benefits –
   - Provides better UX for errors.
   - Custom styling and messages for different error types.
   - Consistent error handling across pages.
*/

/*
Definition (Using Specific Terms):
`_error.js` is a Pages Router file that allows developers to create a
custom error page for server-side or client-side errors, replacing the
default Next.js error page.
*/

/*
Code Example (_error.js):

// pages/_error.js
function Error({ statusCode }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error {statusCode}</h1>
      <p>
        {statusCode === 404
          ? "Page not found"
          : "An unexpected error occurred"}
      </p>
    </div>
  );
}

// Optional: Fetch status code server-side
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

/*
Important Notes:
- _error.js handles both client-side and server-side errors.
- Can customize layout, style, and messages.
- getInitialProps is used to access server-side error info.
- For Next.js 13+ App Router, error handling is done via `error.js` in app folders.
*/

/*
Follow-up Questions + Answers:

Q1: What is _error.js in Next.js?
A1: A Pages Router file for custom error pages (404, 500, etc.).

Q2: How do you get the status code in _error.js?
A2: Use getInitialProps with res.statusCode or err.statusCode.

Q3: Can _error.js be styled?
A3: Yes, fully customizable with CSS or component layouts.

Q4: Does _error.js replace Next.js default error page?
A4: Yes, it overrides the default.

Q5: How is error handling different in App Router?
A5: App Router uses `error.js` inside app folders for error boundaries.
*/