import { v1 as uuid } from "uuid";
import data from "../../data/patients";

import { PatientEntry, NonSSNPatientEntry, NewPatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return data;
};

const getNonSSNPatientEntries = (): NonSSNPatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  console.log(`new patient entry`, newPatientEntry);
  data.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getNonSSNPatientEntries, addPatient };
