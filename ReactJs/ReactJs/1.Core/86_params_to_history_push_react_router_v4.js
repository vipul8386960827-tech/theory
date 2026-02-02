/*
=====================================
Passing Params to history.push in React Router v4
=====================================

Definition:
In React Router v4, you can navigate programmatically using the 
history object. You can pass parameters (state) along with the 
navigation using the second argument of history.push or history.replace.

-------------------------------------
Key Points:
-------------------------------------
- Params can be part of the path (`/user/:id`) or passed via state.  
- Path params are accessible via `match.params`.  
- State params are accessible via `location.state`.  
- Useful for passing temporary data without encoding it in the URL.

-------------------------------------
Example 1: Passing Params via Path
-------------------------------------
import React from "react";
import { Route } from "react-router-dom";

class UserList extends React.Component {
  goToUser = (id) => {
    this.props.history.push(`/user/${id}`);
  };

  render() {
    return <button onClick={() => this.goToUser(42)}>Go to User 42</button>;
  }
}

class UserProfile extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return <h2>User ID: {id}</h2>;
  }
}

export default function App() {
  return (
    <>
      <Route path="/" exact component={UserList} />
      <Route path="/user/:id" component={UserProfile} />
    </>
  );
}

-------------------------------------
Example 2: Passing Params via State
-------------------------------------
import React from "react";
import { Route, withRouter } from "react-router-dom";

class ProductList extends React.Component {
  viewProduct = (product) => {
    this.props.history.push("/product-details", { product });
  };

  render() {
    return (
      <button onClick={() => this.viewProduct({ id: 101, name: "Laptop" })}>
        View Product
      </button>
    );
  }
}

class ProductDetails extends React.Component {
  render() {
    const { product } = this.props.location.state || {};
    return <div>Product: {product?.name || "Not Found"}</div>;
  }
}

export default withRouter(ProductList);

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Path params = permanent directions on a map 🗺️ (visible in URL).  
- State params = carrying a package in the car 🚗 (hidden from URL but passed along).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between path params and state params?
A1: Path params appear in the URL; state params do not.

Q2: Can state params persist on page reload?
A2: No, they are lost on refresh; path params persist in URL.

Q3: Can you pass multiple objects in state?
A3: Yes, any serializable object can be passed in location.state.

Q4: How to access state in functional components?
A4: Use `props.location.state` in v4, or `useLocation` hook in v5/v6.

Q5: Can you combine path params and state?
A5: Yes, URL params define route, and state can carry extra data.
*/
