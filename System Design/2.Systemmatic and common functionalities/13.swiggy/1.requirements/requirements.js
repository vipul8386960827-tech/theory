/**
 * FRONTEND DESIGN FOR FOOD DELIVERY APP (LIKE SWIGGY)
 *
 * Functional Requirements (Frontend Focus):
 *
 * 1. User Authentication & Profile
 *    - Login/Signup (email, phone, social login)
 *    - Profile page to edit details & addresses
 *
 * 2. Browse Restaurants & Dishes
 *    - List of restaurants with filters (cuisine, ratings, cost)
 *    - Restaurant detail page: menu items, images, ratings
 *    - Search functionality
 *
 * 3. Cart & Ordering
 *    - Add/remove items to cart, manage quantities
 *    - Checkout UI: show total, taxes, delivery charges
 *    - Payment integration (simulate UI flow)
 *
 * 4. Order Tracking
 *    - Display real-time order status (confirmed, preparing, out for delivery)
 *    - Map integration (can be mocked for frontend)
 *
 * 5. Reviews & Ratings
 *    - Show existing reviews
 *    - Submit reviews via form validation
 *
 * 6. Notifications
 *    - Push or in-app notifications for order updates
 *
 * 7. Responsive Design
 *    - Mobile & desktop friendly UI
 *
 *
 * Non-Functional Requirements (Frontend Focus):
 *
 * 1. Performance
 *    - Lazy loading images & menu items
 *    - Virtualized lists for long menus
 *    - Code splitting to minimize bundle size
 *
 * 2. Scalability
 *    - Component-based architecture (React/Vue/Angular)
 *    - Reusable components for menus, restaurant cards, modals
 *
 * 3. Maintainability
 *    - Clear folder structure: components/, pages/, services/, utils/
 *    - Consistent state management (Redux/Context/Pinia)
 *
 * 4. Usability
 *    - Smooth animations (add to cart)
 *    - Clear error messages & validation
 *    - Accessibility (ARIA, keyboard navigation)
 *
 * 5. Offline & Network Handling
 *    - Show placeholders or spinners while loading
 *    - Graceful error handling on network failure
 *
 * 6. Security
 *    - Avoid exposing API keys in frontend
 *    - Input validation in forms
 *
 * 7. SEO & Metadata (if web)
 *    - Metadata for restaurant pages
 *    - SSR/static rendering for performance
 *
 *
 * Things to Focus in 1-Hour Interview:
 *
 * - High-level architecture:
 *   SPA (React/Vue/Next.js)
 *   Component hierarchy: RestaurantList → RestaurantCard → MenuItem → Cart
 *   State management: global for cart, local for forms/UI
 *
 * - Critical Flows:
 *   Browse → Add to Cart → Checkout → Order Tracking
 *   Search & filter functionality
 *
 * - Performance & UX:
 *   Lazy load menus/images
 *   Skeleton loaders
 *   Responsive design
 *
 * - Optional Enhancements to mention:
 *   Real-time order tracking (WebSocket/SSE)
 *   Offline caching for menus or previous orders
 *
 *
 * Suggested Component Structure:
 *
 * App
 * ├── Header (Search, Profile)
 * ├── RestaurantList
 * │    └── RestaurantCard
 * │           └── MenuItem
 * ├── Cart
 * ├── Checkout
 * ├── OrderTracking
 * └── Footer
 *
 * Notes:
 * - Keep cart state globally
 * - Fetch restaurant/menu data via API service
 * - Focus on UX, performance, maintainability in explanation
 */