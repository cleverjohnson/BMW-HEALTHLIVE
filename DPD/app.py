from flask import Flask, render_template, redirect, url_for, request, flash, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
import random
import requests
import os
from urllib.parse import urlencode
import mysql.connector

from sqlalchemy.orm import sessionmaker
from models import Base, Alert, Car, GlucoseData, Patient, SafetyAction, Sensor, User

# Initialize the Flask app
app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)

app.secret_key = 'dataengineer'

# Use a MySQL connection string
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Nd12356789gC@localhost:3306/bmw'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)

# Initialize the LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Glucose data API route
@app.route('/api/patients/<patient_id>/glucose-data')
def get_glucose_data(patient_id):
    # Add a filter to query GlucoseData by patient_id
    glucose_data = GlucoseData.query.filter_by(patient_id=patient_id).all()
    data = {'glucoseData': [], 'alerts': []}
    for data_point in glucose_data:
        data['glucoseData'].append({
            'id': data_point.id,
            'timestamp': data_point.timestamp,
            'glucose_level': data_point.glucose_level,
            'trend': data_point.trend,
            'unit': data_point.unit,
            'sensor_id': data_point.sensor_id
        })
        # Check for alerts related to this glucose data point
        alerts = Alert.query.filter_by(glucose_data_id=data_point.id).all()
        for alert in alerts:
            data['alerts'].append({
                'id': alert.id,
                'timestamp': alert.timestamp,
                'type': alert.type,
                'message': alert.message,
                'glucose_data_id': alert.glucose_data_id
            })
    return jsonify(data)


# Patient API route
@app.route('/api/patients/<patient_id>')
def get_patients():
    patients = Patient.query.all()
    data = []
    for patient in patients:
        data.append({
            'id': patient.id,
            'name': patient.name,
            'age': patient.age,
            'diabetes_type': patient.diabetes_type
        })
    return jsonify(data)

# Car API route
@app.route('/api/patients/<patient_id>/car')
def get_cars():
    cars = Car.query.all()
    data = []
    for car in cars:
        data.append({
            'id': car.id,
            'make': car.make,
            'model': car.model,
            'year': car.year,
            'patient_id': car.patient_id
        })
    return jsonify(data)

# Alert API route
@app.route('/api/patients/<patient_id>/alerts')
def get_alerts():
    alerts = Alert.query.all()
    data = []
    for alert in alerts:
        data.append({
            'id': alert.id,
            'timestamp': alert.timestamp,
            'type': alert.type,
            'message': alert.message,
            'glucose_data_id': alert.glucose_data_id
        })
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

