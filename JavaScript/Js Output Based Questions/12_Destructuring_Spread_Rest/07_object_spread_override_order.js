/*
==========================================================================================
QUESTION 7: Object spread -- who wins?
Topic: Destructuring, Spread and Rest   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const defaults = { theme: "light", size: "M", lang: "en" };
const userPrefs = { theme: "dark", size: undefined };

console.log(JSON.stringify({ ...defaults, ...userPrefs }));
console.log(JSON.stringify({ ...userPrefs, ...defaults }));
console.log(JSON.stringify({ theme: "blue", ...userPrefs }));
console.log(JSON.stringify({ ...userPrefs, theme: "blue" }));

const merged = { ...defaults, ...userPrefs };
console.log(merged.size, "size" in merged);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{"theme":"dark","lang":"en"}
{"theme":"light","size":"M","lang":"en"}
{"theme":"dark"}
{"theme":"blue"}
undefined true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
An object literal is built from LEFT TO RIGHT. When the same key appears again, the
later value OVERWRITES the earlier one (but the key keeps its ORIGINAL position).

{ ...defaults, ...userPrefs }
  theme: "light" -> overwritten by "dark"
  size:  "M"     -> overwritten by undefined   (undefined is a real value here!)
  lang:  "en"
  Result: { theme: "dark", size: undefined, lang: "en" }
  JSON.stringify omits properties whose value is undefined -> {"theme":"dark","lang":"en"}

{ ...userPrefs, ...defaults }
  defaults come last and win everything -> { theme: "light", size: "M", lang: "en" }

{ theme: "blue", ...userPrefs }
  "blue" is overwritten by "dark"; size is undefined -> {"theme":"dark"} in JSON

{ ...userPrefs, theme: "blue" }
  the explicit property comes last and wins -> {"theme":"blue"} (size undefined omitted)

merged.size -> undefined, but "size" in merged -> true: the property EXISTS with the
  value undefined. Spread copies undefined values; it does not skip them.

KEY RULE: In object spread, the last occurrence of a key wins. Put defaults first and overrides last. An explicit undefined still overrides a default.
COMMON MISTAKE: Thinking { ...defaults, ...userPrefs } keeps size "M" because the override is undefined.
FOLLOW-UP: How do you merge ignoring undefined?  Filter first, e.g. Object.fromEntries(Object.entries(userPrefs).filter(([, v]) => v !== undefined)).
*/
