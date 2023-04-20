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

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            email = request.form['email']
            password = request.form['password']
            date_of_birth = request.form['date_of_birth']

            # Validate user input here, if you have created a form class for registration

            hashed_password = generate_password_hash(password)
            new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password, date_of_birth=date_of_birth)
            db.session.add(new_user)
            db.session.commit()

            return redirect(url_for('login'))
        except Exception as e:
            # Handle the exception, e.g., by logging the error and showing an error message to the user
            print(f"Error: {e}")
            flash("An error occurred while registering. Please try again.", "danger")
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            # You can customize this error message as needed
            flash('Invalid email or password', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

# New API endpoints
@app.route('/api/register', methods=['POST'])
def api_register():
    try:
        data = request.get_json()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        date_of_birth = data.get('date_of_birth')

        # You can add validation for the received data here.

        new_user = User(first_name=first_name, last_name=last_name, email=email, date_of_birth=date_of_birth)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": True})
    except Exception as e:
        print(f"Error: {e}")
        return make_response(jsonify({"success": False, "error": str(e)}), 500)
    
@app.route('/api/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check if the user exists in the database
        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            # Invalid email or password
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        # Login successful, create a JWT token and send it to the client
        access_token = create_access_token(identity=user.email)
        refresh_token = create_refresh_token(identity=user.email)

        return jsonify({"success": True, "access_token": access_token, "refresh_token": refresh_token})

    except Exception as e:
        print(f"Error: {e}")
        return make_response(jsonify({"success": False, "error": str(e)}), 500)

@app.route("/api/glucose_data/latest", methods=["GET"])
@login_required
def api_get_latest_glucose_data():
    sensor_id = request.args.get("sensor_id")
    patient_id = request.args.get("patient_id")

    if not sensor_id or not patient_id:
        return jsonify({"success": False, "message": "sensor_id and patient_id are required"}), 400

    latest_glucose_data = GlucoseData.query.filter(GlucoseData.sensor_id == sensor_id).order_by(GlucoseData.timestamp.desc()).first()

    if latest_glucose_data:
        response_data = {
            "id": latest_glucose_data.id,
            "timestamp": latest_glucose_data.timestamp.isoformat(),
            "glucose_level": latest_glucose_data.glucose_level,
            "trend": latest_glucose_data.trend,
            "unit": latest_glucose_data.unit,
            "sensor_id": latest_glucose_data.sensor_id,
        }
        return jsonify({"success": True, "data": response_data})
    else:
        return jsonify({"success": False, "message": "No glucose data found for the given sensor_id"}), 404


@app.route("/api/medical_assistance", methods=["GET"])
def get_medical_assistance():
    lat = float(request.args.get("lat"))
    lng = float(request.args.get("lng"))

    # Call the Google Places API with the user's location to fetch nearby hospitals
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=5000&keyword=hospital|healthcare|pharmacy&key={'AIzaSyBzHPKcYzqx03ytl08YouIVfM7ZKIuOULw'}"

    response = requests.get(url)
    data = response.json()

    # Extract relevant information from the API response and format it for your frontend
    locations = [
        {
            "id": result["place_id"],
            "name": result["name"],
            "address": result["vicinity"],
            "coordinates": [result["geometry"]["location"]["lat"], result["geometry"]["location"]["lng"]],
        }
        for result in data["results"]
    ]

    return jsonify({"locations": locations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

