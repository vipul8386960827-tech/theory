/* 176_proper_placement_for_error_boundaries.js

=================================================
Proper Placement for Error Boundaries in React
=================================================

📌 Definition:
Error Boundaries are special class components that catch errors in the render phase,
lifecycle methods, and constructors of their child components.
Placing them correctly ensures that one failing part of the UI doesn’t crash the whole app.

-------------------------------------
✅ Where to Place Error Boundaries
-------------------------------------
1. **Around risky components**
   - Example: third-party widgets, charts, video players, maps, or experimental features.

2. **At route or section level**
   - Wrap major UI areas (e.g., Header, Sidebar, Dashboard) so one crash doesn’t break all.

3. **Granular placement**
   - Multiple small boundaries provide better fault isolation than one big global boundary.

4. **At the top level (as a safety net)**
   - Wrap `<App />` or root entry to catch any errors missed at lower levels.

-------------------------------------
❌ What NOT to Do
-------------------------------------
- Don’t rely only on one top-level Error Boundary → gives poor UX if the whole app shows fallback.
- Don’t forget to wrap lazy-loaded components and dynamic imports.
- Don’t put Error Boundaries inside unstable components.

-------------------------------------
💡 Example:
-------------------------------------
function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>

      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
    </>
  );
}
// If Sidebar crashes → only Sidebar shows fallback, Header and MainContent keep working.

-------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid only one global Error Boundary?  
Q2: Where would you place an Error Boundary in a large app with multiple routes?  
Q3: Can functional components act as Error Boundaries? Why or why not?  
Q4: Do Error Boundaries catch async errors like in setTimeout or event handlers?  

*/
