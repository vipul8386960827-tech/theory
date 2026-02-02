/* 188_bitwise_operators.js

=====================================================
Bitwise Operators in JavaScript
=====================================================

Definition (Interview-friendly):
- "Bitwise operators perform operations on the binary representations 
  of numbers, manipulating individual bits directly."

-----------------------------------------------------
Common Bitwise Operators:
-----------------------------------------------------

1. AND (&)
   - Example:
     let a = 5;  // 0101
     let b = 3;  // 0011
     console.log(a & b); // 1 (0001)

2. OR (|)
   - Example:
     console.log(a | b); // 7 (0111)

3. XOR (^)
   - Example:
     console.log(a ^ b); // 6 (0110)

4. NOT (~)
   - Example:
     console.log(~a); // -6 (inverts bits)

5. Left Shift (<<)
   - Shifts bits to the left
   - Example:
     console.log(a << 1); // 10 (1010)

6. Right Shift (>>)
   - Shifts bits to the right, preserves sign
   - Example:
     console.log(a >> 1); // 2 (0010)

7. Unsigned Right Shift (>>>)
   - Shifts bits to the right, fills left with 0
   - Example:
     console.log(a >>> 1); // 2

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Bitwise operators are like **flipping or moving switches in a control panel**:
  - Each switch represents a bit, and you can turn them on/off or shift their positions.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What types of values do bitwise operators work on?
A1: They work on 32-bit integers; non-integer numbers are converted to 32-bit integers.

Q2: Difference between >> and >>>?
A2: >> preserves sign (sign-propagating), >>> always fills with 0 (zero-fill).

Q3: Can bitwise operators be used with negative numbers?
A3: Yes, using two’s complement representation.

Q4: Use cases of bitwise operators?
A4: Flags, masks, performance optimization, encoding/decoding data.

Q5: Difference between & and &&?
A5: & is bitwise AND; && is logical AND.
*/
