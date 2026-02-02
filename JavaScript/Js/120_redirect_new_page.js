/* 120_redirect_new_page.js */
/*
120_redirect_new_page.js – Interview-Ready Answer

"In JavaScript, redirecting to a new page can be done using the window 
location object or by manipulating the browser history. This allows 
navigating users to different URLs programmatically."

Key Points:

1️⃣ Definition:
- window.location.href or window.location.assign() can redirect to a new URL.
- window.location.replace() replaces current page in history (user cannot go back).
- Useful for navigation after form submission, login, or conditional routing.

2️⃣ Syntax Example:

// Redirect using href
window.location.href = 'https://www.example.com';

// Redirect using assign (adds to browser history)
window.location.assign('https://www.example.com');

// Redirect using replace (does not add to history)
window.location.replace('https://www.example.com');

3️⃣ Real-Life Analogies:

Global Analogy: Opening a new page in a book to a specific chapter.
India-specific Analogy: Redirecting a user from a government portal homepage to Aadhaar services.
Web Analogy: After login, redirect user to dashboard page automatically.

4️⃣ Code Explanation:

- window.location.href and assign() allow backward navigation (history preserved).
- replace() removes the current page from history (no back button).
- Can be used with relative or absolute URLs.

5️⃣ Example / Usage:

// Conditional redirect after form validation
if (formIsValid) {
    window.location.href = '/dashboard';
} else {
    window.location.replace('/error');
}

6️⃣ Follow-Up Interview Questions:

Q1: Difference between window.location.href and window.location.replace()?  
A1: href preserves history; replace removes current page from history.

Q2: Can you redirect without using JavaScript?  
A2: Yes, using HTML <meta http-equiv="refresh"> or server-side redirection.

Q3: Difference between assign() and replace()?  
A3: assign() adds the new page to history; replace() overwrites current page in history.

Q4: Can redirect be triggered after a delay?  
A4: Yes, use setTimeout(() => { window.location.href = 'url'; }, delayInMs);

Q5: Can you redirect to a different domain?  
A5: Yes, JavaScript allows absolute URLs to other domains.
*/
