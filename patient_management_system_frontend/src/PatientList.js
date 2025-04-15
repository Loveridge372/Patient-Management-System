
const PatientList = ({
  patients,
  onDelete,
  editingId,
  editForm,
  startEditing,
  cancelEditing,
  handleEditChange,
  updatePatient,
}) => {
  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            {editingId === p.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="age"
                  value={editForm.age}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="diagnosis"
                  value={editForm.diagnosis}
                  onChange={handleEditChange}
                />
                <button onClick={() => updatePatient(p.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {p.name} (Age: {p.age}) - {p.diagnosis}
                <button onClick={() => startEditing(p)}>Edit</button>
                <button onClick={() => onDelete(p.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;