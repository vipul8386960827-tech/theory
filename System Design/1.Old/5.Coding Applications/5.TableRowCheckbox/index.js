/*
1. Import React and useState hook to manage component state.
   - useState is used here to keep track of which checkboxes are selected.
*/
import React, { useState } from "react";

/*
2. Backend simulation:
   - backendColumns: Array representing the column order from the backend.
     Any new column from the backend can be added here, making it scalable.
   - backendData: Array of objects, each representing a row in the table.
     Each object has keys corresponding to backendColumns.
*/
const backendColumns = [
  "report",
  "session",
  "simulation",
  "halo",
  "steps",
  "ornage", // example extra column
];
const backendData = [
  {
    report: "Coca Cola Report",
    session: "Coca Cola Sessions",
    simulation: "Coca Cola Simulations",
    halo: "Coca Halo",
    steps: "Step 1",
  },
  {
    report: "Pepsi Report",
    session: "Pepsi Sessions",
    simulation: "Pepsi Simulations",
    halo: "Pepsi Halo",
    steps: "Step 2",
  },
  {
    report: "Sprite Report",
    session: "Sprite Sessions",
    simulation: "Sprite Simulations",
    halo: "Sprite Halo",
    steps: "Step 3",
  },
];

/*
3. DashboardTable component:
   - Responsible for rendering the table with checkboxes and handling selection logic.
*/
const DashboardTable = () => {
  /*
  4. State: 'selected' keeps track of all selected checkboxes.
     - The keys are in the format `${rowIndex}-${columnKey}` for unique identification.
     - Value is boolean: true if selected, false or undefined if not.
  */
  const [selected, setSelected] = useState({});

  /*
  5. handleChange: Called whenever a checkbox is toggled.
     - rowIndex: index of the row
     - columnKey: key of the column that was clicked
     Logic:
       - Toggle the checkbox.
       - Select all parent columns if this checkbox is checked.
       - Deselect all child columns if this checkbox is unchecked.
  */
  const handleChange = (rowIndex, columnKey) => {
    setSelected((prev) => {
      // Copy previous state to avoid mutating directly
      const newSelected = { ...prev };

      // Toggle the clicked checkbox
      const isChecked = !prev[`${rowIndex}-${columnKey}`];
      newSelected[`${rowIndex}-${columnKey}`] = isChecked;

      /*
      6. getParents: Compute parent dependencies dynamically based on column order.
         - All columns that come before the current column are considered parents.
      */
      const getParents = (key) =>
        backendColumns.slice(0, backendColumns.indexOf(key));

      /*
      7. selectParents: Recursively select all parent columns.
         - Ensures if a child is selected, all parents are also selected.
      */
      const selectParents = (key) => {
        const parents = getParents(key);
        parents.forEach((parentKey) => {
          newSelected[`${rowIndex}-${parentKey}`] = true;
          selectParents(parentKey); // recursive call for grand-parents
        });
      };

      /*
      8. deselectChildren: Recursively deselect all dependent child columns.
         - Ensures if a parent is deselected, all children are also deselected.
      */
      const deselectChildren = (key) => {
        // Find all columns that depend on this column (children)
        const children = backendColumns.filter((col) =>
          getParents(col).includes(key)
        );
        children.forEach((childKey) => {
          newSelected[`${rowIndex}-${childKey}`] = false;
          deselectChildren(childKey); // recursive call for grand-children
        });
      };

      // Apply parent/child logic based on toggle state
      if (isChecked) {
        selectParents(columnKey);
      } else {
        deselectChildren(columnKey);
      }

      // Return the updated state
      return newSelected;
    });
  };

  /*
  9. handleUpdate: Called when the Update button is clicked.
     - Iterates over all rows and columns.
     - Creates an object for each row showing which items are selected.
     - Logs the final selection to console.
  */
  const handleUpdate = () => {
    const selectedItems = backendData.map((row, rowIndex) => {
      const rowSelection = {};
      backendColumns.forEach((col) => {
        rowSelection[col] = selected[`${rowIndex}-${col}`] ? row[col] : null;
      });
      return rowSelection;
    });
    console.log(selectedItems);
  };

  /*
  10. JSX: Render the table
      - Table headers: Generated dynamically from backendColumns.
      - Table body: Generate rows dynamically from backendData.
      - Each cell contains a checkbox and the column value.
  */
  return (
    <div style={{ padding: "20px" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #000" }}>
            {backendColumns.map((col) => (
              <th key={col} style={{ padding: "8px", textAlign: "left" }}>
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {backendData.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: "1px solid #ccc" }}>
              {backendColumns.map((col) => (
                <td key={col} style={{ padding: "8px" }}>
                  <input
                    type="checkbox"
                    checked={!!selected[`${rowIndex}-${col}`]} // true if selected
                    onChange={() => handleChange(rowIndex, col)} // handle toggle
                    style={{ marginRight: "8px" }}
                  />
                  {row[col]} {/* Display the cell value */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Update button triggers handleUpdate */}
      <button
        onClick={handleUpdate}
        style={{ marginTop: "20px", padding: "8px 16px" }}
      >
        Update
      </button>
    </div>
  );
};

export default DashboardTable;

/*
Summary of Key Points:
1. Dynamic columns: backendColumns array allows for any number of columns from backend.
2. Recursive parent/child selection ensures checkbox logic follows dependency rules.
3. State uses unique keys per cell (`rowIndex-columnKey`) for easy tracking.
4. Update button collects all selected values per row and logs them.
5. Scalable and works for new columns without modifying frontend logic.
*/
