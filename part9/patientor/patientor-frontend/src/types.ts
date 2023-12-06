export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  // optional
  // refer to the Diagnosis type, specifically the code field of the Diagnosis type
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface Discharge {
  date: string
  criteria: string
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>
