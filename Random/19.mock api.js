/*
MOCK API STRATEGY (WHEN BACKEND IS NOT READY)

In some cases, backend development can lag behind frontend,
so to avoid blocking progress, I use mock APIs.

- I create mock responses that closely match the expected backend API contract
  (same structure, fields, and edge cases).

- This allows frontend development to continue independently
  without waiting for backend completion.

- I design the system in a way that switching to real APIs is seamless:
  - API calls are abstracted (e.g., via service layer or hooks)
  - Only the endpoint/config needs to change
  - No changes required in UI components

- I also simulate different scenarios:
  - Success responses
  - Error responses
  - Empty states

- This ensures the UI is fully ready and tested before backend integration.

- Once backend is ready, integration becomes plug-and-play.
*/
//---------------------------------------------------------------------------------------------------------
/*

HOW I CREATE MOCK APIs (INCLUDING POSTMAN APPROACH)

I use a structured approach for mock APIs,
and Postman Mock Servers are one of the tools I use.

--------------------------------------------------

1. CONTRACT-FIRST THINKING

- I first define the API contract:
  - request structure
  - response structure
  - error format
  - status codes

- This ensures frontend and backend alignment early.

--------------------------------------------------

2. USING POSTMAN MOCK SERVERS

- I use Postman Mock Servers when:
  - backend APIs are not ready
  - I want a quick, shareable mock endpoint
  - I want frontend to consume real HTTP endpoints instead of static JSON

- I define examples in Postman:
  - success response
  - error response
  - empty response

- Postman generates a live mock URL which behaves like a real API.

--------------------------------------------------

3. WHY THIS IS USEFUL

- Frontend can call real HTTP endpoints (not local JSON)
- No need to change code later during backend integration
- Backend team can also refer to the same contract
- Enables parallel development

--------------------------------------------------

4. SERVICE LAYER ABSTRACTION (IMPORTANT)

- I never bind UI directly to Postman URL.

- I create an API layer:
  - userService
  - orderService

- Inside that:
  fetch("postman-mock-url")

- Later I just replace URL with real backend endpoint.

--------------------------------------------------

5. LIMITATIONS I UNDERSTAND

- Postman mocks are static by default
- Limited dynamic behavior compared to real backend
- Not suitable for complex logic simulation

So for advanced cases I may also use:
- MSW (Mock Service Worker)
- local Node/Express mock server

--------------------------------------------------

6. REALISTIC DATA DESIGN

Even in Postman mocks I ensure:
- proper nesting of data
- pagination structure
- consistent response format
- error schema standardization

--------------------------------------------------

FINAL THOUGHT:

Postman Mock Servers help me quickly simulate real APIs,
but I always treat them as part of a broader mock strategy,
not the only solution.
*/
