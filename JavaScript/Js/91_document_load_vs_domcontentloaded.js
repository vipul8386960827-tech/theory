/* 91_document_load_vs_domcontentloaded.js */
/*
91_document_load_vs_domcontentloaded.js – Interview-Ready Answer

"In JavaScript, there are two main events related to page loading:
1. DOMContentLoaded – fired when the initial HTML document is completely 
   loaded and parsed, without waiting for stylesheets, images, or subframes.
2. load – fired when the entire page, including all dependent resources, is 
   fully loaded."

Key Points:

1️⃣ DOMContentLoaded:
- Triggered after HTML is parsed.
- Does NOT wait for images, stylesheets, or iframes.
- Useful for initializing scripts that manipulate DOM elements early.

2️⃣ load:
- Triggered after entire page, images, stylesheets, and iframes are loaded.
- Useful when you need to work with fully loaded resources like images.

3️⃣ Syntax Example:

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully parsed and ready');
});

// load
window.addEventListener('load', () => {
    console.log('All resources finished loading');
});

4️⃣ Real-Life Analogies:

Global Analogy:
- DOMContentLoaded = table is set, ready to start serving food.
- load = all dishes including drinks and desserts are ready.

India-specific Analogy:
- DOMContentLoaded = the classroom is ready for students to sit.
- load = all equipment, projectors, and materials are in place.

Web Analogy:
- DOMContentLoaded = DOM elements can be manipulated.
- load = images, CSS, and other resources are fully available.

5️⃣ Code Explanation:

- DOMContentLoaded allows scripts to run earlier without waiting for heavy resources.
- load ensures all resources are ready; use for image sliders or resource-dependent scripts.

6️⃣ Example / Usage:

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('clickMe');
    btn.addEventListener('click', () => alert('Button clicked'));
});

window.addEventListener('load', () => {
    console.log('Page fully loaded, safe to access images');
});

7️⃣ Follow-Up Interview Questions:

Q1: Which event fires first?  
A1: DOMContentLoaded fires before load.

Q2: Can DOMContentLoaded be used to manipulate images?  
A2: Yes, you can manipulate the <img> elements, but images may not be fully loaded yet.

Q3: Why use load event?  
A3: To ensure all resources including images and iframes are fully loaded before execution.

Q4: Can multiple DOMContentLoaded listeners be attached?  
A4: Yes, all will execute in the order they were attached.

Q5: What if scripts are at the bottom of body?  
A5: Placing scripts at end of body often makes DOMContentLoaded unnecessary for basic DOM access.
*/
