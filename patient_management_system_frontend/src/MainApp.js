
import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import "./App.css"

const App = () => {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", age: "", diagnosis: "" });

  // Fetch all patients
  const fetchPatients = async () => {
    const response = await fetch("http://127.0.0.1:5000/patients");
    const data = await response.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add a new patient
  const addPatient = async (patient) => {
    const response = await fetch("http://127.0.0.1:5000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    const data = await response.json();
    setPatients([...patients, data]);
  };

  // Delete a patient
  const deletePatient = async (id) => {
    await fetch(`http://127.0.0.1:5000/patients/${id}`, { method: "DELETE" });
    setPatients(patients.filter((p) => p.id !== id));
  };

  // Start editing a patient
  const startEditing = (patient) => {
    setEditingId(patient.id);
    setEditForm({
      name: patient.name,
      age: patient.age,
      diagnosis: patient.diagnosis,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: "", age: "", diagnosis: "" });
  };

  // Handle input change during editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save the updated patient
  const updatePatient = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const updated = await response.json();

    setPatients(patients.map((p) => (p.id === id ? updated : p)));
    cancelEditing();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Patient Management System</h1>
      <PatientForm onAdd={addPatient} />
      <PatientList
        patients={patients}
        onDelete={deletePatient}
        editingId={editingId}
        editForm={editForm}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        handleEditChange={handleEditChange}
        updatePatient={updatePatient}
      />
    </div>
  );
};

export default App;
