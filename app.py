
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, origins=["https://patient-management-system-frontend.onrender.com"])  # Your frontend URL here

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    age = db.Column(db.Integer)
    diagnosis = db.Column(db.String(200))

@app.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'age': p.age,
        'diagnosis': p.diagnosis
    } for p in patients])

@app.route('/patients', methods=['POST'])
def add_patient():
    data = request.json
    new_patient = Patient(name=data['name'], age=data['age'], diagnosis=data.get('diagnosis', ''))
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({
        'id': new_patient.id,
        'name': new_patient.name,
        'age': new_patient.age,
        'diagnosis': new_patient.diagnosis
    })

@app.route('/patients/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get_or_404(id)
    data = request.json
    patient.name = data['name']
    patient.age = data['age']
    patient.diagnosis = data.get('diagnosis', '')
    db.session.commit()
    return jsonify({
        'id': patient.id,
        'name': patient.name,
        'age': patient.age,
        'diagnosis': patient.diagnosis
    })

@app.route('/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get_or_404(id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted'})

if __name__ == '__main__':
    app.run(debug=True)
