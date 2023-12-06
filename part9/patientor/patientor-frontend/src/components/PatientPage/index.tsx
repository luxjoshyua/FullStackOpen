import { useContext, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Card, Stack, Button } from '@mui/material'
import { Work, MedicalServices } from '@mui/icons-material'

import { GenderIcon } from '../Miscellaneous'
import { Patient, EntryWithoutId } from '../../types'
import EntryDetails from '../PatientEntryDetails'
import { DiagnosisCodes } from '../Miscellaneous'
import { DiagnosesContext } from '../../context'
import AddEntryModal from '../AddEntryModal'
import patientService from '../../services/patients'

interface Props {
  patient: Patient | null | undefined
}

const PatientPage = ({ patient }: Props) => {
  const diagnoses = useContext(DiagnosesContext)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const openModal = (): void => setModalOpen(true)
  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  // console.log(patient)

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (patient) {
        const entry = await patientService.addEntry(patient.id, values)
        console.log(`ENTRY = `, entry, `PATIENT = `, patient)
        patient = { ...patient, entries: patient.entries.concat(entry) }
        setModalOpen(false)
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '')
          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  return (
    <div className="single-patient-view">
      <Box sx={{ marginBottom: '1em' }}>
        <Typography variant="h5">Single Patient list</Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          width: { xs: '100%', sm: 'auto' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          gap: 2,
          marginBottom: '.5em',
        }}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="column" spacing={0.2} alignItems="flex-start">
            <Typography color="text.primary" fontWeight="medium" fontSize={25}>
              {patient?.name}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>ssn:</strong> {patient?.ssn}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>occupation:</strong> {patient?.occupation}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>gender:</strong> <GenderIcon gender={patient?.gender} />
            </Typography>
          </Stack>
        </Stack>
      </Card>
      {patient?.entries?.length !== undefined && patient?.entries?.length > 0 && (
        <Typography variant="h5" sx={{ marginBottom: '0.5em' }}>
          Entries
        </Typography>
      )}
      {patient?.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
                marginBottom: '.5em',
              }}>
              <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
                <strong>date:</strong> {entry.date}
                {entry.type === 'OccupationalHealthcare' ? (
                  <>
                    <Work sx={{ marginLeft: '.5em' }} />
                  </>
                ) : (
                  <>
                    <MedicalServices />
                  </>
                )}
              </Typography>
              <DiagnosisCodes diagnoses={diagnoses} codes={entry.diagnosisCodes} />
              <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
                <strong>
                  <em>description:</em>{' '}
                </strong>
                {entry.description}
              </Typography>
              <EntryDetails entry={entry} />
              <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
                <strong>diagnosis by: </strong>
                {entry.specialist}
              </Typography>
            </Card>
          </div>
        )
      })}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
}

export default PatientPage
