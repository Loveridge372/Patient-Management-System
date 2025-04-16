
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from './components/Navbar';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from './api/PatientApi';

function MainApp() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async (patient) => {
    try {
      const newPatient = await addPatient(patient);
      setPatients((prevPatients) => [...prevPatients, newPatient]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleUpdatePatient = async (id, updatedPatient) => {
    try {
      const newPatient = await updatePatient(id, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === id ? newPatient : p))
      );
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Patient Management System
        </Typography>
        <PatientForm onSubmit={handleAddPatient} />
        <PatientList
          patients={patients}
          onUpdate={handleUpdatePatient}
          onDelete={handleDeletePatient}
        />
      </Container>
    </>
  );
}

export default MainApp;
    

