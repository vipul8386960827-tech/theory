/* 70_google_analytics_for_react_router.js */
/*
=====================================
Google Analytics with React Router
=====================================

Definition:
When using React Router, page navigations happen client-side, so 
Google Analytics (GA) does not automatically detect route changes.  
To track page views correctly, you must manually send pageview events 
to GA on route changes.

-------------------------------------
Key Points:
-------------------------------------
- Use `useEffect` to listen for route changes.  
- For React Router v6, use `useLocation` hook to get the current path.  
- Send `gtag` or GA tracking event when location changes.  
- Works for both Universal Analytics (UA) and GA4.  
- Important for SPAs because GA relies on full-page reloads by default.  

-------------------------------------
Example 1: Basic GA4 Integration with React Router v6
-------------------------------------
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Send page_view event to GA4
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null; // This component does not render anything
}

// Usage: Place <GoogleAnalytics /> inside <BrowserRouter> in App.js

-------------------------------------
Example 2: Using Universal Analytics (UA)
-------------------------------------
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalyticsUA() {
  const location = useLocation();

  useEffect(() => {
    if (window.ga) {
      window.ga("set", "page", location.pathname);
      window.ga("send", "pageview");
    }
  }, [location]);

  return null;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Tracking pageviews in SPA is like manually marking the pages 📄 
a visitor flips through in a book, since the book doesn’t reload.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why does GA not automatically detect SPA route changes?
A1: Because SPAs update the URL without a full page reload, and GA listens to page loads by default.

Q2: Where should <GoogleAnalytics /> component be placed?
A2: Inside <BrowserRouter>, so it can access location updates.

Q3: Can you use React Router v5?
A3: Yes, use `withRouter` HOC to get location or use `useEffect` with `history.listen`.

Q4: Can this work with dynamic routes?
A4: Yes, it tracks pathname and can include query params if needed.

Q5: How do you track additional events besides pageview?
A5: Use `gtag('event', 'event_name', { ...params })` or `window.ga('send', 'event', ...)`.
*/
