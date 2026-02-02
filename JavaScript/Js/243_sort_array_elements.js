/* 243_sort_array_elements.js

=====================================================
Sorting Array Elements in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Sorting in JavaScript rearranges the elements of an array in a defined order 
  (ascending or descending). The `sort()` method is commonly used for this purpose."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Organize data for display, searching, or processing.  
   - Works with numbers, strings, or objects.

2. **Syntax**  
   - `array.sort([compareFunction])`  
   - Optional `compareFunction` defines custom sorting logic.

3. **Default Behavior**  
   - Without `compareFunction`, elements are converted to strings and sorted lexicographically.

-----------------------------------------------------
Examples:

// Example 1: Sorting numbers without compare function
const nums = [40, 100, 1, 5, 25, 10];
nums.sort();
console.log(nums); // [1, 10, 100, 25, 40, 5] (lexicographic)

// Example 2: Sorting numbers with compare function
nums.sort((a, b) => a - b); // ascending
console.log(nums); // [1, 5, 10, 25, 40, 100]

nums.sort((a, b) => b - a); // descending
console.log(nums); // [100, 40, 25, 10, 5, 1]

// Example 3: Sorting strings
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'cherry']

// Example 4: Sorting objects by property
const people = [{name: "Alice", age: 25}, {name: "Bob", age: 20}];
people.sort((a, b) => a.age - b.age);
console.log(people); // [{name: "Bob", age: 20}, {name: "Alice", age: 25}]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `sort()` reorders array elements in place.  
- Providing a `compareFunction` allows numeric or custom sorting.  
- Without it, elements are treated as strings (lexicographic).

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like arranging books on a shelf alphabetically or by publication year.

-----------------------------------------------------
Example / Usage:

const scores = [50, 10, 100, 5];
scores.sort((a, b) => a - b); // ascending
console.log(scores); // [5, 10, 50, 100]

const names = ['John', 'Alice', 'Bob'];
names.sort(); // lexicographic
console.log(names); // ['Alice', 'Bob', 'John']

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you call sort() on numbers without a compare function?  
A1: They are sorted lexicographically, not numerically.

Q2: How to sort objects by multiple properties?  
A2: Provide a compare function considering multiple keys.

Q3: Is `sort()` stable?  
A3: Yes, modern JavaScript engines implement stable sorting.

Q4: Can you sort arrays of mixed types?  
A4: Yes, but comparison may not be meaningful; best to normalize types first.

Q5: How to reverse an array after sorting?  
A5: Use `array.reverse()` or provide a descending compare function.
*/
