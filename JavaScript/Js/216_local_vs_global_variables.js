/* 216_local_vs_global_variables.js

=====================================================
Local vs Global Variables in JavaScript
=====================================================

Definition (Interview-friendly):
- "Local variables are declared within a function/block and accessible 
  only there. Global variables are declared outside functions/blocks 
  and accessible throughout the script."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Global Variable
   - Example:
     var globalVar = "I am global";
     function showGlobal() {
         console.log(globalVar); // Accessible here
     }
     showGlobal();
     console.log(globalVar);     // Accessible here too

2. Local Variable
   - Example:
     function showLocal() {
         let localVar = "I am local";
         console.log(localVar); // Accessible inside function
     }
     showLocal();
     // console.log(localVar); // ❌ ReferenceError: not accessible outside

3. Block Scope (let/const)
   - Example:
     if(true) {
         let blockVar = "Block scope";
         const blockConst = 10;
         console.log(blockVar, blockConst); // Accessible here
     }
     // console.log(blockVar, blockConst); // ❌ Not accessible

4. var Scope
   - var is function-scoped, not block-scoped
   - Example:
     if(true) {
         var functionVar = "Function scope";
     }
     console.log(functionVar); // Accessible if inside same function or global

5. Use Case
   - Local variables prevent global namespace pollution
   - Global variables useful for configuration or shared state (use cautiously)

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Local variable: **inside a room**; only visible there.
- Global variable: **in a park**; everyone can see it.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between var, let, and const in scope?
A1: var is function-scoped; let and const are block-scoped; const cannot be reassigned.

Q2: Why avoid global variables?
A2: Risk of naming collisions and unintended side effects.

Q3: Can global variables be modified inside functions?
A3: Yes, unless declared as const.

Q4: Can local variables shadow global variables?
A4: Yes, same name in local scope overrides global.

Q5: Are function parameters local?
A5: Yes, parameters are local to the function.
*/
