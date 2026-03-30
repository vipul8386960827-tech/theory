import React, { useState } from "react";

const data = [
  {
    id: 1,
    name: "John Doe",
    file: "Project_File.pdf",
    report: "Report_Q1.pdf",
    session: "Session_1.mp4",
  },
  {
    id: 2,
    name: "Jane Smith",
    file: "Design_File.pdf",
    report: "Final_Report.pdf",
    session: "Session_A.mp4",
  },
];

const dependencies = {
  file: [],
  report: ["file"],
  session: ["file", "report"],
};

// helper → remove dependents recursively
const removeDependents = (type, updated) => {
  Object.keys(dependencies).forEach((key) => {
    if (dependencies[key].includes(type) && updated[key]) {
      updated[key] = false;
      removeDependents(key, updated);
    }
  });
};

const TableWithState = () => {
  const [state, setState] = useState({});

  const handleChange = (rowId, type) => {
    setState((prev) => {
      const current = prev[rowId] || {
        file: false,
        report: false,
        session: false,
      };

      const updated = { ...current };
      const newValue = !current[type];

      // toggle current
      updated[type] = newValue;

      if (newValue) {
        // ✅ selecting → enable dependencies
        dependencies[type].forEach((dep) => {
          updated[dep] = true;
        });
      } else {
        // ✅ unselecting → remove dependents
        removeDependents(type, updated);
      }

      return {
        ...prev,
        [rowId]: updated,
      };
    });
  };

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>File</th>
          <th>Report</th>
          <th>Session</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          const rowState = state[row.id] || {};

          return (
            <tr key={row.id}>
              <td>{row.name}</td>

              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={!!rowState.file}
                    onChange={() => handleChange(row.id, "file")}
                  />
                  {row.file}
                </label>
              </td>

              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={!!rowState.report}
                    onChange={() => handleChange(row.id, "report")}
                  />
                  {row.report}
                </label>
              </td>

              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={!!rowState.session}
                    onChange={() => handleChange(row.id, "session")}
                  />
                  {row.session}
                </label>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableWithState;
