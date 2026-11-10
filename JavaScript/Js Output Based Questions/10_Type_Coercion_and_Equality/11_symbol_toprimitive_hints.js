/*
==========================================================================================
QUESTION 11: Symbol.toPrimitive and conversion hints
Topic: Type Coercion and Equality   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const money = {
  [Symbol.toPrimitive](hint) {
    console.log("hint:", hint);
    if (hint === "number") return 100;
    if (hint === "string") return "$100";
    return "default";
  },
};

console.log(+money);
console.log(`${money}`);
console.log(money + "");
console.log(money * 2);
console.log(money == "default");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
hint: number
100
hint: string
$100
hint: default
default
hint: number
200
hint: default
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
If an object has a [Symbol.toPrimitive] method, ToPrimitive calls it (instead of
valueOf/toString) and passes the "hint" describing what the engine wants.

+money          -> unary plus = ToNumber -> hint "number" -> 100
`${money}`      -> template literal = ToString -> hint "string" -> "$100"
money + ""      -> binary + doesn't know if you want a number or string -> hint "default"
                   -> "default" + "" -> "default"
money * 2       -> * is purely numeric -> hint "number" -> 100 * 2 = 200
money == "default" -> == uses hint "default" -> "default" == "default" -> true

Each console.log of a result happens AFTER the conversion, so the "hint:" line always
prints first.

KEY RULE: Three hints exist: "number" (math, comparisons, unary +), "string" (String(), template literals, property keys), "default" (binary + and ==).
COMMON MISTAKE: Expecting money + "" to use the "string" hint. Binary + always uses "default".
FOLLOW-UP: Which built-in object treats the "default" hint like "string"?  Date: new Date() + 1 concatenates a date string, while new Date() - 0 gives a number.
*/
