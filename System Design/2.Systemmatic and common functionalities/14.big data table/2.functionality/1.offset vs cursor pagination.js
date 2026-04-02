/*
=========================================
OFFSET vs CURSOR PAGINATION (LAYMAN TERMS)
=========================================

-------------------------------
OFFSET PAGINATION (PAGE-BASED)
-------------------------------

👉 What it means:
"Skip some items and then give me the next set"

👉 Example:
- Skip first 1000 items
- Give next 50 items

👉 Problem:
- System still has to go through those 1000 items first
- As page number increases → work increases → slower

👉 Issue with data:
- If new items are added or removed
- Data can shift → duplicates or missing items


-------------------------------
CURSOR PAGINATION (POINTER-BASED)
-------------------------------

👉 What it means:
"Start from this specific item and give me next set"

👉 Example:
- Start after item with id = 1000
- Give next 50 items

👉 Benefit:
- System directly jumps to that point
- No need to scan old data
- Performance stays fast


-------------------------------
WHY WE CHOOSE CURSOR OVER OFFSET
-------------------------------

✔ Faster for large data (no skipping)
✔ Consistent results (no shifting issues)
✔ Works well for infinite scroll / load more UI

❌ Tradeoff:
- Cannot jump to page 10 directly


-------------------------------
INTERVIEW ONE-LINER
-------------------------------

"I choose cursor pagination because it avoids scanning skipped data,
gives consistent results, and performs better at scale."
*/
