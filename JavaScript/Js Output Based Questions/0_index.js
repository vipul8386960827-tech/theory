/*
==========================================================================================
JAVASCRIPT OUTPUT BASED QUESTIONS - INDEX AND STUDY PLAN
==========================================================================================

227 questions, one per file, grouped into 19 topic folders. Core / browser JavaScript
only (no Node.js-specific APIs).

EVERY FILE HAS THE SAME FORMAT
  QUESTION     -> the code an interviewer shows you (real, runnable code)
  OUTPUT       -> the exact console output
  EXPLANATION  -> step-by-step walkthrough of what the engine does
  KEY RULE / COMMON MISTAKE / FOLLOW-UP

HOW TO PRACTICE
  1. Open a file, read ONLY the question code, and write your predicted output.
  2. Scroll down and compare with OUTPUT. Read the EXPLANATION even if you were right.
  3. Run it yourself:  node "07_Event_Loop/01_settimeout_vs_promise.js"
     (18_DOM_Events_and_Browser needs a browser: paste into DevTools with the given HTML.)

FOLDERS (study in this order)

 01_Hoisting_and_TDZ                    var/let/const/function/class hoisting, TDZ
 02_Scope_and_Closures                  scope chain, closures in loops, private state
 03_Functions                           arguments, defaults, length, IIFE, currying, bind
 04_this_Keyword                        all binding rules, lost this, arrow, classes
 05_Prototypes_and_Classes              prototype chain, instanceof, class quirks
 06_Object_Property_Tricks              freeze/seal, defineProperty, getters, Proxy
 07_Event_Loop                          sync vs microtask vs macrotask ordering
 08_Promises                            chaining, errors, finally, combinators, extra ticks
 09_Async_Await                         await ordering, loops, try/catch, return await
 10_Type_Coercion_and_Equality          ToPrimitive, == algorithm, + vs other operators
 11_Operators_typeof_and_Numbers        typeof, floats, parseInt, ++, ??, ?., strings
 12_Destructuring_Spread_Rest           defaults, nested, spread copies, template literals
 13_Objects_and_References              references, key coercion, copying, JSON.stringify
 14_Arrays                              map(parseInt), sort, holes, length, reduce
 15_Map_Set_WeakMap_Symbol_Date         Map/Set/WeakMap, Symbol, Date quirks
 16_Generators_and_Iterators            next/yield/return/throw, iterables, yield*
 17_Errors_TryCatch_Finally_and_Loops   finally overrides, async errors, switch, ASI
 18_DOM_Events_and_Browser              bubbling/capture order, target, rAF, microtasks
 19_Mixed_Tricky_Interview_Favorites    final boss: mixed-topic questions

HIGHEST RETURN ON TIME (asked in most interviews)
  07, 08, 09 (event loop / promises / async)  -> almost guaranteed
  04 (this)                                   -> very common
  01, 02 (hoisting, closures)                 -> very common
  10 (coercion)                               -> common in quick-fire rounds
  13, 14 (references, arrays)                 -> common

HOW TO SOLVE ANY OUTPUT QUESTION IN AN INTERVIEW
1. Say out loud what phase you are in: creation (hoisting) or execution.
2. For every function call ask: how was it called? (that decides `this`).
3. For async code, keep three columns on paper: Call stack | Microtasks | Macrotasks.
   Run all sync code, then empty ALL microtasks, then take ONE macrotask, repeat.
4. For operators, ask: is either side a string (+ concatenates)? otherwise convert to
   number. For ==, follow the algorithm (null/undefined only equal each other, objects ->
   primitive, booleans -> number first).
5. For objects ask: am I mutating the shared object or reassigning a variable?
6. State strict mode / browser assumptions if the answer depends on them.
*/
