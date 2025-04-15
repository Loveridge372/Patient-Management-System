
import React from "react";

const PatientCard = ({ patient, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Diagnosis: {patient.diagnosis}</p>
      <button onClick={() => onDelete(patient.id)}>Delete</button>
    </div>
  );
};

export default PatientCard;