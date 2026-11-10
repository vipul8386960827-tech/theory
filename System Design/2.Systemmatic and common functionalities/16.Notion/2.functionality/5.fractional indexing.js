/*
===============================================================================
NOTION — FRACTIONAL INDEXING (ORDERING BLOCKS WITHOUT CONFLICTS)
===============================================================================

PROBLEM WITH ARRAY INDEXES:
- Order stored as positions: [A(0), B(1), C(2)]
- User 1 inserts X at index 1, User 2 inserts Y at index 1 at the same time.
- Both send "insert at 1" → indexes shift → users see DIFFERENT orders.
- Moving one block also changes the index of every block after it.

SOLUTION: each block gets a SORTABLE STRING KEY.
- A = "V", C = "k"  → new block between them gets a key between → "c"
- Insert between "V" and "c" → "Z" ... there is ALWAYS room in between.
- Inserting/moving changes ONLY the moved block's key. Nothing else.
- Order = sort children by sortKey.

Used by: Figma, Linear, Notion-style editors.
In production use the `fractional-indexing` npm package.
*/

const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Returns a key strictly between a and b.
 * a = "" means "start of list", b = null means "end of list".
 * Keys produced never end in "0", so there is always space before any key.
 */
export function keyBetween(a = "", b = null) {
  let result = "";
  let i = 0;
  while (true) {
    const da = i < a.length ? DIGITS.indexOf(a[i]) : 0;
    const db = b !== null && i < b.length ? DIGITS.indexOf(b[i]) : DIGITS.length;

    if (da === db) {            // same prefix, keep going
      result += DIGITS[da];
      i++;
      continue;
    }
    const mid = Math.floor((da + db) / 2);
    if (mid > da) return result + DIGITS[mid];

    // digits are adjacent (e.g. "A" and "B"): keep a's digit,
    // anything after it is already smaller than b → drop the upper bound
    result += DIGITS[da];
    i++;
    b = null;
  }
}

// Examples:
// keyBetween()            → "V"   (first block)
// keyBetween("V")         → "k"   (append at end)
// keyBetween("", "V")     → "F"   (insert at start)
// keyBetween("A", "B")    → "AV"  (between neighbours)

/*
-------------------------------------------------------------------------------
EDGE CASE: TWO USERS PICK THE SAME KEY
-------------------------------------------------------------------------------
- Both insert between the same neighbours offline → both get "c".
- Fix: sort by (sortKey, blockId) → deterministic, same order for everyone.
  Or append a short client id to the key.

Interview line:
"I don't store positions, I store sortable keys. Inserting or moving touches
only one block, and concurrent inserts can't shift each other."
*/
