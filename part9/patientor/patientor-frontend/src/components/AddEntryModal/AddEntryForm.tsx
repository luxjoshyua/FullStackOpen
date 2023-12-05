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
  Typography,
} from '@mui/material'
import { EntryWithoutId, Diagnosis, HealthCheckRating } from '../../types'
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
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy)
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [entryOptions, setEntryOptions] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState()

  const diagnoses = useContext(DiagnosesContext)

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
    // console.log(value)

    typeof value === 'string' ? setDiagnosisCodes(value.split(', ')) : setDiagnosisCodes(value)
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    }

    switch (entryOptions) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating,
        })
        break
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        })
        break
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: dischargeDate,
                  endDate: dischargeCriteria,
                }
              : undefined,
        })
        break
      default:
        break
    }
  }

  return (
    <div>
      <Typography variant="h5">New entry</Typography>
      <InputLabel>Entry options</InputLabel>
      <Select
        label="Entry options"
        fullWidth
        value={entryOptions}
        onChange={({ target }) => setEntryOptions(target.value)}
        style={{ marginBottom: '1rem' }}>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </Select>

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

        {entryOptions == 'HealthCheck' && (
          <>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
              style={{ marginBottom: '1rem' }}
              input={<OutlinedInput label="Health Check Rating" />}>
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
            </Select>
          </>
        )}

        {entryOptions == 'OccupationalHealthcare' && (
          <>
            <InputLabel>Sick Leave Start Date</InputLabel>
            <Input
              fullWidth
              value={dischargeDate}
              type="date"
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <InputLabel>Sick Leave End Date</InputLabel>
            <Input
              fullWidth
              value={dischargeCriteria}
              type="date"
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginBottom: '1rem' }}
            />
          </>
        )}

        {entryOptions === 'Hospital' && (
          <>
            <InputLabel>Discharge Date</InputLabel>
            <Input
              fullWidth
              value={dischargeDate}
              type="date"
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <InputLabel>Discharge Criteria</InputLabel>
            <Input
              fullWidth
              value={dischargeCriteria}
              type="text"
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginBottom: '1rem' }}
            />
          </>
        )}

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
