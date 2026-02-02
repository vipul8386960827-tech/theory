/* 
We use Next.js dynamic routing like `/editor/[documentId]`
to uniquely identify a shared document.

All clients opening the same route receive the same `documentId`,
which scopes them to the same editor instance.

On page load, each client fetches the latest document snapshot
from a Next.js API route using this `documentId`.

Each client then initializes its own local editor state,
including DOM, selection, and undo/redo.

A `userId` (from authentication or a temporary ID) is attached
to each client for user identification.
In addition, because we share the auth token with each request,
the backend can use it to verify the user and provide
customized data or permissions.

This enables multiple clients to open and edit the same document
independently; real-time sync and conflict handling are layered later.

Yes, making the URL the source of truth for document identity
is the best and most common approach for collaborative editors.

Benefits of using the URL as the source of truth:

1) Clear document ownership  
The document being edited is explicitly identified.
There is no ambiguity about which document is open.

2) Easy sharing and collaboration  
Users can share a single URL and collaborate instantly.
No extra context or state is required.

3) Stateless client entry  
Any client can open the editor directly from the URL.
No dependency on prior session or local state.

4) Better scalability  
Servers do not need to track per-user editor state.
Requests can be routed purely based on documentId.

5) Works naturally with real-time systems  
WebSocket rooms or channels can map directly to documentId.
This simplifies collaboration infrastructure.

6) Easier debugging and observability  
Logs, metrics, and errors can be traced per documentId.
This helps during production debugging.

7) Cleaner mental model  
URL identifies the document.  
Backend stores the content.  
Real-time layer syncs changes.  
Each responsibility is clearly separated.

Authentication and authorization:

Yes, authentication tokens are used to determine
whether a user has access to a document or not.

Important distinction:
- URL determines which document is being requested
- Token determines whether the user is allowed to access it

Flow in a real system:
1) User opens /editor/{documentId}
2) Client sends auth token (JWT or session) with the request
3) Backend validates the token
4) Backend checks if the user has access to {documentId}
5) Backend responds indicating whether the user can edit
   or not
6) Based on the response, the client routes either to
   the edit page or a permission-denied page

Why URL + token is the best combination:
- URL is public and shareable
- Token enforces security and permissions
- Backend can provide customized user data or permissions
- Clean separation of concerns

What NOT to do:
- Do not encode permissions inside the URL
- Do not rely on URL alone for security

Interview conclusion:
The URL is the source of truth for document identity,
while the auth token is the source of truth for authorization.
Both are required and serve different purposes.
The token also enables the backend to customize the user experience
and enforce permissions in real time.
*/
/* 
Alternative approach:

Instead of using the URL as the source of truth, 
we could resolve the document purely from the user session or workspace context. 
For example, when a user opens the editor, the backend decides 
which document to load based on their last active document or assigned workspace.

Drawbacks / Trade-offs:

- Harder to share links: Users cannot directly share a document via URL.
- Less transparent: It's unclear which document is open without checking backend state.
- Extra backend dependency: Every client request must query the server to determine document identity.
- Poor collaboration UX: Multiple users cannot easily join the same document without an explicit identifier.

Because of these drawbacks, using the URL as the source of truth 
is simpler, more scalable, and collaboration-friendly.
*/
