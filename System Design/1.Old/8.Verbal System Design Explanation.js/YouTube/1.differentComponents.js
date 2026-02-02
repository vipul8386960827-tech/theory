/* 
---------------------------------------------------------
YOUTUBE HOMEPAGE: COMPONENT STRUCTURE / MODULAR DESIGN
---------------------------------------------------------

1) Purpose:
"The homepage should be modular, maintainable, and scalable,
with each UI section encapsulated as a separate component."

2) Component breakdown:

- Navbar/Header:
  - Contains search bar, profile avatar, notifications.
  - Handles global actions like search queries, user menu, and alerts.

- Sidebar:
  - Displays subscriptions, categories, trending topics.
  - Allows navigation between different sections or channels.

- Video Feed / Video Cards:
  - VideoFeed component renders a list of VideoCard components.
  - VideoCard includes thumbnail, title, channel name, views, duration.
  - Clicking a VideoCard navigates to the video page.

- Recommendations Section:
  - Shows personalized or suggested videos.
  - Can reuse VideoCard components for consistency.
  - Can fetch data based on user watch history or trending algorithms.

- Footer:
  - Displays links, policies, and additional info.
  - Static component reused across pages.

3) Key points to highlight:
- Components are **modular**: each has its own UI + logic.
- Reusability: VideoCard is reused in multiple sections (feed, recommendations).
- Separation of concerns: Navbar handles global actions, Sidebar handles navigation, 
  VideoFeed handles main content.
- Scalability: New sections (e.g., trending, shorts) can be added without breaking 
  existing components.

4) How to explain in interview concisely:
- "The homepage is divided into modular components: Navbar, Sidebar, VideoFeed with VideoCards, 
   Recommendations, and Footer.
- Each component handles its own UI and logic.
- VideoCard is reusable across feed and recommendations.
- This structure ensures maintainability, scalability, and easy addition of new features."

---------------------------------------------------------
END OF YOUTUBE HOMEPAGE COMPONENT EXPLANATION
---------------------------------------------------------
*/
