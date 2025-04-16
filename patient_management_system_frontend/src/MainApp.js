
import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import { API_BASE, getPatients, addPatient, updatePatient, deletePatient } from "./PatientApi";
import "./App.css";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", age: "", diagnosis: "" });

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add a new patient
  const onAdd = async (patient) => {
    try {
      const newPatient = await addPatient(patient);
      setPatients([...patients, newPatient]);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  // Delete a patient
  const onDelete = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Update a patient
  const onUpdate = async (id, updatedPatient) => {
    try {
      const newPatient = await updatePatient(id, updatedPatient);
      setPatients(patients.map((p) => (p.id === id ? newPatient : p)));
      setEditingId(null);
      setEditForm({ name: "", age: "", diagnosis: "" });
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div className="App">
      <h1>Patient Management System</h1>
      <PatientForm
        onAdd={onAdd}
        onUpdate={onUpdate}
        editingId={editingId}
        editForm={editForm}
        setEditForm={setEditForm}
      />
      <PatientList
        patients={patients}
        onDelete={onDelete}
        onEdit={(id) => {
          const patient = patients.find((p) => p.id === id);
          setEditingId(id);
          setEditForm({ name: patient.name, age: patient.age, diagnosis: patient.diagnosis });
        }}
      />
    </div>
  );
};

export default App;
