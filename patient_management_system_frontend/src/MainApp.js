
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
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAddPatient = async (patient) => {
    try {
      const newPatient = await addPatient(patient);
      setPatients((prev) => [...prev, newPatient]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleUpdatePatient = async (updatedData) => {
    try {
      const updated = await updatePatient(updatedData.id, updatedData);
      setPatients((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Patient Management System
        </Typography>
        <Box my={4}>
          <PatientForm
            onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
            editingPatient={editingPatient}
            setEditingPatient={setEditingPatient}
          />
        </Box>
        <PatientList
          patients={patients}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />
      </Container>
    </div>
  );
}

export default MainApp;