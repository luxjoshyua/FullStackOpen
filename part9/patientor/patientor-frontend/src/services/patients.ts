import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (patientId: string, object: EntryWithoutId) => {
  // object contains diagnoisCodes
  // console.log(`OBJECT IN ADD ENTRY in the front = `, object);

  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  // data doesn't contain diagnosisCodes
  // console.log(`DATA IN ADD ENTRY in the front = `, data);
  return data;
};

export default {
  getAll,
  create,
  addEntry,
};
