import { useState, useEffect } from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container, Typography } from '@mui/material'
import { useMatch } from 'react-router-dom'

import { Patient, Diagnosis } from './types'
import patientService from './services/patients'
import diagnosisService from './services/diagnoses'
import PatientListPage from './components/PatientListPage'
import PatientPage from './components/PatientPage'
import { DiagnosesContext } from './context'

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`)
    const fetchPatientList = async () => {
      const patients = await patientService.getAll()
      setPatients(patients)
    }
    void fetchPatientList()
  }, [])

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll()
      setDiagnoses(diagnoses)
    }
    void fetchDiagnosisList()
  }, [])

  const match = useMatch('/patients/:id')
  const patient = match ? patients?.find((patient) => patient.id === match.params.id) : null

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" sx={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ marginBottom: '1em' }}>
          Home
        </Button>
        <Divider hidden />
        <DiagnosesContext.Provider value={diagnoses}>
          <Routes>
            <Route
              path="/"
              element={<PatientListPage patients={patients} setPatients={setPatients} />}
            />
            <Route path="/patients/:id" element={<PatientPage patient={patient} />} />
          </Routes>
        </DiagnosesContext.Provider>
      </Container>
    </div>
  )
}

export default App
