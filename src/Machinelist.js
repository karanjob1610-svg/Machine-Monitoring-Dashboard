import React from "react";

const MachineList = ({ machines, onToggle, onDelete }) => {
  if (machines.length === 0) return <p>No machines added yet.</p>;

  return (
    <table style={{ margin: "auto", borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
      <thead>
        <tr style={{ backgroundColor: "#333", color: "white" }}>
          <th>Name</th>
          <th>Status</th>
          <th>Temperature (°C)</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {machines.map((m) => (
          <tr key={m.id} style={{ borderBottom: "1px solid gray" }}>
            <td data-label="Name">{m.name}</td>
            <td data-label="Status" style={{ color: m.status === "Running" ? "green" : m.status === "Stopped" ? "red" : "orange" }}>
              {m.status}
            </td>
            <td data-label="Temperature">{m.temperature}</td>
            <td data-label="Last Updated">{m.lastUpdated}</td>
            <td data-label="Actions">
              <button onClick={() => onToggle(m.id)} style={{ marginRight: "5px" }}>Toggle Status</button>
              <button onClick={() => onDelete(m.id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MachineList;