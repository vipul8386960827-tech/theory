/*
=====================================
Getting Query Parameters in React Router
=====================================

Definition:
Query parameters are key-value pairs in the URL after `?`.  
In React Router, you can access them to read filter criteria, search terms, or dynamic data.

-------------------------------------
Key Points:
-------------------------------------
- React Router does not parse query parameters automatically.  
- Use `useLocation` hook to get the current URL.  
- Use `URLSearchParams` to parse query strings.  
- Works with React Router v5 and v6.  

-------------------------------------
Example 1: Functional Component (React Router v5/v6)
-------------------------------------
import React from "react";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q"); // ?q=react

  return <h2>Search Term: {searchTerm}</h2>;
}

-------------------------------------
Example 2: Class Component (React Router v5)
-------------------------------------
import React from "react";

class SearchPage extends React.Component {
  render() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const searchTerm = queryParams.get("q"); // ?q=react

    return <h2>Search Term: {searchTerm}</h2>;
  }
}

// Make sure to wrap with withRouter for access to location
import { withRouter } from "react-router-dom";
export default withRouter(SearchPage);

-------------------------------------
Real-Life Analogy:
-------------------------------------
Query parameters are like options on a search form 🔍:  
- URL = form submission  
- React Router + URLSearchParams = reading the filled options.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: How to get all query parameters at once?
A1: Use `Object.fromEntries(new URLSearchParams(location.search))`.

Q2: How to update query parameters programmatically?
A2: Use `useNavigate` (v6) or `history.push`/`replace` with updated query string.

Q3: Can query parameters affect rendering?
A3: Yes, you can use them in state or conditional rendering.

Q4: Difference between params and query?
A4: Params are part of route path `/user/:id`; query parameters are after `?`.

Q5: How to handle arrays or multiple values in query string?
A5: Use `URLSearchParams.getAll("key")` to retrieve all values.
*/
