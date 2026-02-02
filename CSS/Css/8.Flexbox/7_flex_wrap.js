/* 
7. Flex Wrap in Flexbox

Definition:
- The `flex-wrap` property controls whether flex items **stay on a single line or wrap onto multiple lines** when the container is too small.
- By default, flex items do not wrap (`nowrap`).

Values:
- nowrap (default)       // all items in a single line
- wrap                   // items wrap onto multiple lines
- wrap-reverse           // items wrap onto multiple lines in reverse order

// Example: flex wrapping
<style>
  .container-nowrap {
    display: flex;
    flex-wrap: nowrap;          // items stay in a single line
    gap: 10px;
    background: #eee;
    padding: 10px;
  }

  .container-wrap {
    display: flex;
    flex-wrap: wrap;            // items wrap to next line
    gap: 10px;
    background: #ddd;
    padding: 10px;
    width: 200px;               // limit width to see wrapping
  }

  .item {
    width: 80px;
    height: 50px;
    background: lightcoral;
  }
</style>

<div class="container-nowrap">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

<div class="container-wrap">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

// Key Points:
// - flex-wrap controls multi-line behavior of flex items
// - wrap → items move to next line when container is too small
// - wrap-reverse → items wrap in reverse order
*/
