
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for both localhost and the deployed frontend
CORS(app, origins=["http://localhost:3000", "https://patient-management-system-1-rm4m.onrender.com"])

# Sample in-memory storage for patients
patients = []
next_id = 1

@app.route("/patients", methods=["GET"])
def get_patients():
    return jsonify(patients)

@app.route("/patients", methods=["POST"])
def add_patient():
    global next_id
    data = request.get_json()
    data["id"] = next_id
    next_id += 1
    patients.append(data)
    return jsonify(data), 201

@app.route("/patients/<int:id>", methods=["PUT"])
def update_patient(id):
    data = request.get_json()
    for patient in patients:
        if patient["id"] == id:
            patient.update(data)
            return jsonify(patient)
    return jsonify({"error": "Patient not found"}), 404

@app.route("/patients/<int:id>", methods=["DELETE"])
def delete_patient(id):
    global patients
    patients = [p for p in patients if p["id"] != id]
    return jsonify({"message": "Deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)
