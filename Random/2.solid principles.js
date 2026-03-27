/*
  ============================================================
  SOLID FOR FUNCTIONS (THE ULTIMATE SIMPLE VERSION)
  ============================================================

  1. S - SINGLE RESPONSIBILITY (The "One Job" Rule)
     ---------------------------------------------------------
     • Definition: A function should do only one specific task.
     • Think of it like: A specialized tool.
     • Simple: If a function "makes coffee, washes dishes, and 
       calls your mom," it's doing too much.
     • Good: One function to "make coffee." Another to "wash dishes."
     • Result: If the dishwasher breaks, you can still make coffee.
*/

/*
  2. O - OPEN/CLOSED (The "Plug-in" Rule)
     ---------------------------------------------------------
     • Definition: You should be able to add new features by 
       passing in data, not by rewriting the function's code.
     • Think of it like: A game console.
     • Simple: You shouldn't have to open up the console's 
       internal circuit board just to play a new game.
     • How: Pass the "new logic" as a variable or a small function.
     • Result: You add new levels without rebuilding the machine.
*/

/*
  3. L - LISKOV SUBSTITUTION (The "Same Shape" Rule)
     ---------------------------------------------------------
     • Definition: Different functions that do the same type of 
       work must return the same type of result.
     • Think of it like: AA Batteries.
     • Simple: If you swap one "Price Calculator" for another, 
       the rest of your app shouldn't crash.
     • Bad: One returns a Number (10) and the other returns 
       Text ("$10"). This breaks your math.
     • Result: You can swap parts in and out safely.
*/

/*
  4. I - INTERFACE SEGREGATION (The "Need to Know" Rule)
     ---------------------------------------------------------
     • Definition: A function should only receive the exact 
       pieces of data it needs to work, nothing extra.
     • Think of it like: A name tag.
     • Simple: Don't give a function a 50-page employee file 
       if it only needs to know their first name.
     • Bad: Passing a whole "User" object when you only need 
       the "User.email" string.
     • Result: The function stays clean and easy to reuse.
*/

/*
  ============================================================
  5. D - DEPENDENCY INVERSION (The "Wall Socket" Rule)
  ============================================================

  • Definition: A function should not be "locked" to a specific 
    external tool (like a specific database or API). Instead, 
    the tool should be passed into the function as an argument.

  • Think of it like: A Wall Power Socket. 
    Your phone charger doesn't care if the electricity comes 
    from a wind farm or a coal plant. It just needs a socket 
    that fits. You don't "weld" your charger into the wall; 
    you plug it in.

  • Simple: 
    - Bad: A function that can ONLY save to "MySQL Database."
    - Good: A function that says "I will save data to whatever 
      storage tool you give me."

  • Why: 
    1. Flexibility: You can swap MySQL for MongoDB in one second.
    2. Testing: You can give the function a "Fake/Mock" database 
       during testing so you don't accidentally delete real data.
*/