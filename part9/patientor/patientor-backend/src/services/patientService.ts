import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import {
  Patient,
  NonSSNPatientEntry,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types";

const getPatients = (): Patient[] => {
  return data;
};

const getPatient = (id: string): Patient | undefined => {
  return data.find((patient) => patient.id === id);
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

  data.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSSNPatientEntries,
  addPatient,
  addEntry,
};
