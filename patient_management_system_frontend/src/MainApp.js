
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Patient Management System
      </Typography>
      <PatientForm onSubmit={addPatient} />
      <PatientList patients={patients} />
    </Container>
  );
}

export default App;
