from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, TIMESTAMP, Date, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Alert(Base):
    __tablename__ = 'alerts'
    id = Column(String, primary_key=True)
    timestamp = Column(TIMESTAMP, nullable=False)
    type = Column(String, nullable=False)
    message = Column(String, nullable=False)
    glucose_data_id = Column(Integer, ForeignKey('glucose_data.id'))
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'type': self.type,
            'message': self.message,
            'glucose_data_id': self.glucose_data_id
        } 

class Car(Base):
    __tablename__ = 'cars'
    id = Column(String, primary_key=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    patient_id = Column(String, ForeignKey('patients.id'))
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'make': self.make,
            'model': self.model,
            'year': self.year,
            'patient_id': self.patient_id
        }

class GlucoseData(Base):
    __tablename__ = 'glucose_data'
    id = Column(Integer, primary_key=True)
    timestamp = Column(TIMESTAMP, nullable=False)
    glucose_level = Column(Integer, nullable=False)
    trend = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    sensor_id = Column(String, ForeignKey('sensors.id'))
    sensor = relationship("Sensor", back_populates="glucose_data")
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'glucose_level': self.glucose_level,
            'trend': self.trend,
            'unit': self.unit,
            'sensor_id': self.sensor_id
        }

class Patient(Base):
    __tablename__ = 'patients'
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    diabetes_type = Column(String, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'diabetes_type': self.diabetes_type
        }

class SafetyAction(Base):
    __tablename__ = 'safety_actions'
    id = Column(BigInteger, primary_key=True)
    action = Column(String, nullable=False)
    alert_id = Column(String, ForeignKey('alerts.id'))
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'action': self.action,
            'alert_id': self.alert_id
        }

class Sensor(Base):
    __tablename__ = 'sensors'
    id = Column(String, primary_key=True)
    model = Column(String, nullable=False)
    battery_status = Column(String, nullable=False)
    patient_id = Column(String, ForeignKey('patients.id'))
    glucose_data = relationship("GlucoseData", back_populates="sensor")
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'model': self.model,
            'battery_status': self.battery_status,
            'patient_id': self.patient_id
        }

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    password_hash = Column(String, nullable=False)
