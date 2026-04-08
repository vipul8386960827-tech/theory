// ==========================================================
// SWIGGY WEB FRONTEND - FUNCTIONAL & NON-FUNCTIONAL LIST
// ==========================================================

/**
FUNCTIONAL REQUIREMENTS (The "What")
1. User Authentication (OTP Login, Session Persistence)
2. Address Selection (Current Location, Saved Addresses, Manual Search)
3. Search & Discovery (Restaurant/Dish Search, Category Filters)
4. Menu Interaction (Category Navigation, Add/Remove Items)
5. Cart Management (Price Calculation, Single-Restaurant Logic)
6. Checkout & Payment (Payment Gateways, Order Confirmation)
7. Live Order Tracking (Status Updates, Real-time Map Movement)
 */

/**

/**
NON-FUNCTIONAL REQUIREMENTS (The "Senior" Engineering Bar)
----------------------------------------------------------
/**
 * 1. Speed (Fast Loading)
 * [Solution: Only load the code we need for the current page. If I'm on 'Search', don't load 'Tracking' code.]
 * * 2. Visual Smoothness (No Jumping UI)
 * [Solution: Use 'Skeleton' boxes so the page doesn't jump around when the images finally show up.]
 * * 3. SEO (Getting found on Google)
 * [Solution: Make sure the Restaurant and Menu text is readable by Google, not hidden behind a loading spinner.]
 * * 4. Multi-Tab Sync (The "Two Tabs" Problem)
 * [Solution: If I add a Pizza in Tab A, the cart in Tab B should update automatically so I don't get confused.]
 * * 5. Security (Safe Login)
 * [Solution: Use secure cookies for the login token so hackers can't steal it from the browser console.]
 */
