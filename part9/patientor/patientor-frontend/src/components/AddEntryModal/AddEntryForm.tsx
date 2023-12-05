import { useState, SyntheticEvent, useContext } from 'react'
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { EntryWithoutId, SickLeave, Discharge, Diagnosis } from '../../types'
import { DiagnosesContext } from '../../context'

interface Props {
  onCancel: () => void
  onSubmit: (values: EntryWithoutId) => void
}

/**
 * Props for AddEntryForm
 * - description
 * - date
 * - specialist
 * - diagnosisCodes
 * - discharge - date, criteria
 * - employerName
 * - sickLeave - startDate, endDate
 * - healthCheckRating
 *
 *
 */

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([])
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const diagnoses = useContext(DiagnosesContext)

  // healthCheckRating
  // sickLeaveStart
  // sickLeaveEnd
  // entryOptions

  // const onGenderChange = (event: SelectChangeEvent<string>) => {
  //   event.preventDefault()
  //   if (typeof event.target.value === 'string') {
  //     const value = event.target.value
  //     const gender = Object.values(Gender).find((g) => g.toString() === value)
  //     if (gender) {
  //       setGender(gender)
  //     }
  //   }
  // }

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault()

    const value = event.target.value
    console.log(value)

    typeof value === 'string' ? setDiagnosisCodes(value.split(', ')) : setDiagnosisCodes(value)
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    onSubmit({
      description,
      date,
      employerName,
    })
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <InputLabel>Date</InputLabel>
        <Input
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Employer name"
          placeholder="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Specialist"
          placeholder="Specialist name"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            label="Diagnosis Codes"
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            style={{ marginBottom: '1rem' }}
            input={<OutlinedInput label="Multiple Select" />}>
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                diagnosis code: {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </>
        <>
          <TextField
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Discharge criteria"
            placeholder="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            style={{ marginBottom: '1rem' }}
          />
        </>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddEntryForm
