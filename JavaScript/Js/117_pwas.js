/*
117_pwas.js – Interview-Ready Answer

"Progressive Web Apps (PWAs) are web applications that use modern web capabilities 
to deliver an app-like experience to users. They are reliable, fast, and engaging."

Key Points:

1️⃣ Definition:
PWAs combine the best of web and mobile apps.
They use service workers, manifest files, and HTTPS to provide app-like experiences.
Key features: offline support, push notifications, installable on home screen, responsive design.

2️⃣ Syntax / Setup Example:

// Manifest file (manifest.json)
{
    "name": "My PWA",
    "short_name": "PWA",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}

// Registering service worker in JavaScript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.error('Service Worker registration failed', err));
    });
}

3️⃣ Real-Life Analogies:

Global Analogy: PWAs = web apps that behave like mobile apps without going to app store.
India-specific Analogy: A government web portal (like DigiLocker) that works offline and can be installed on your home screen.
Web Analogy: Twitter Lite, Instagram Lite are examples of PWAs.

4️⃣ Code Explanation:

Service workers cache resources, allowing offline access.
Manifest file allows the app to be installed with icon and splash screen.
PWAs are responsive and work across different devices.

5️⃣ Example / Usage:

// Users can open the website on mobile, add it to home screen, and use it offline.
// Push notifications can inform users of updates even when app is not open.

6️⃣ Follow-Up Interview Questions:

Q1: Difference between PWA and native app?  
A1: PWAs run in browsers, are installable, but not platform-dependent like native apps.

Q2: How does a PWA work offline?  
A2: Uses service workers to cache resources and serve them without network.

Q3: What is the role of manifest.json?  
A3: Provides metadata, icons, theme colors, start URL, and display options for installable app.

Q4: Can PWAs send push notifications?  
A4: Yes, using the Push API and service workers.

Q5: Are PWAs supported in all browsers?  
A5: Most modern browsers support core PWA features; some features may vary across browsers.
*/
