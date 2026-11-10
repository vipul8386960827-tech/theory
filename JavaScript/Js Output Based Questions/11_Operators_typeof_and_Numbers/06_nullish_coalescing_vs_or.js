/*
==========================================================================================
QUESTION 6: ?? vs ||
Topic: Operators, typeof and Numbers   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(0 || "default");
console.log(0 ?? "default");
console.log("" || "fallback");
console.log(JSON.stringify("" ?? "fallback"));
console.log(null ?? "x");
console.log(undefined ?? null ?? "last");
console.log(false ?? true);
console.log(NaN ?? 1);
console.log(undefined || null);

const settings = { volume: 0 };
settings.volume ||= 50;
settings.brightness ??= 80;
console.log(JSON.stringify(settings));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
default
0
fallback
""
x
last
false
NaN
null
{"volume":50,"brightness":80}

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
a || b -> returns a if a is TRUTHY, otherwise b.
          Falls back for ANY falsy value: false, 0, -0, 0n, "", null, undefined, NaN.
a ?? b -> returns a unless a is null or undefined ("nullish"), otherwise b.

0 || "default"        -> 0 is falsy -> "default"
0 ?? "default"        -> 0 is not nullish -> 0
"" || "fallback"      -> "" is falsy -> "fallback"
"" ?? "fallback"      -> "" is not nullish -> "" (JSON.stringify shows the quotes)
null ?? "x"           -> "x"
undefined ?? null ?? "last" -> left to right: undefined ?? null = null; null ?? "last" = "last"
false ?? true         -> false is not nullish -> false
NaN ?? 1              -> NaN is not nullish -> NaN
undefined || null     -> undefined is falsy -> returns the second operand as-is -> null
                         (|| returns an operand, not a boolean)

settings.volume ||= 50   -> volume is 0 (falsy) -> assigned 50  (often a BUG!)
settings.brightness ??= 80 -> brightness is undefined -> assigned 80

KEY RULE: Use ?? when 0, "" and false are valid values; || treats all falsy values as "missing".
COMMON MISTAKE: Using || for defaults of numeric settings, so a legitimate 0 gets replaced.
FOLLOW-UP: What does null || undefined ?? "x" do?  SyntaxError -- ?? cannot be mixed with || or && without parentheses: (null || undefined) ?? "x" gives "x".
*/
