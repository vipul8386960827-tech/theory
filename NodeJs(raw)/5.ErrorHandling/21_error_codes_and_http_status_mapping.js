/* 21_error_codes_and_http_status_mapping.js

=====================================================
Error Codes and HTTP Status Mapping
=====================================================

Definition (What I should say in the interview):
- "Each error should map to the **right HTTP status code** so clients know what went wrong and
   whether to retry. **4xx means the client did something wrong** - bad input, not logged in, no
   permission, not found, conflict. **5xx means the server failed** - bugs, DB down, upstream
   timeout. Besides the status, I return a stable **application error code** like
   'USER_NOT_FOUND' or 'EMAIL_TAKEN' in the body, because the frontend can switch on that instead
   of parsing messages."

-----------------------------------------------------
Common Status Codes
-----------------------------------------------------
| Status | Name                  | When                                         |
|--------|-----------------------|----------------------------------------------|
| 400    | Bad Request           | Validation failed, malformed JSON, bad ID    |
| 401    | Unauthorized          | Not logged in / invalid or expired token     |
| 403    | Forbidden             | Logged in but no permission                  |
| 404    | Not Found             | Route or resource does not exist             |
| 409    | Conflict              | Duplicate email, version conflict            |
| 422    | Unprocessable Entity  | Valid format but business rule failed        |
| 429    | Too Many Requests     | Rate limit hit (send Retry-After)            |
| 500    | Internal Server Error | Unexpected bug                               |
| 502    | Bad Gateway           | Upstream service returned invalid response   |
| 503    | Service Unavailable   | Overloaded, maintenance, DB down             |
| 504    | Gateway Timeout       | Upstream did not respond in time             |

-----------------------------------------------------
Example (mapping known errors in one place)
-----------------------------------------------------
const errorMap = {
  ValidationError:   { status: 400, code: 'VALIDATION_ERROR' },
  TokenExpiredError: { status: 401, code: 'TOKEN_EXPIRED' },
  JsonWebTokenError: { status: 401, code: 'INVALID_TOKEN' },
  CastError:         { status: 400, code: 'INVALID_ID' },
};

function mapError(err) {
  if (err.statusCode) return { status: err.statusCode, code: err.code || 'APP_ERROR' };
  if (err.code === 11000) return { status: 409, code: 'DUPLICATE_KEY' };   // MongoDB
  if (err.code === 'ECONNREFUSED') return { status: 503, code: 'SERVICE_UNAVAILABLE' };
  return errorMap[err.name] || { status: 500, code: 'INTERNAL_ERROR' };
}

app.use((err, req, res, next) => {
  const { status, code } = mapError(err);
  res.status(status).json({
    error: { code, message: status < 500 ? err.message : 'Internal server error' },
  });
});

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Returning 200 with { success: false } -> breaks monitoring, caching and client error handling.
- Using 401 for "no permission" -> that is 403. 401 = who are you, 403 = I know you, but no.
- Returning 500 for validation errors -> alerts fire for client mistakes.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: 400 vs 422?
A1: 400 for malformed or invalid syntax; 422 when the data is well-formed but fails business rules.
    Many teams just use 400 for both - consistency matters more.

Q2: Why does 4xx vs 5xx matter for retries?
A2: 5xx (especially 502/503/504) can be retried; 4xx usually will fail again unless the request changes
    (except 429, retry after the given delay).
*/
