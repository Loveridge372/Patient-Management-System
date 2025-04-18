
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PatientForm = ({ onSubmit, editingPatient, setEditingPatient }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name);
      setAge(editingPatient.age);
      setDiagnosis(editingPatient.diagnosis || '');
    } else {
      setName('');
      setAge('');
      setDiagnosis('');
    }
  }, [editingPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const patientData = {
      name,
      age,
      diagnosis,
    };

    if (editingPatient) {
      patientData.id = editingPatient.id;
    }

    onSubmit(patientData);

    setName('');
    setAge('');
    setDiagnosis('');
    setEditingPatient(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <TextField
          label="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingPatient ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};

export default PatientForm;