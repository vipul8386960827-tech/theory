/* 
3. Set Width and Height in CSS:

Definition:
- The width and height properties define the **size of the content area** of an element.
- By default, they affect only the content box unless `box-sizing` is changed.

Syntax:
selector {
  width: value;
  height: value;
}

Units:
- **px** → pixels (fixed size)
- **%** → percentage of parent element
- **em/rem** → relative to font size
- **vh/vw** → relative to viewport height/width

Example:

<style>
  div {
    width: 200px;        // content width = 200px
    height: 100px;       // content height = 100px
    padding: 10px;       // adds 10px inside
    border: 5px solid black; // adds 5px border
    margin: 20px;        // 20px outside spacing
    box-sizing: content-box; // default, width/height = content only
  }

  div.box-border {
    box-sizing: border-box; // width/height includes padding + border
  }
</style>

<div>Content-box Example</div>
<div class="box-border">Border-box Example</div>

// Key Points:
// - `box-sizing: content-box` → width/height = content only (padding & border added outside).
// - `box-sizing: border-box` → width/height = includes content + padding + border.
// - Use relative units for responsive design.
*/
