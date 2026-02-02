/* 
9. flex Property (Shorthand)

The `flex` property is a shorthand for:
1. flex-grow
2. flex-shrink
3. flex-basis

Syntax:
flex: grow shrink basis;

Example:
flex: 1 0 200px;

Meaning:
- flex-grow: 1      // item can grow if space is available
- flex-shrink: 0    // item will NOT shrink
- flex-basis: 200px // initial size of the item

Common shortcuts:
- flex: 1
  // equal flexible width items (flex-grow: 1; flex-shrink: 1; flex-basis: 0)

- flex: 0 0 auto
  // item keeps its natural size and does not grow/shrink

- flex: 0 1 auto
  // default flex behavior (items shrink but don't grow)

Use Cases:
// - Make all items equal: flex: 1
// - Make one item take more space: flex: 2
// - Prevent item from shrinking: flex: 0 0 auto
// - Set a fixed base size: flex: 1 0 150px
*/
