/*  
===============================================================================
FRONTEND SYSTEM DESIGN — WHY SPLIT COMPONENTS
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Splitting components means breaking a large UI into **smaller, reusable, 
  independent components**.
- Each component handles a **specific piece of UI or functionality**.

##########################################
# REASONS TO SPLIT COMPONENTS
##########################################
1. **Reusability**
   - Smaller components can be reused across the app.
   - Example: Button, Card, Input components.

2. **Maintainability**
   - Easier to read, debug, and update small components.
   - Large components are harder to maintain.

3. **Separation of Concerns**
   - Smart components → handle state, API calls, business logic.
   - Dumb components → pure UI rendering.
   - Improves code organization.

4. **Testability**
   - Smaller components are easier to unit test.

5. **Performance Optimization**
   - Can memoize small components to avoid unnecessary re-renders.
   - Example: React.memo on a small child component.

6. **Scalability**
   - Helps teams work in parallel without conflicts.
   - Encourages modular architecture.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “I split components to improve reusability, maintainability, testability, 
  performance, and scalability. Smart-dumb separation also keeps business 
  logic and UI concerns distinct.”

##########################################
# PRACTICAL EXAMPLE
##########################################
- ProductListPage → Smart component fetches products.
- ProductCard → Dumb component displays product details.
- Button → Reusable component for all buttons.
- Toast → Global component for notifications.

===============================================================================
END
===============================================================================
*/
