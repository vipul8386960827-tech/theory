/*
==========================================================================================
QUESTION 12: Parent constructor calling an overridden method (field init order)
Topic: Prototypes and Classes   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

class Parent {
  name = "parent";

  constructor() {
    console.log("Parent constructor sees:", this.name);
    this.describe();
  }

  describe() {
    console.log("Parent describe");
  }
}

class Child extends Parent {
  name = "child";

  constructor() {
    super();
    console.log("Child constructor sees:", this.name);
  }

  describe() {
    console.log("Child describe, name =", this.name);
  }
}

new Child();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Parent constructor sees: parent
Child describe, name = parent
Child constructor sees: child

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Order of operations for `new Child()`:
  1. Child's constructor starts. `this` is not available yet.
  2. super() -> runs Parent's construction:
       a. The object is created with prototype Child.prototype (it IS a Child from
          the very start).
       b. Parent's fields are initialized: this.name = "parent".
       c. Parent's constructor body runs:
            - logs "Parent constructor sees: parent"
            - this.describe() -> method lookup starts at Child.prototype, so the
              OVERRIDDEN Child describe runs. But Child's fields are not initialized
              yet, so this.name is still "parent" -> "Child describe, name = parent".
  3. super() returns -> NOW Child's fields are initialized: this.name = "child".
  4. The rest of Child's constructor runs -> "Child constructor sees: child".

KEY RULE: Base-class fields and constructor run first; derived-class fields are initialized only right after super() returns. Overridden methods are still dispatched to the subclass during the parent constructor.
COMMON MISTAKE: Expecting "Parent describe" (forgetting dynamic dispatch) or "name = child" in the describe call (forgetting child fields aren't set yet).
*/
