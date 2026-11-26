/* 21_json_stringify_loses_data.js

=====================================================
Scenario: JSON.stringify loses data in localStorage
=====================================================

The Question (how the interviewer asks it):
- "We save user state to localStorage with JSON.stringify. After reload, dates
  are strings, some undefined fields are gone, a Map became {}, and one
  object with a circular reference throws an error. What is happening and
  how do you fix it?"

What the interviewer is checking:
- Do I know what JSON can and cannot represent.
- Can I use the replacer / reviver arguments.
- Do I know structuredClone and its limits.
- Do I design a safe save/load layer instead of patching each bug.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain that JSON only supports strings, numbers, booleans, null,
   arrays and plain objects. Everything else is converted or lost.
2. Date -> its toJSON() gives an ISO string, so after JSON.parse it stays a
   string. undefined, functions and Symbols are removed from objects (and
   become null inside arrays). Map and Set become {}. NaN/Infinity become
   null. BigInt throws a TypeError.
3. A circular reference throws "Converting circular structure to JSON".
   The real fix is usually to not store that object at all: store only the
   plain data (ids, values), not DOM nodes or class instances.
4. For dates and Maps I use a replacer when saving and a reviver when
   loading, so types are restored in one central place.
5. For in-memory deep copies (not storage) I use structuredClone. It keeps
   Date, Map, Set and even circular references, but it cannot copy
   functions or DOM nodes.
6. I wrap localStorage in try/catch (quota errors, private mode, bad JSON)
   and add a version number so old saved data can be migrated.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const state = { created: new Date(), note: undefined, tags: new Set(["a"]) };

// BUGGY
localStorage.setItem("state", JSON.stringify(state));
const back = JSON.parse(localStorage.getItem("state"));
// back.created is a string, back.note is gone, back.tags is {}

// FIXED: replacer + reviver with type markers
function replacer(key, value) {
  const raw = this[key];                    // original value before toJSON
  if (raw instanceof Date) return { __type: "Date", v: raw.toISOString() };
  if (value instanceof Set) return { __type: "Set", v: [...value] };
  if (value instanceof Map) return { __type: "Map", v: [...value] };
  return value;
}
function reviver(key, value) {
  if (value?.__type === "Date") return new Date(value.v);
  if (value?.__type === "Set") return new Set(value.v);
  if (value?.__type === "Map") return new Map(value.v);
  return value;
}

function save(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data, replacer)); }
  catch (err) { console.error("save failed", err); }  // quota or circular
}
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key), reviver) ?? fallback; }
  catch { return fallback; }
}

// Deep copy in memory (keeps Date, Map, Set, circular refs)
const copy = structuredClone(state);

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "JSON only knows plain data, so Dates become strings, undefined and
  functions disappear, Map and Set become empty objects, and circular
  references throw. I fix it with a replacer when saving and a reviver when
  loading, inside one small storage helper with try/catch. For circular data
  I store only plain fields like ids. For deep copies in memory I use
  structuredClone, which supports Date, Map, Set and cycles."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using JSON.parse(JSON.stringify(obj)) as a "deep clone" and not knowing
  what it breaks.
- Checking value instanceof Date inside the replacer: value is already a
  string there because toJSON runs first. Use this[key] instead.
- Calling JSON.parse without try/catch; corrupted storage crashes the app.
- Saving huge objects or class instances and expecting methods to come back.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does structuredClone NOT support?
A1: Functions, DOM nodes, Symbols as values, and class prototypes (a class
    instance comes back as a plain object). Errors and getters are also
    handled in special ways. It throws a DataCloneError for unsupported types.

Q2: How do you serialize a BigInt?
A2: Convert it to a string in the replacer (value.toString()) or define
    BigInt.prototype.toJSON, then convert it back with BigInt(str) in the reviver.

Q3: localStorage is full or blocked. What happens?
A3: setItem throws a QuotaExceededError (and in some private modes access
    itself can throw). That is why I wrap it in try/catch and fall back to
    in-memory state, or use IndexedDB for larger data.
*/
