
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    age = db.Column(db.Integer)
    diagnosis = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'diagnosis': self.diagnosis
        }

@app.route('/patients', methods=['GET'])
@cross_origin()
def get_patients():
    patients = Patient.query.all()
    return jsonify([p.to_dict() for p in patients])

@app.route('/patients', methods=['POST'])
@cross_origin()
def add_patient():
    data = request.get_json()
    new_patient = Patient(
        name=data['name'],
        age=data['age'],
        diagnosis=data.get('diagnosis', '')
    )
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.to_dict()), 201

@app.route('/patients/<int:id>', methods=['PUT'])
@cross_origin()
def update_patient(id):
    patient = Patient.query.get_or_404(id)
    data = request.get_json()
    patient.name = data['name']
    patient.age = data['age']
    patient.diagnosis = data.get('diagnosis', '')
    db.session.commit()
    return jsonify(patient.to_dict())

@app.route('/patients/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_patient(id):
    patient = Patient.query.get_or_404(id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted'})

if __name__ == '__main__':
    app.run(debug=True)
