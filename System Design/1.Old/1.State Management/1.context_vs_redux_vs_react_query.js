/*  
===============================================================================
FRONTEND SYSTEM DESIGN — CONTEXT vs REDUX/ZUSTAND vs REACT QUERY  
(CRISP VERSION: ONLY WHAT INTERVIEWER WANTS TO HEAR)
===============================================================================

###############################
# CONTEXT — WHEN TO USE?
###############################
Use Context ONLY for **lightweight global UI state**.

Good to say in interview:
- “I use Context strictly for static or low-frequency UI state like theme, 
  language, authenticated user object, or global configuration.”
- “I avoid using Context for rapidly changing data because it causes 
  unnecessary re-renders and becomes hard to scale.”

Examples:
- Theme (dark/light)
- Auth user
- App-level settings
- Passing data deeply without prop drilling


###############################
# REDUX / ZUSTAND — WHEN TO USE?
###############################
Use Redux/Zustand for **client-side business logic** that is:
- frequently updated  
- used across many components  
- needs predictable state transitions  

Good to say in interview:
- “I use Redux or Zustand for client state such as cart management, filters, 
  modals, or multi-step form data because they provide predictable updates and 
  avoid unnecessary re-renders.”
- “Redux is great for large teams (DevTools, predictable flow).”
- “Zustand is perfect for simpler, fast, minimal-boilerplate global state.”

Examples:
- Cart
- Filters
- Modals
- UI selections
- Multi-step form data


#############################################
# REACT QUERY — WHEN TO USE?
#############################################
Use React Query for **server state** — data coming from APIs.

Good to say in interview:
- “I use React Query whenever I’m dealing with server state because it gives 
  caching, refetching, stale-while-revalidate, retries, and deduplication out 
  of the box.”
- “React Query removes most of the manual API/data-fetching boilerplate and 
  keeps server and UI perfectly in sync.”

Examples:
- Products list
- User profile
- Pagination / infinite scroll
- CRUD mutations with optimistic update


###########################################################
# THE ONE-LINE SUMMARY (SAY THIS IN THE INTERVIEW)
###########################################################
“Context for static UI state,  
Zustand/Redux for client-side business logic,  
React Query for server state and caching.”


###########################################################
# WHAT INTERVIEWER WANTS TO HEAR (MOST IMPORTANT PART)
###########################################################
1. You understand **state categories**: UI state vs client/business state vs server state.  
2. You pick tools based on **scalability**, not hype.  
3. You avoid using Context as a global store.  
4. You know React Query is the industry standard for server state.  
5. You keep architecture clean by dividing responsibilities.  

===============================================================================
END
===============================================================================
*/
