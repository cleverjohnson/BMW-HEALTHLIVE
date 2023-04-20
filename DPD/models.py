from sqlalchemy import (Column, String, Integer, DateTime, ForeignKey, TIMESTAMP, Date,
                        PrimaryKeyConstraint, UniqueConstraint, create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Alert(Base):
    __tablename__ = 'alerts'
    id = Column(String(255), primary_key=True)
    timestamp = Column(TIMESTAMP, nullable=False)
    type = Column(String(255), nullable=False)
    message = Column(String(255), nullable=False)
    glucose_data_id = Column(Integer, ForeignKey('glucose_data.id'), nullable=False)

    glucose_data = relationship('GlucoseData', back_populates='alerts')


class Car(Base):
    __tablename__ = 'cars'
    id = Column(String(255), primary_key=True)
    make = Column(String(255), nullable=False)
    model = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    patient_id = Column(String(255), ForeignKey('patients.id'), nullable=False)

    patient = relationship('Patient', back_populates='cars')


class GlucoseData(Base):
    __tablename__ = 'glucose_data'
    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(TIMESTAMP, nullable=False)
    glucose_level = Column(Integer, nullable=False)
    trend = Column(String(255), nullable=False)
    unit = Column(String(255), nullable=False)
    sensor_id = Column(String(255), ForeignKey('sensors.id'), nullable=False)

    alerts = relationship('Alert', back_populates='glucose_data', lazy=True)
    sensor = relationship('Sensor', back_populates='glucose_data')


class Patient(Base):
    __tablename__ = 'patients'
    id = Column(String(255), primary_key=True)
    name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    diabetes_type = Column(String(255), nullable=False)

    cars = relationship('Car', back_populates='patient', lazy=True)
    sensors = relationship('Sensor', back_populates='patient', lazy=True)


class SafetyAction(Base):
    __tablename__ = 'safety_actions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    action = Column(String(255), nullable=False)
    alert_id = Column(String(255), ForeignKey('alerts.id'), nullable=False)

    alert = relationship('Alert', back_populates='safety_actions')


class Sensor(Base):
    __tablename__ = 'sensors'
    id = Column(String(255), primary_key=True)
    model = Column(String(255), nullable=False)
    battery_status = Column(String(255), nullable=False)
    patient_id = Column(String(255), ForeignKey('patients.id'), nullable=False)

    patient = relationship('Patient', back_populates='sensors')
    glucose_data = relationship('GlucoseData', back_populates='sensor', lazy=True)



class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    date_of_birth = Column(Date, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default='CURRENT_TIMESTAMP')
    updated_at = Column(TIMESTAMP, nullable=False, default='CURRENT_TIMESTAMP', onupdate='CURRENT_TIMESTAMP')
    password_hash = Column(String(255), nullable=False)
