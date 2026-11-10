/*
===============================================================================
NOTION — THE BLOCK DATA MODEL (THE MOST IMPORTANT PART)
===============================================================================

KEY IDEA: "Everything is a block. A page is just a block that has children."

Page (block, type: "page")
 ├── Heading block
 ├── Text block
 ├── Todo block
 │    └── Text block          ← nested (Tab key)
 ├── Image block
 └── Page block               ← a sub-page is ALSO a block
      └── ...
*/

// -----------------------------------------------------------------------------
// 1. THE BLOCK SHAPE
// -----------------------------------------------------------------------------
const exampleBlock = {
  id: "b_7f3a...",          // UUID generated on the CLIENT (no server round-trip)
  type: "todo",             // "text" | "heading_1" | "todo" | "image" | "page" | ...
  properties: {
    text: [                 // rich text = array of spans (see file 4)
      { text: "Buy ", marks: [] },
      { text: "milk", marks: ["bold"] },
    ],
    checked: false,         // type-specific property
  },
  parentId: "b_page1",
  sortKey: "aM",            // fractional index for ordering (see file 5)
  childIds: [],             // kept sorted by each child's sortKey
  version: 12,              // increases on every server-confirmed change
  createdBy: "u_1",
  lastEditedBy: "u_2",
  lastEditedAt: 1731300000000,
};

/*
-------------------------------------------------------------------------------
2. WHY THIS MODEL WORKS
-------------------------------------------------------------------------------
- CHANGE TYPE (text → heading): only `type` changes. Content is untouched.
  This is how the slash menu "Turn into" works.
- MOVE a block: change `parentId` + `sortKey`. Nothing is deep-copied.
- NEST a block (Tab): parentId becomes the previous sibling.
- SUB-PAGES: a page is a block, so the sidebar tree and page content
  use the SAME model.
- DATABASE ROWS: each row is also a page block with extra properties.

-------------------------------------------------------------------------------
3. WHY CLIENT-GENERATED IDS?
-------------------------------------------------------------------------------
- Pressing Enter creates a block instantly, even offline.
- No "temp id → real id" swapping (unlike a chat app's tempId).
- UUID v4 / v7 collisions are practically impossible.

-------------------------------------------------------------------------------
4. OPERATIONS (every change is one of these)
-------------------------------------------------------------------------------
{ type: "insert", block }                              // create
{ type: "update", id, path: ["properties","checked"], value: true }
{ type: "delete", id }                                 // soft delete (trash)
{ type: "move",   id, newParentId, newSortKey }

- A TRANSACTION = a list of ops applied together.
  Example: pressing Enter in the middle of a block =
    [ update(old block text), insert(new block with the rest of the text) ]

Interview line:
"I model the document as a tree of blocks, but I STORE it flat and normalized.
Every change is a small operation, which gives me undo, collaboration and
offline sync from the same building block."
*/
