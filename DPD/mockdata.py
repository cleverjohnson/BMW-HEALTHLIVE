import json
import random
from datetime import datetime, timedelta
from fhir.resources.patient import Patient
from fhir.resources.humanname import HumanName
from fhir.resources.device import Device
from fhir.resources.observation import Observation
from fhir.resources.quantity import Quantity
from fhir.resources.codeableconcept import CodeableConcept
from fhir.resources.coding import Coding
from fhir.resources.deviceusestatement import DeviceUseStatement

def generate_patient_resource(patient_id):
    name = HumanName(family=f"Family{patient_id}", given=[f"Given{patient_id}"])
    patient = Patient(id=patient_id, name=[name])
    return patient

def generate_device_resource(device_id, patient_id):
    device = Device(
        id=device_id,
        type=CodeableConcept(
            coding=[
                Coding(
                    system="http://terminology.hl7.org/CodeSystem/device-kind",
                    code="glucose_sensor",
                    display="Continuous Glucose Monitor Sensor"
                )
            ],
            text="Continuous Glucose Monitor Sensor"
        ),
        patient={"reference": f"Patient/{patient_id}"}
    )
    return device

def generate_glucose_observation(device_id, timestamp, glucose_level):
    observation = Observation(
        id=f"O{device_id}_glucose_{timestamp.isoformat()}",
        status="final",
        code=CodeableConcept(
            coding=[
                Coding(
                    system="http://loinc.org",
                    code="2339-0",
                    display="Glucose [Mass/volume] in Blood"
                )
            ],
            text="Blood Glucose Measurement"
        ),
        device={"reference": f"Device/{device_id}"},
        effectiveDateTime=timestamp.isoformat(),
        valueQuantity=Quantity(
            value=glucose_level,
            unit="mg/dL",
            system="http://unitsofmeasure.org",
            code="mg/dL"
        )
    )
    return observation

def generate_device_use_statement(device_id, patient_id):
    device_use_statement = DeviceUseStatement(
        id=f"DUS{device_id}",
        status="active",
        device={"reference": f"Device/{device_id}"},
        subject={"reference": f"Patient/{patient_id}"}
    )
    return device_use_statement



def generate_mock_data(num_patients):
    mock_data = []

    for i in range(num_patients):
        patient_id = f"P{1000 + i}"
        patient_resource = generate_patient_resource(patient_id)

        device_id = f"D{1000 + i}"
        device_resource = generate_device_resource(device_id, patient_id)
        device_use_statement = generate_device_use_statement(device_id, patient_id)

        glucose_data = []
        start_time = datetime.now() - timedelta(days=1)
        for i in range(288):  # 288 5-minute intervals in a day
            timestamp = start_time + timedelta(minutes=5 * i)
            glucose_level = random.randint(60, 200)
            glucose_observation = generate_glucose_observation(device_id, timestamp, glucose_level)
            glucose_data.append(glucose_observation)

        patient_mock_data = {
            "patient": patient_resource,
            "device": device_resource,
            "device_use_statement": device_use_statement,
            "glucose_data": glucose_data
        }

        mock_data.append(patient_mock_data)

    return mock_data

num_patients =50
mock_data = generate_mock_data(num_patients)

# Serialize the FHIR resources to JSON format
serialized_mock_data = []
for patient_data in mock_data:
    serialized_patient_data = {
        "patient": patient_data["patient"].json(),
        "device": patient_data["device"].json(),
        "device_use_statement": patient_data["device_use_statement"].json(),
        "glucose_data": [observation.json() for observation in patient_data["glucose_data"]]
    }
    serialized_mock_data.append(serialized_patient_data)

# Save the serialized mock data to a JSON file
with open("fhir_mock_data.json", "w") as f:
    json.dump(serialized_mock_data, f, indent=2)