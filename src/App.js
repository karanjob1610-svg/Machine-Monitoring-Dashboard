import React, { useState, useEffect } from "react";
import "./App.css";
import MachineForm from "./Machineform";
import MachineList from "./Machinelist";

const App = () => {


  const [machines, setMachines] = useState(() => {
    const saved = localStorage.getItem("machines");
    return saved ? JSON.parse(saved) : [];
  });
//parse string
  /*
  id:1,
  machionmename:>"cnc",
  status:
  tempate:
  lastupdate
  
  */




  useEffect(() => {
    localStorage.setItem("machines", JSON.stringify(machines));
  }, [machines]);

  

// math.random()*10+20   //  9  0.1 0.9

  // Simulate live temperature updates every 3 seconds
  useEffect(() => {

    const interval = setInterval(() => {

      setMachines((prev) =>
        prev.map((m) => ({
          ...m,
          temperature: (20 + Math.random() * 10).toFixed(2), //80.98876
          lastUpdated: new Date().toLocaleTimeString(),
        }))
      );

    }, 3000);

    return () => clearInterval(interval);
  }, []);







  const addMachine = (machine) => {
    setMachines([...machines, machine]);
  };



  const toggleStatus = (id) => {

    setMachines(
      machines.map((m) =>
        m.id === id
          ? {
              ...m,
              status:
                m.status === "Running"
                  ? "Stopped"
                  : m.status === "Stopped"
                  ? "Maintenance"
                  : "Running",
            }
          : m
      )
    );
  };




  const deleteMachine = (id) => {
    setMachines(machines.filter((m) => m.id !== id));
  };

  

  const runningCount = machines.filter((m) => m.status === "Running").length;

  const stoppedCount = machines.filter((m) => m.status === "Stopped").length;
  const maintenanceCount = machines.filter((m) => m.status === "Maintenance").length;

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h2>⚙️ Machine Monitoring Dashboard</h2>
          <p>Live machine status, temperature, and controls in one place.</p>
        </header>

        <MachineForm onAdd={addMachine} />

        <div className="stats-panel">
          <div className="stat-item stat-running">🟢 Running: {runningCount}</div>
          <div className="stat-item stat-stopped">🔴 Stopped: {stoppedCount}</div>
          <div className="stat-item stat-maintenance">🟠 Maintenance: {maintenanceCount}</div>
        </div>

        <MachineList machines={machines} onToggle={toggleStatus} onDelete={deleteMachine} />
      </div>
    </div>
  );
};

export default App;
