/*
=====================================
Components of React Router v6
=====================================

Definition:
React Router v6 provides declarative components to manage routing 
in React applications. These components help define routes, handle 
navigation, and manage nested and dynamic routes.

-------------------------------------
Key Components:
-------------------------------------
1. **BrowserRouter / HashRouter / MemoryRouter**  
   - Top-level router components that wrap your app.  
   - BrowserRouter: Uses HTML5 history API (clean URLs).  
   - HashRouter: Uses URL hash for routing (#), good for static servers.  
   - MemoryRouter: Keeps history in memory, useful for testing or non-DOM environments.

2. **Routes**  
   - Container for all Route components.  
   - Replaces `Switch` from React Router v5.  
   - Matches the first Route that fits the current URL.

3. **Route**  
   - Defines a route path and the component to render.  
   - Supports nested routes and dynamic parameters.  
   - Example: `<Route path="/about" element={<About />} />`

4. **Link**  
   - Used to navigate between routes declaratively.  
   - Prevents full page reloads.  
   - Example: `<Link to="/about">About</Link>`

5. **NavLink**  
   - Similar to Link, but can apply an active class or style when the route matches.  
   - Example: `<NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>`

6. **useNavigate** (Hook)  
   - Returns a function to programmatically navigate to a route.  
   - Example: `const navigate = useNavigate(); navigate("/home");`

7. **useParams** (Hook)  
   - Returns route parameters for dynamic routes.  
   - Example: `const { id } = useParams();`

8. **useLocation** (Hook)  
   - Returns the current location object, useful for detecting route changes.  
   - Example: `const location = useLocation(); console.log(location.pathname);`

9. **useMatch** (Hook)  
   - Matches the current URL against a given path.  
   - Example: `const match = useMatch("/users/:id");`

10. **Outlet**  
   - Placeholder for nested route components.  
   - Example:
     ```js
     <Route path="/dashboard" element={<Dashboard />}>
       <Route path="stats" element={<Stats />} />
     </Route>
     ```
     - Dashboard renders `<Outlet />` to display Stats for `/dashboard/stats`.

-------------------------------------
Real-Life Analogy:
-------------------------------------
React Router components = traffic management system 🚦:  
- Routes = roads, Route = lane, Link = signboard, Outlet = intersection  
- useNavigate/useParams = GPS commands and road info.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: What replaced Switch in v6?
A1: Routes container replaced Switch, matches only the best Route.

Q2: Can we have nested routes?
A2: Yes, use Outlet in parent component and define child Routes inside it.

Q3: How to highlight active links?
A3: Use NavLink with isActive callback for dynamic class or style.

Q4: Can we navigate programmatically?
A4: Yes, use useNavigate hook.

Q5: Difference between useLocation and useMatch?
A5: useLocation gives full location object; useMatch checks if a path matches the current URL.
*/
