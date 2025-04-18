
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=["https://patient-management-system-frontend.onrender.com"], methods=["GET", "POST", "PUT", "DELETE"], allow_headers="*")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Auto create the DB if missing
with app.app_context():
    if not os.path.exists("database.db"):
        db.create_all()

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
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

if __name__ == '__main__':
    app.run(debug=True)