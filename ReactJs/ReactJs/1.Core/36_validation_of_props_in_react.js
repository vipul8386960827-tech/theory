/*
Validation of Props in React – Interview-Ready Answer:

"In React, props validation ensures that components receive props of the correct type 
and structure. This helps catch bugs early, improves code maintainability, and provides 
clear documentation for the expected props."

Key Points:

1️⃣ Purpose:
- Ensure the correct data types are passed to components.
- Provide warnings during development if incorrect props are provided.
- Improve readability and maintainability of components.

2️⃣ How It Works:
- Use the `prop-types` library to define expected types.
- Common types: string, number, bool, array, object, func, element, node, etc.
- Can mark props as required using `.isRequired`.

3️⃣ Real-life Analogies:

- Global Analogy: Filling a form with proper data types – a number field should not accept text.
- India-specific Analogy: Passport application – name should be string, age should be number.
- Web Analogy: Ensuring a Button component receives a string for `label` and a function for `onClick`.

4️⃣ Coding Example:

import React from 'react';
import PropTypes from 'prop-types';

function Greeting({ name, age, isMember }) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Age: {age}</p>
            <p>Member: {isMember ? 'Yes' : 'No'}</p>
        </div>
    );
}

// Prop validation
Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isMember: PropTypes.bool
};

// Default props
Greeting.defaultProps = {
    age: 18,
    isMember: false
};

// Usage
<Greeting name="Kaizer" />
// Explanation:
// - name is required and must be string; warning will appear if missing or wrong type.
// - age and isMember have default values if not provided.
// - PropTypes helps during development but is ignored in production builds.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Is PropTypes required in React?  
A1: No, it is optional but highly recommended for type safety and documentation.

Q2: Can you validate complex objects or arrays?  
A2: Yes, using PropTypes.shape({...}) for objects or PropTypes.arrayOf(type) for arrays.

Q3: Can functional and class components use PropTypes?  
A3: Yes, PropTypes works with both.

Q4: Does PropTypes enforce types at runtime?  
A4: It only gives warnings in development mode; it does not throw errors or enforce types in production.

Q5: What is an alternative to PropTypes?  
A5: TypeScript provides static type checking and can replace PropTypes for type safety.
*/
