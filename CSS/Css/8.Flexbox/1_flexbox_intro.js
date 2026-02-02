/* 
1. Flexbox Introduction

Definition:
- Flexbox (Flexible Box Layout) is a **CSS layout model** used to align and distribute space among items in a container,
  even when their size is unknown or dynamic.
- It simplifies **1-dimensional layouts** (row OR column).

Key Concepts:
1. Flex Container
   // The parent element with display: flex
2. Flex Items
   // Direct children of the flex container

Main Features:
- Align items horizontally or vertically easily
- Control spacing between items
- Allow items to grow or shrink to fill available space
- Build responsive layouts without floats or positioning hacks

How to Enable:
```css
.container {
  display: flex; /* activates flexbox */