/* 236_ensure_user_authenticated_with_context_api.js

=====================================
Ensure User Authentication with Context API in React
=====================================

Definition:
React's Context API allows sharing state (like authentication status) across components 
without passing props manually at every level. It is commonly used to ensure that users 
are authenticated before accessing certain parts of an application.

-------------------------------------
Key Points:
-------------------------------------
1. Create Context:
   - Define a context to hold authentication state and related functions.
const AuthContext = React.createContext(null);

2. Provide Context:
   - Wrap the app or specific components with AuthContext.Provider.
   - Pass user state and authentication methods as value.
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

3. Consume Context:
   - Access authentication status in any component using useContext.
function Dashboard() {
  const { user } = React.useContext(AuthContext);

  if (!user) return <p>Please login to continue</p>;

  return <h1>Welcome, {user.name}</h1>;
}

4. Benefits:
   - Avoids prop drilling.
   - Centralized authentication logic.
   - Works well for small to medium applications without extra libraries.

-------------------------------------
Analogy:
-------------------------------------
- Context API = company ID badge system.
- Users (components) can check the badge (auth state) anywhere in the building (app) 
  without asking the manager (parent component) repeatedly.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Context API replace Redux for authentication state?  
A1: For simple authentication, yes. For complex global state management, Redux is better.

Q2: How can you prevent unnecessary re-renders when using Context API?  
A2: Split context, memoize values, or use selectors to minimize re-rendered components.

Q3: Is Context API suitable for high-frequency state changes?  
A3: Not ideal; frequent changes can cause performance issues due to re-renders.

Q4: Can you use Context API with TypeScript?  
A4: Yes, by defining proper context types for state and methods.
*/
