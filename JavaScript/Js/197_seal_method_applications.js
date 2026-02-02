/* 197_seal_method_applications.js

=====================================================
Applications of Object.seal() in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.seal() is a JavaScript method that prevents adding or deleting 
  properties of an object, while still allowing the modification of existing 
  property values."

-----------------------------------------------------
Common Use Cases:
-----------------------------------------------------

1. Protecting Object Structure
   - Prevent accidental addition or deletion of properties.
   - Example:
     const config = { apiUrl: "https://api.com", timeout: 5000 };
     Object.seal(config);
     // config.version = "1.0"; // ❌ not allowed
     delete config.timeout;     // ❌ not allowed
     config.apiUrl = "https://newapi.com"; // ✅ allowed

2. Preventing Runtime Errors
   - Ensures that critical objects maintain their expected keys.

3. Using with Configuration Objects
   - Example:
     const settings = { theme: "dark", debug: true };
     Object.seal(settings);
     settings.debug = false; // ✅ allowed
     // settings.newFeature = true; // ❌ not allowed

4. Arrays Protection
   - Prevent adding/removing elements, allow modification of existing elements.
   - Example:
     const arr = [1,2,3];
     Object.seal(arr);
     arr[0] = 10; // ✅ allowed
     // arr.push(4); // ❌ not allowed

5. Combination with Object.freeze()
   - For nested objects, seal the outer object, freeze critical inner objects.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Sealing an object is like **locking the frame of a building**:
  - You can renovate inside (change values), but cannot add/remove walls (properties).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between seal and freeze in practical use?
A1: Seal locks structure but allows modification; freeze locks structure and values.

Q2: Can nested objects be sealed automatically?
A2: No, only first-level properties are affected; nested objects remain mutable.

Q3: How to verify if an object is sealed?
A3: Use `Object.isSealed(obj)`.

Q4: What happens in strict mode when adding a property to a sealed object?
A4: Throws a TypeError.

Q5: Why use Object.seal() instead of manually checking properties?
A5: Provides built-in enforcement, reduces errors, and improves maintainability.
*/
