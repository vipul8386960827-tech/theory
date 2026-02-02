/* 169_get_image_dimensions.js

=====================================================
Getting Image Dimensions in JavaScript
=====================================================

Definition:
- You can get the width and height of an image using JavaScript.
- Useful for dynamic layouts or validation before display.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using HTMLImageElement
   - Example:
     const img = new Image();
     img.src = "https://example.com/image.jpg";
     img.onload = function() {
         console.log("Width:", img.width);
         console.log("Height:", img.height);
     };

2. Using `<img>` Element in DOM
   - Example:
     const imgElem = document.getElementById("myImage");
     console.log("Width:", imgElem.naturalWidth);
     console.log("Height:", imgElem.naturalHeight);

3. Handling Cross-Origin Images
   - If images are from another domain, ensure CORS headers are set
     or dimensions may not be accessible in some cases.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Getting image dimensions is like **measuring a picture before framing**:
  - You know its exact width and height before displaying it.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `width` and `naturalWidth`?
A1: `width` is the displayed width; `naturalWidth` is the original image width.

Q2: What happens if the image is not loaded yet?
A2: Width and height may be 0; use `onload` to ensure dimensions are available.

Q3: Can you get dimensions of CSS background images?
A3: Not directly; you may need to load it into an `Image` object.

Q4: Can JavaScript resize images?
A4: Yes, using `canvas` to draw and manipulate images.

Q5: Why is `new Image()` preferred for dynamic loading?
A5: It allows preloading and measuring images without attaching them to DOM.
*/
