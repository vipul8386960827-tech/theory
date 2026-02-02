/* 
2. Position Values in CSS:

Definition:
- The `position` property defines **how an element is positioned** in the document.
- Works with `top`, `right`, `bottom`, `left` properties to move elements.

Values:

1. **static**
  // Default value. Element follows **normal flow**. `top`, `right`, `bottom`, `left` have no effect.

2. **relative**
  // Element moves **relative to its normal position**. Space for it remains in the layout.
  // Example: position: relative; top: 10px; left: 20px;

3. **absolute**
  // Element is positioned **relative to its nearest positioned ancestor** (not static).
  // Removed from normal flow. Other elements behave as if it's not there.
  // Example: position: absolute; top: 0; right: 0;

4. **fixed**
  // Element is positioned **relative to the viewport**.
  // Stays in place on scroll. Removed from normal flow.
  // Example: position: fixed; bottom: 10px; right: 10px;

5. **sticky**
  // Element is **relative until a scroll threshold** is reached, then behaves as fixed.
  // Example: position: sticky; top: 0;

Key Points:
- `static` → normal flow.
- `relative` → shifts from original spot.
- `absolute` → positions relative to nearest positioned ancestor.
- `fixed` → stays visible during scroll.
- `sticky` → switches from relative to fixed based on scroll.
*/
