/*
==========================================================================================
QUESTION 5: What survives a JSON deep copy?
Topic: Objects and References   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const data = {
  date: new Date(0),
  nan: NaN,
  inf: Infinity,
  regex: /ab+c/g,
  map: new Map([["k", 1]]),
  set: new Set([1, 2]),
  nested: { value: undefined },
};

const json = JSON.stringify(data);
console.log(json);

const copy = JSON.parse(json);
console.log(typeof copy.date);
console.log(copy.nan);

const circular = { name: "loop" };
circular.self = circular;
try {
  JSON.stringify(circular);
} catch (e) {
  console.log(e.name);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{"date":"1970-01-01T00:00:00.000Z","nan":null,"inf":null,"regex":{},"map":{},"set":{},"nested":{}}
string
null
TypeError

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JSON only has: objects, arrays, strings, numbers (finite), booleans and null.
JSON.stringify converts everything else as follows:

date: new Date(0)
  Date has a toJSON() method that returns toISOString() -> "1970-01-01T00:00:00.000Z"
  After JSON.parse it is just a STRING -> typeof copy.date is "string".

nan: NaN, inf: Infinity
  Non-finite numbers aren't valid JSON -> serialised as null -> copy.nan is null.

regex, map, set
  They are objects with NO own enumerable properties (their data is internal)
  -> each becomes {}. The data in the Map and Set is silently LOST.

nested: { value: undefined }
  Properties with undefined values are omitted -> {}

circular reference
  JSON.stringify cannot represent a cycle -> TypeError: Converting circular structure
  to JSON (message text differs between engines).

KEY RULE: JSON.parse(JSON.stringify(x)) is a lossy deep copy: Dates become strings, NaN/Infinity become null, Map/Set/RegExp become {}, undefined is dropped, cycles throw.
COMMON MISTAKE: Using the JSON trick to "deep clone" state with Dates or Maps and later calling copy.date.getTime() (TypeError: not a function).
FOLLOW-UP: How do you restore Dates?  Use the reviver: JSON.parse(json, (k, v) => k === "date" ? new Date(v) : v), or use structuredClone which keeps Dates, Maps and Sets.
*/
