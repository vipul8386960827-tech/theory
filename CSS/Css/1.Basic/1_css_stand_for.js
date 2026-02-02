/* 
1. CSS stands for **Cascading Style Sheets**. 

- **Cascading**: Styles can fall back from one rule to another based on specificity and order.  
- **Style**: Defines how HTML elements should look (color, font, layout, spacing, etc.).  
- **Sheets**: CSS rules are grouped in stylesheets, which can be external, internal, or inline.  

Key Points:
- Separates content (HTML) from presentation (CSS).  
- Allows consistent styling across multiple pages.  
- Enables responsive design and better maintainability.

2. CSS Specificity:

Specificity determines **which CSS rule is applied** when multiple rules target the same element.  
It is calculated based on **selectors**:

- Inline styles: `style="..."` → highest specificity (1000)  
- ID selectors: `#id` → 100  
- Class, attribute, pseudo-class selectors: `.class`, `[type="text"]`, `:hover` → 10  
- Element, pseudo-element selectors: `div`, `p`, `::before` → 1  
- Universal selector `*` → 0  

**Example:**

<style>
  p { color: blue; }           /* specificity: 1
  .text { color: green; }      /* specificity: 10 
  #para1 { color: red; }       /* specificity: 100 
  <p id="para1" class="text">Hello</p>  /* Will be red due to highest specificity 
</style>

Summary:
- Higher specificity overrides lower specificity.  
- Inline styles override IDs, classes, and elements.  
- Later rules in the stylesheet override earlier rules if specificity is equal.
*/
