
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Patient

app = Flask(__name__)
CORS(app, origins=["https://patient-management-system-1-rm4m.onrender"])  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
 
with app.app_context():
    db.create_all()

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'age': self.age, 'diagnosis': self.diagnosis}

@app.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([p.to_dict() for p in patients])

@app.route('/patients', methods=['POST'])
def add_patient():
    data = request.get_json()
    new_patient = Patient(name=data['name'], age=data['age'], diagnosis=data['diagnosis'])
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.to_dict()), 201

@app.route('/patients/<int:id>', methods=['PUT'])
def update_patient(id):
    data = request.get_json()
    patient = Patient.query.get_or_404(id)

    patient.name = data['name']
    patient.age = data['age']
    patient.diagnosis = data['diagnosis']

    db.session.commit()

    return jsonify({
        "id": patient.id,
        "name": patient.name,
        "age": patient.age,
        "diagnosis": patient.diagnosis
    })

if __name__ == '__main__':
    app.run(debug=True)