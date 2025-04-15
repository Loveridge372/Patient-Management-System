
import React, { useState } from 'react';

const PatientForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', age: '', diagnosis: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:5000/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newPatient = await res.json();
      onAdd(newPatient);
      setForm({ name: '', age: '', diagnosis: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
      <input name="diagnosis" placeholder="Diagnosis" value={form.diagnosis} onChange={handleChange} required />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;