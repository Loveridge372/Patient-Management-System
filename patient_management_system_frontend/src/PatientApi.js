
const API_BASE = "https://patient-management-system-1-rm4m.onrender.com";

const parseJSON = async (res) => {
  const text = await res.text();
  console.log("Raw response:", text);
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON response:", err);
    throw err;
  }
};

const getPatients = async () => {
  const res = await fetch(`${API_BASE}/patients`);
  return parseJSON(res);
};

const addPatient = async (patient) => {
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return parseJSON(res);
};

const updatePatient = async (id, patient) => {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  return parseJSON(res);
};

const deletePatient = async (id) => {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "DELETE",
  });
  return parseJSON(res);
};

export {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  API_BASE
};