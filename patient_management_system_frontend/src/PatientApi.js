
const API_BASE = "https://patient-management-system-1-rm4m.onrender.com";

export const getPatients = async () => {
  const res = await fetch(`${API_BASE}/patients`);
  return res.json();
};

export const addPatient = async (patient) => {
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return res.json();
};

export const updatePatient = async (id, patient) => {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return res.json();
};

export const deletePatient = async (id) => {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "DELETE",
  });
  return res.json();
};