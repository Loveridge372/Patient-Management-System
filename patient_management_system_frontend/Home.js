
import React from "react";
import PatientList from "../components/PatientList";
import AddPatient from "../components/AddPatient";

const Home = () => {
  return (
    <div>
      <h1>Patient Management System</h1>
      <AddPatient onAdd={() => window.location.reload()} />
      <PatientList />
    </div>
  );
};

export default Home;