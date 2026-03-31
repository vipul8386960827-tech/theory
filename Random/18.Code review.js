/*
HOW I APPROACH CODE REVIEWS (DETAILED)

I usually review code in multiple layers instead of randomly pointing things out.
This helps ensure I don’t miss critical aspects.

--------------------------------------------------

1. CORRECTNESS (HIGHEST PRIORITY)

- First, I verify whether the code actually solves the problem it was intended for.
- I check if all possible states are handled:
  - Loading state (API in progress)
  - Success state (data rendered correctly)
  - Error state (API failure, fallback UI)
  - Empty state (no data scenario)

- I also look for edge cases:
  - What happens if API returns null/undefined?
  - What if array is empty?
  - What if user input is invalid?

- I ensure no logical bugs:
  - Wrong conditions
  - Incorrect data mapping
  - Missing dependency in hooks (useEffect, etc.)

--------------------------------------------------

2. PERFORMANCE

- I check for unnecessary re-renders:
  - Are components re-rendering due to unstable props/functions?
  - Should we use memoization (useMemo, useCallback, React.memo)?

- API efficiency:
  - Are we making duplicate API calls?
  - Can we cache data instead of refetching?

- Rendering optimization:
  - Are we rendering large lists without virtualization?
  - Can we lazy load components?

- Avoid heavy computations inside render:
  - Move expensive logic outside or memoize it

--------------------------------------------------

3. SCALABILITY & ARCHITECTURE

- I check if the code is scalable for future changes.

- Separation of concerns:
  - Is UI mixed with business logic?
  - Can logic be moved to hooks/services?

- Reusability:
  - Can this component be reused?
  - Is it too tightly coupled?

- Folder structure:
  - Is the project organized properly?
  - Are components, hooks, and utils separated?

- State management:
  - Is state placed correctly (local vs global)?
  - Is it unnecessarily lifted or duplicated?

--------------------------------------------------

4. READABILITY & MAINTAINABILITY

- Naming conventions:
  - Are variable/function/component names meaningful?

- Code clarity:
  - Is the logic easy to understand?
  - Are there deeply nested conditions?

- Component size:
  - Is the component too large?
  - Should it be broken down into smaller pieces?

- Consistency:
  - Does it follow existing codebase patterns?

- Future developer perspective:
  - Can someone understand this quickly after months?

--------------------------------------------------

5. BACKEND ALIGNMENT (IMPORTANT FOR SYSTEM DESIGN)

- I verify if frontend assumptions match backend APIs:
  - Data shape (fields, types)
  - Nullability
  - Pagination handling

- Error handling:
  - Are backend errors handled gracefully?
  - Are proper messages shown?

- API contract:
  - Is the integration robust against API changes?

- Over-fetching / under-fetching:
  - Are we requesting only required data?

--------------------------------------------------

6. SECURITY & BEST PRACTICES

- XSS vulnerabilities:
  - Avoid unsafe usage like dangerouslySetInnerHTML

- Input validation:
  - Are user inputs validated before usage?

- Sensitive data:
  - No secrets exposed in frontend

- Proper sanitization of dynamic content

--------------------------------------------------

7. USER EXPERIENCE (FRONTEND EDGE)

- Loading indicators:
  - Is user informed when something is happening?

- Error messages:
  - Clear and helpful messages

- Accessibility:
  - Semantic HTML
  - ARIA attributes if needed

- Responsiveness:
  - Works across screen sizes

- Smooth interactions:
  - No flickers, no blocking UI

--------------------------------------------------

8. TESTING & RELIABILITY

- Are critical flows testable?
- Are there unit/integration tests?
- Are edge cases covered in tests?

--------------------------------------------------

9. FEEDBACK STYLE (VERY IMPORTANT)

- I don’t just point out issues — I explain WHY something should change
- I try to give better alternatives instead of just criticism
- I keep feedback constructive and collaborative

Example:
Instead of: "This is wrong"
I say: "We can optimize this by memoizing to avoid unnecessary re-renders"

--------------------------------------------------
10. OverKill
FINAL THOUGHT:

Code review is not just about finding bugs.
It’s about improving code quality, scalability, and team collaboration.
*/
