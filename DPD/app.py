from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Patient, Car, GlucoseData, Alert, Sensor, SafetyAction
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
jwt = JWTManager(app)

# Enable CORS only for specific origins
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

app.secret_key = 'dataengineer'

# Use a MySQL connection string
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Nd12356789gC@localhost:3306/bmw'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/api/patients/<patient_id>/glucose-data')
def get_glucose_data(patient_id):
    glucose_data = session.query(GlucoseData).filter(GlucoseData.sensor.has(patient_id=patient_id)).all()
    alerts = session.query(Alert).filter(Alert.glucose_data_id.in_([gd.id for gd in glucose_data])).all()
    return jsonify(glucoseData=[gd.serialize for gd in glucose_data], alerts=[alert.serialize for alert in alerts])

@app.route('/api/patient/<patient_id>')
def get_patient(patient_id):
    patient = session.query(Patient).filter(Patient.id == patient_id).first()
    return jsonify(patient.serialize)

@app.route('/api/car/<patient_id>')
def get_car(patient_id):
    car = session.query(Car).filter(Car.patient_id == patient_id).first()
    return jsonify(car.serialize)

if __name__ == '__main__':
    app.run(debug=True)
