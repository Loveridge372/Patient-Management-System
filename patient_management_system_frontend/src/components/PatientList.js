
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PatientList = ({ patients, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table aria-label="patient table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Diagnosis</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.diagnosis}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(patient)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(patient.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {patients.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No patients added yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientList;