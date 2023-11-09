import data from "../../data/patients";
import { Patient, NonSSNPatientEntry } from "../types";

const getPatients = (): Patient[] => {
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

export default { getPatients, getNonSSNPatientEntries };
