import { v1 as uuid } from "uuid";
import data from "../../data/patients";

import { Patient, NonSSNPatientEntry, NewPatientEntry } from "../types";

const getPatients = (): Patient[] => {
  return data;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = data.find((patient) => patient.id === id);
  return patient;
};

const getNonSSNPatientEntries = (): NonSSNPatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  // console.log(`new patient entry`, newPatientEntry);

  data.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getPatient, getNonSSNPatientEntries, addPatient };
