/*
95_attribute_vs_property.js – Interview-Ready Answer

"In JavaScript and HTML, attributes and properties are related but different. 
Attributes are defined in HTML markup; properties are values in the DOM objects."

Key Points:

1️⃣ Attribute:
- Defined in HTML and remain as strings.
- Read using getAttribute(), set using setAttribute().
- Example: <input type="text" value="Hello">

2️⃣ Property:
- Exists in DOM object after parsing HTML.
- Can be boolean, string, number, or object.
- Accessed directly via element.propertyName.
- Example: inputElement.value returns "Hello", can be updated programmatically.

3️⃣ Differences:

| Aspect           | Attribute                   | Property                    |
|-----------------|----------------------------|-----------------------------|
| Definition       | HTML markup value          | DOM object value            |
| Type             | String                     | Depends on element type     |
| Updates          | Changing attribute may not reflect in property | Changing property reflects in UI immediately |
| Access           | getAttribute()/setAttribute() | element.propertyName        |

4️⃣ Real-Life Analogies:

Global Analogy:
- Attribute = original label on a product (HTML).
- Property = current status/value after usage (DOM object).

India-specific Analogy:
- Attribute = printed fare on metro card.
- Property = actual balance after travel deduction.

Web Analogy:
- Attribute = <input value="Hello"> in HTML.
- Property = input.value in JS reflects current input typed by user.

5️⃣ Code Explanation:

const input = document.querySelector('input[type="text"]');

// Attribute
console.log(input.getAttribute('value')); // returns initial value from HTML

// Property
console.log(input.value); // returns current value typed by user

input.value = 'New Value';         // updates property and UI
input.setAttribute('value', 'X');  // updates attribute, property may differ

6️⃣ Example / Usage:

<input type="text" value="Hello" id="myInput">

<script>
const input = document.getElementById('myInput');
console.log(input.getAttribute('value')); // "Hello"
console.log(input.value);                 // "Hello"

input.value = 'World';
console.log(input.getAttribute('value')); // still "Hello"
console.log(input.value);                 // "World"

input.setAttribute('value', 'Hi');
console.log(input.getAttribute('value')); // "Hi"
console.log(input.value);                 // "World"
</script>

7️⃣ Follow-Up Interview Questions:

Q1: Are attributes always strings?  
A1: Yes, attributes in HTML are always string values.

Q2: Can properties be different types?  
A2: Yes, properties can be string, boolean, number, or object.

Q3: If you change a property, does the attribute change?  
A3: Not automatically; attribute stays as defined in HTML unless setAttribute() is used.

Q4: Which one reflects user input in real-time?  
A4: Property reflects real-time user changes.

Q5: Examples of boolean attributes vs properties?  
A5: Attribute: <input disabled>, Property: input.disabled = true/false
*/
