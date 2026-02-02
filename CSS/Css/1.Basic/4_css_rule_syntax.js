/* 
4. CSS Rule Syntax:

A **CSS rule** defines how HTML elements should be styled.  
It consists of a **selector** and a **declaration block**.

Syntax:

selector {
  property: value;
  property: value;
  ...
}

1. **Selector**:
   - Specifies which HTML element(s) the rule applies to.
   - Examples:
     - `p` → all <p> elements
     - `.className` → all elements with class="className"
     - `#idName` → element with id="idName"
     - `div p` → <p> inside a <div>

2. **Declaration Block**:
   - Enclosed in `{ }`.
   - Contains one or more **declarations** separated by semicolons.

3. **Declaration**:
   - Each declaration has a **property** and a **value**, separated by a colon.
   - Example: `color: red;`, `font-size: 16px;`

Example:

<style>
  /* CSS Rule
  p {
    color: blue;         /* property: value 
    font-size: 18px;     /* property: value 
    line-height: 1.5;    /* property: value 
  }

  /* Class Selector 
  .highlight {
    background-color: yellow;
    font-weight: bold;
  }

  /* ID Selector 
  #main-title {
    text-align: center;
    text-transform: uppercase;
  }
</style>

Summary:
- CSS rule = **Selector + Declaration Block**  
- Declaration Block = **property: value; pairs**  
- Proper syntax ensures styles are applied correctly and avoids errors.
*/
