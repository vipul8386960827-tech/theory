/*
==========================================================================================
QUESTION 8: Methods on the prototype vs functions as instance fields
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

class Widget {
  id = 1;
  onClick = () => "clicked";

  render() {
    return "rendered";
  }
}

const w1 = new Widget();
const w2 = new Widget();

console.log(w1.render === w2.render);
console.log(w1.onClick === w2.onClick);
console.log(w1.hasOwnProperty("render"), w1.hasOwnProperty("onClick"));
console.log(JSON.stringify(Object.keys(w1)));
console.log(Object.getOwnPropertyNames(Widget.prototype).join(","));

Widget.prototype.render = function () {
  return "patched";
};
console.log(w1.render(), w2.render());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
false
false true
["id","onClick"]
constructor,render
patched patched

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Methods declared in the class body (render) are defined ONCE on Widget.prototype and
   shared by all instances -> w1.render === w2.render -> true.
2. Class FIELDS (id, onClick) are created per instance, when the constructor runs.
   Each instance gets a NEW arrow function -> false.
3. render is inherited (not own) -> false; onClick is an own property -> true.
4. Object.keys lists own enumerable properties, in creation order -> ["id","onClick"].
5. Widget.prototype holds `constructor` and `render` (class methods are
   non-enumerable, but getOwnPropertyNames lists them).
6. Changing Widget.prototype.render affects every instance immediately, because they
   all look it up through the same prototype -> "patched patched".

KEY RULE: Class methods live on the prototype (shared, memory-efficient); class fields - including arrow-function fields - are copied onto every instance.
COMMON MISTAKE: Thinking arrow fields are on the prototype, or that class methods appear in Object.keys(instance).
*/
