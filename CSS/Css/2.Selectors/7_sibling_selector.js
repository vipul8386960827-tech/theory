/* 
7. Sibling Selector in CSS:

Difference Between Adjacent (+) and General (~) Sibling Selector (Layman Terms):
- **Adjacent Sibling Selector (+)** → Styles only the **very next element** after a specified element.
  // Think: "the neighbor right next to me."
- **General Sibling Selector (~)** → Styles **all elements after** a specified element that share the same parent.
  // Think: "everyone down the line after me."

Definition:
- Sibling selectors target elements that share the **same parent**.
- There are two types of sibling selectors:

1. **Adjacent Sibling Selector (+)**
  // - Selects the element **immediately following** another element.
  // - Syntax: previous + next { property: value; }
  // - Example:
  h1 + p { color: blue; }
  //   - Styles the <p> that comes **right after** <h1>.

2. **General Sibling Selector (~)**
  // - Selects **all siblings** that come **after** a specified element.
  // - Syntax: previous ~ siblings { property: value; }
  // - Example:
  h1 ~ p { color: green; }
  //   - Styles all <p> elements that share the same parent and appear after <h1>.

Example HTML:
<h1>Heading</h1>
<p>Paragraph 1 → styled by + selector</p>
<p>Paragraph 2 → styled by ~ selector</p>
<p>Paragraph 3 → styled by ~ selector</p>

Key Points:
- Sibling selectors do **not** target elements with different parents.
- Adjacent selector (+) → immediate next sibling.
- General sibling selector (~) → all following siblings.
- Useful for styling elements based on their position relative to another element.
*/
