/* 59_react_proptype_array_with_shape.js */
/*
=====================================
React PropTypes: Array with Shape
=====================================

Definition:
In React, PropTypes is a library for type-checking props passed to components.  
PropTypes.arrayOf and PropTypes.shape can be combined to enforce an array 
of objects with a specific structure (shape).

-------------------------------------
Key Points:
-------------------------------------
- PropTypes.arrayOf(type) → validates an array of items of a certain type.  
- PropTypes.shape({ ... }) → validates an object with a defined structure.  
- Combining them allows strict validation for arrays of objects with specific keys.  
- Helps catch bugs early and improves maintainability.

-------------------------------------
Example 1: Array of Objects with Shape
-------------------------------------
import PropTypes from "prop-types";

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} - {user.age} yrs</li>
      ))}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number
    })
  ).isRequired
};

// Example usage:
// <UserList users={[{ id: 1, name: "Alice", age: 25 }, { id: 2, name: "Bob" }]} />

-------------------------------------
Example 2: Optional and Required Fields
-------------------------------------
UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number,          // optional
      email: PropTypes.string          // optional
    })
  ).isRequired
};

-------------------------------------
Real-Life Analogy:
-------------------------------------
PropTypes.arrayOf(shape) is like a checklist 📋 for a team:
- Every team member must have id and name.
- Age and email are optional.  
React will warn if anyone in the team doesn’t follow the checklist.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: What happens if a required field is missing?
A1: React logs a warning in the console during development.

Q2: Can you nest shapes inside shapes?
A2: Yes, PropTypes.shape can be nested for deep object validation.

Q3: Difference between PropTypes.array and arrayOf?
A3: array validates that it is an array, arrayOf validates each item’s type.

Q4: Can PropTypes enforce values like enums?
A4: Yes, using PropTypes.oneOf([...]) inside shape.

Q5: Does PropTypes run in production?
A5: No, PropTypes warnings only appear in development mode.
*/
