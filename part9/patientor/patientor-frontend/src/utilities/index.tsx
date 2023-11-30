import { Diagnosis } from '../types'
export const getDiagnosisDescription = (diagnoses: Diagnosis[], diagnosisCode: string) => {
  const matchingDiagnosis = diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode)
  return matchingDiagnosis?.name
}
