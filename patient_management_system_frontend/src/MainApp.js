
import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import { API_BASE } from './PatientApi'
import "./App.css";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", age: "", diagnosis: "" });

  // Fetch all patients
  const fetchPatients = async () => {
    const response = await fetch(`${API_BASE}/patients`);
    const data = await response.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add a new patient
  const addPatient = async (patient) => {
    const response = await fetch(`${API_BASE}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    const data = await response.json();
    setPatients([...patients, data]);
  };

  // Delete a patient
  const deletePatient = async (id) => {
    await fetch(`${API_BASE}/patients/${id}`, {
      method: "DELETE",
    });
    setPatients(patients.filter((p) => p.id !== id));
  };

  // Update a patient
  const updatePatient = async (id, updatedPatient) => {
    const response = await fetch(`${API_BASE}/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPatient),
    });
    const data = await response.json();
    setPatients(patients.map((p) => (p.id === id ? data : p)));
    setEditingId(null);
    setEditForm({ name: "", age: "", diagnosis: "" });
  };

  return (
    <div className="App">
      <h1>Patient Management System</h1>
      <PatientForm onAdd={addPatient} />
      <PatientList
        patients={patients}
        onDelete={deletePatient}
        onEdit={setEditingId}
        editingId={editingId}
        editForm={editForm}
        setEditForm={setEditForm}
        onUpdate={updatePatient}
      />
    </div>
  );
};

export default App;
