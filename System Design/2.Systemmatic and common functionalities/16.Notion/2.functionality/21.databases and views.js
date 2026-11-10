/*
===============================================================================
NOTION — DATABASES (TABLE / BOARD / CALENDAR VIEWS)  [lighter scope]
===============================================================================

KEY IDEA:
- A database is a block. Each ROW is a PAGE block with typed properties.
- A VIEW is just a saved query: which properties to show + filter + sort
  + group. Table, Board, Calendar = different renderers of the SAME rows.
*/

const database = {
  id: "db_1",
  type: "database",
  schema: {                         // column definitions
    title:    { type: "title" },
    status:   { type: "select", options: ["Todo", "Doing", "Done"] },
    due:      { type: "date" },
    assignee: { type: "person" },
  },
  views: [
    { id: "v1", type: "table",    filter: null, sort: [{ prop: "due", dir: "asc" }] },
    { id: "v2", type: "board",    groupBy: "status" },
    { id: "v3", type: "calendar", dateProp: "due" },
  ],
};

const row = {
  id: "row_9",
  type: "page",                     // a row opens as a full page
  parentId: "db_1",
  properties: { title: "Ship v2", status: "Doing", due: "2026-11-20", assignee: "u_2" },
};

/*
-------------------------------------------------------------------------------
FRONTEND DESIGN POINTS
-------------------------------------------------------------------------------
1. WHERE TO FILTER / SORT
   - Small DB (< ~1k rows): load all, filter & sort on the client
     (in a Web Worker if it's slow) → instant feedback.
   - Large DB: server-side query with cursor pagination
     GET /databases/:id/query { filter, sort, cursor, limit: 100 }

2. TABLE VIEW = the Big Data Table design
   - Virtualize rows AND columns, sticky header, column resize.
   - Inline cell editing → an "update" op on the row block (same pipeline:
     optimistic → outbox → server).

3. BOARD VIEW (Kanban)
   - Columns = groupBy values. Dragging a card between columns =
     update(row.status) + new sortKey within that column (fractional index).

4. VIEW STATE IN THE URL
   - ?v=v2&filter=... → shareable links, back button works.

5. LIVE UPDATES
   - A row edited elsewhere may no longer match my filter → don't make it
     vanish under the user's cursor instantly. Keep it until the next
     refresh, or animate it out.

Interview line:
"Rows are pages and views are saved queries, so table, board and calendar
are just different renderers of the same data. The table view reuses my big
data table design with virtualization and cursor pagination."
*/
