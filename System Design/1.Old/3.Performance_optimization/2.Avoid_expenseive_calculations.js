/*  
===============================================================================
FRONTEND SYSTEM DESIGN — AVOID EXPENSIVE COMPUTATIONS
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Expensive computations are operations that take significant time or resources 
  (CPU/memory) and can block rendering in the browser.
- Examples: complex calculations, large array manipulations, heavy loops, 
  or repeated API processing.

##########################################
# WHY TO AVOID THEM
##########################################
1. **Performance**
   - Slow computations can cause laggy UI and poor user experience.
2. **Re-render Optimization**
   - Expensive computations inside render functions can trigger **slow re-renders**.
3. **Memory Efficiency**
   - Recalculating heavy data repeatedly consumes unnecessary memory.

##########################################
# HOW TO AVOID / OPTIMIZE
##########################################
1. **useMemo**
   - Memoizes computed values and recomputes only when dependencies change.
   Example:
   const expensiveValue = useMemo(() => computeHeavy(data), [data]);

2. **useCallback**
   - Memoizes functions to avoid recreating them on every render.

3. **Lazy evaluation**
   - Compute values only when needed, not upfront.

4. **Web Workers**
   - Offload heavy computation to a separate thread to prevent blocking UI.

5. **Debouncing / Throttling**
   - Avoid triggering heavy computations on every keystroke or event.

6. **Avoid inline computations in JSX**
   - Move heavy logic outside render or into memoized functions.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “I avoid expensive computations inside render by memoizing values, using 
  useMemo/useCallback, debouncing events, and offloading heavy logic to 
  web workers when necessary.”

##########################################
# INTERVIEW TIPS
##########################################
- Explain **why unnecessary computations inside render slow down React**.
- Mention **memoization strategies** and **lazy evaluation**.
- Optional: Give example of **filtering a large list** or **complex calculation** being memoized.

===============================================================================
END
===============================================================================
*/
