/*
=====================================
Finding React Version Number at Runtime
=====================================

Definition:
You can determine the version of React being used in your project 
at runtime using the React object’s built-in property.

-------------------------------------
Key Points:
-------------------------------------
- React.version contains the version string.  
- Useful for debugging, logging, or conditional code based on React version.  
- Works in both development and production builds.  

-------------------------------------
Example 1: Logging React Version
-------------------------------------
import React from "react";

function ShowReactVersion() {
  console.log("React Version:", React.version);
  return <div>React Version: {React.version}</div>;
}

// Example output: "React Version: 18.2.0"

-------------------------------------
Example 2: Conditional Behavior Based on Version
-------------------------------------
import React from "react";

function FeatureCheck() {
  const majorVersion = parseInt(React.version.split(".")[0], 10);

  if (majorVersion >= 18) {
    return <div>Using React 18+ features</div>;
  } else {
    return <div>Legacy React version</div>;
  }
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Checking React.version is like checking the software version of 
your phone 📱 before using a new feature — ensures compatibility.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you get ReactDOM version similarly?
A1: Yes, ReactDOM.version contains the ReactDOM version.

Q2: Why might checking version at runtime be useful?
A2: To conditionally enable features or avoid using APIs not available in older versions.

Q3: Does React.version change between environments?
A3: No, it reflects the actual React package installed, same in dev and prod.

Q4: Can you use React.version for production logic?
A4: Generally not recommended; better to control versions via package.json.

Q5: How to check React version without running code?
A5: Check package.json or run `npm list react` or `yarn list react`.
*/
