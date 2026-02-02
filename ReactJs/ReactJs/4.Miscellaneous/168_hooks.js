/* 168_hooks.js

=================================================
React Hooks (List + Usage in Simple Language)
=================================================

Total Hooks: 19 (built-in as of React 18)

1. useState → to manage state in functional components.  
2. useEffect → to run side effects (API calls, subscriptions, DOM updates).  
3. useContext → to use values from React Context (global state).  
4. useReducer → to manage complex state logic (like Redux but local).  
5. useCallback → to memoize functions (avoid re-creating on re-renders).  
6. useMemo → to memoize values (avoid expensive recalculations).  
7. useRef → to access/manipulate DOM elements or persist values across renders.  
8. useImperativeHandle → to customize ref handling in child components.  
9. useLayoutEffect → like useEffect but runs synchronously after DOM updates.  
10. useDebugValue → for custom hooks debugging in React DevTools.  
11. useTransition → to mark state updates as non-blocking (for smoother UI).  
12. useDeferredValue → to defer rendering of a value (optimize performance).  
13. useId → to generate unique IDs for accessibility or list keys.  
14. useSyncExternalStore → to subscribe to external stores (for libraries).  
15. useInsertionEffect → to inject styles before DOM mutations (for CSS-in-JS).  
16. useOptimistic → to handle optimistic UI updates (React 18+ experimental).  
17. useFormStatus → to track status of forms (React 18.2+ experimental).  
18. useFormState → to manage state of forms (React 18.2+ experimental).  
19. useActionState → to manage async state updates (React 18.3+ experimental).

-------------------------------------
In short: Hooks let you "hook into" React features (state, lifecycle, context, refs, performance, concurrent rendering) without classes.
*/
