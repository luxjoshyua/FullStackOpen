import { Diagnosis } from '../types'
export const getDiagnosisDescription = (diagnoses: Diagnosis[], diagnosisCode: string) => {
  const matchingDiagnosis = diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode)
  return matchingDiagnosis?.name
}

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}
