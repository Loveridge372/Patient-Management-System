
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Patient Management System
        </Typography>
        <PatientForm onSubmit={addPatient} />
        <PatientList patients={patients} />
      </Container>
    </>
  );
}

export default App;
