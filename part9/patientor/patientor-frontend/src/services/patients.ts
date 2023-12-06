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
  console.log(`OBJECT IN ADD ENTRY in the front = `, object);
  // the object has the array of diagnosis codes, but it is not being passed along
  // I think has something to do with the Entry type
  // const { diagnosisCodes } = object;
  // const combined = { ...object, diagnosisCodes };
  // const { data } = await axios.post<Entry>(
  //   `${apiBaseUrl}/patients/${patientId}/entries`,
  //   object
  // );

  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  console.log(`DATA IN ADD ENTRY in the front = `, data);
  return data;
};

export default {
  getAll,
  create,
  addEntry,
};
