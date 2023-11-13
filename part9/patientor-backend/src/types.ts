export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = "male" | "female" | "other";

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSSNPatientEntry = Omit<PatientEntry, "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;
