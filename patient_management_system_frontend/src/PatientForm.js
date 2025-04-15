
import React, { useState } from "react";

const PatientForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !diagnosis) {
      alert("Please fill out all fields");
      return;
    }

    const newPatient = {
      name,
      age: parseInt(age),
      diagnosis,
    };

    onAdd(newPatient);

    // Clear form
    setName("");
    setAge("");
    setDiagnosis("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Add New Patient</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        required
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;