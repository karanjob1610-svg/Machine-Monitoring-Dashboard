import React, { useState } from "react";

const MachineForm = ({ onAdd }) => {


  const [name, setName] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Enter machine name!");
  

    onAdd({
      id: Date.now(),
      name,
      status: "Running",
      temperature: (20 + Math.random() * 80).toFixed(1),
      lastUpdated: new Date().toLocaleTimeString(),
    });

    setName("");
  };
  






  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Machine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Add Machine</button>
    </form>
  );
};

export default MachineForm;