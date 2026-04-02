/*
================================
CORE REQUIREMENTS (40-min System Design)
Large Data Table / Grid System
================================


========================
FUNCTIONAL REQUIREMENTS
========================

 1. Data Display
- System should display tabular data (rows + columns)

 2. Pagination / Data Fetching
- User should be able to view data page-by-page
- Server-side pagination is supported (backend returns chunks of data)

 3. Sorting & Filtering
- User can sort and filter data via table UI
- Sorting/filtering is handled via backend APIs

 4. Authentication Scoped Data
- User sees data based on authentication and permissions


=============================
NON-FUNCTIONAL REQUIREMENTS
=============================

 1. Large Scale Support
- System should handle ~1M+ rows of data

 2. Performance
- Initial load should be fast (<2–3 seconds)
- UI must remain responsive under heavy data

 3. Rendering Optimization
- Only visible rows should be rendered (virtualization/windowing)

 4. Efficient Data Loading
- Frontend should NOT load full dataset at once
- Data should be fetched in chunks (paginated)

 5. Basic Reliability
- API failures should be handled gracefully (loading/error states)

 6. Data Freshness (lightweight)
- Data is near real-time or batch updated (not strict real-time)
*/
