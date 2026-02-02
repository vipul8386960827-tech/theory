/* 58_accessing_props_within_attribute_quotes.js */
/*
=====================================
Accessing Props Within Attribute Quotes in React
=====================================

Definition:
In React JSX, you cannot directly put JavaScript expressions inside 
plain quotes. To use props or any dynamic values in attributes, 
you must wrap them in curly braces {}.

-------------------------------------
Key Points:
-------------------------------------
- Curly braces {} allow embedding any JavaScript expression inside JSX.  
- Without {}, values are treated as plain strings.  
- Common for attributes like className, src, alt, id, style, etc.  

-------------------------------------
Example 1: Correct Usage with Curly Braces
-------------------------------------
function UserProfile({ userId }) {
  return (
    <div id={`user-${userId}`}>Profile</div>
  );
}
// If userId = 42, renders: <div id="user-42">Profile</div>

-------------------------------------
Example 2: Using Props for src Attribute
-------------------------------------
function Avatar({ avatarUrl }) {
  return (
    <img src={avatarUrl} alt="User Avatar" />
  );
}
// avatarUrl is dynamically inserted into src attribute.

-------------------------------------
Example 3: Incorrect Usage Without Curly Braces
-------------------------------------
function Avatar({ avatarUrl }) {
  return (
    <img src="avatarUrl" alt="User Avatar" />
  );
}
// This renders src literally as "avatarUrl", not the prop value.

-------------------------------------
Real-Life Analogy:
-------------------------------------
Curly braces {} are like saying “insert the value of this variable” 📝  
without them, JSX just reads it as literal text.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you use expressions inside {}
A1: Yes, any valid JavaScript expression can go inside, e.g., template literals, function calls, calculations.

Q2: Can you mix strings and expressions?
A2: Yes, use template literals inside {}: id={`user-${userId}`}

Q3: Why can’t you just use quotes?
A3: Quotes are plain strings; JSX only evaluates JavaScript inside {}.

Q4: Can you use props in style attribute?
A4: Yes, e.g., <div style={{ color: props.color }}></div>

Q5: What happens if you forget {}?
A5: JSX treats it as a string, and you won't get dynamic behavior.
*/
