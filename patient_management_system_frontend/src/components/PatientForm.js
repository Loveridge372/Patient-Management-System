
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PatientForm = ({ onAddPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    diagnosis: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age) {
      onAddPatient(formData);
      setFormData({ name: '', age: '', diagnosis: '' }); // Clear form
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnosis"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default PatientForm;