/*
Using innerHTML in React – Interview-Ready Answer

Definition:  
In React, we normally avoid directly manipulating the DOM for security and consistency reasons.  
However, sometimes we need to insert **raw HTML** into a component.  
For this, React provides a special prop called **dangerouslySetInnerHTML**, which works like setting `innerHTML` in plain JavaScript.  

------------------------------------------------
Key Points:
- React discourages using raw HTML because it can lead to **XSS attacks**.  
- Instead of `innerHTML`, React uses `dangerouslySetInnerHTML`.  
- You must pass an object with the property `__html` (double underscore).  
- Mostly used when:  
  - Rendering HTML from a CMS or API.  
  - Displaying pre-formatted content like blog posts, articles, or emails.  
- Should be avoided when possible; prefer React rendering over raw HTML.  

------------------------------------------------
Code Example:

import React from "react";

function BlogPost({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// Usage:
const htmlContent = "<h1>Hello World</h1><p>This is raw HTML content.</p>";
<BlogPost content={htmlContent} />;

------------------------------------------------
Real-Life Analogy:
- Normal React rendering = chef serves you food prepared hygienically 🍲.  
- dangerouslySetInnerHTML = customer brings outside food into the kitchen 🍔 → allowed, but risky!  

------------------------------------------------
Why "dangerously"?  
- The React team intentionally added "dangerously" as a warning to developers.  
- It reminds you that injecting HTML can allow malicious scripts (XSS).  

------------------------------------------------
Possible Follow-Up Questions:

Q1: Why does React use dangerouslySetInnerHTML instead of innerHTML?  
A1: To warn developers that this operation is unsafe and can lead to XSS vulnerabilities.  

Q2: How can we make dangerouslySetInnerHTML safe?  
A2: By sanitizing input HTML using libraries like **DOMPurify** before injecting it.  

Q3: When should you use dangerouslySetInnerHTML?  
A3: Only when rendering **trusted HTML**, such as CMS content, or when there’s no alternative.  

Q4: Can we bind event handlers via dangerouslySetInnerHTML?  
A4: No, React won’t bind events from injected HTML. You must attach them separately in React code.  

Q5: Is dangerouslySetInnerHTML supported in React Native?  
A5: No, React Native does not use HTML rendering at all, so it’s not applicable.  
*/
