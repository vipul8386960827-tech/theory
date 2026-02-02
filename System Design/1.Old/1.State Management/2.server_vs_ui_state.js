/*  
===============================================================================
FRONTEND SYSTEM DESIGN — SERVER STATE vs UI STATE  
(CRISP, INTERVIEW-READY, ONLY WHAT THE INTERVIEWER WANTS TO HEAR)
===============================================================================

################################
# 1. WHAT IS UI STATE?
################################
UI State = **State that belongs to the frontend only**.

It is:
- Local to the user’s session  
- Controlled entirely by the browser  
- Not stored on the backend  
- Often short-lived  
- Changes frequently based on user interaction  

Examples:
- Modal open/close
- Dropdown selected value
- Search input value
- Current page tab
- Filters selected by user
- Form local state before submitting
- Theme (dark/light)
- Steps in multi-step form
- Toast visibility

What to say in interview:
- “UI state is user-interface-driven and local to the client.  
  It has no relation to backend data and is used only to control the view.”


################################
# 2. WHAT IS SERVER STATE?
################################
Server State = **Data that lives on the server and is fetched via an API**.

It is:
- Owned by the backend  
- Shared across multiple users  
- Can change without the client knowing  
- Needs caching, refetching, invalidation  
- Requires syncing between UI and backend  

Examples:
- Products list
- User profile from database
- Comments, posts, likes
- Orders / invoices
- Notifications
- Anything fetched using REST/GraphQL

What to say in interview:
- “Server state comes from APIs, can change on the server at any time, and needs 
  caching, refetching, and synchronization tools like React Query.”


###################################
# 3. KEY DIFFERENCES (SHORT & CLEAR)
###################################

| Feature                  | UI State (Client State)        | Server State                     |
|-------------------------|----------------------------------|----------------------------------|
| Lives Where?            | Browser / client                 | Backend / database               |
| Who owns it?            | Frontend                         | Server                           |
| Can it change externally? | No                               | Yes (other users, systems)       |
| Needs caching?          | No                               | Yes                              |
| Needs refetching?       | No                               | Yes                              |
| Best tool?              | Context, Zustand, Redux          | React Query / SWR                |


###################################
# 4. ONE LINE SUMMARY FOR INTERVIEW
###################################
“UI state is local to the client and controls how the interface behaves.  
Server state lives on the backend, comes from APIs, and must stay in sync with the server.”


###################################
# 5. WHAT THE INTERVIEWER WANTS TO HEAR
###################################
1. You know the difference in **ownership**:  
   - UI state = frontend owns  
   - Server state = backend owns  

2. You understand the **complexity** difference:  
   UI state is simple; server state needs caching, invalidation, SWR.

3. You know which tool fits what:  
   - UI state → Context, Zustand, Redux  
   - Server state → React Query  

4. You understand **sync + freshness problems** in server state  
   (stale data, refetching, background updates).

===============================================================================
END
===============================================================================
*/
