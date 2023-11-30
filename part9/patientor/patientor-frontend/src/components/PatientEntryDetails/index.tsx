import { Typography } from '@mui/material'
import { Entry } from '../../types'
import { HealthIcon } from '../Miscellaneous'

interface PropsHospitalEntry {
  discharge: {
    date: string
    criteria: string
  }
}

interface PropsOccupationalHealthcareEntry {
  employerName: string
  // check sickLeave exists in the data, then define if yes, skip if no
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

const HospitalEntry = ({ discharge }: PropsHospitalEntry): JSX.Element => {
  if (!discharge) return <></>

  return (
    <>
      <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
        <strong>discharge date: </strong>
        {discharge.date}
      </Typography>
      <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
        <strong>discharge criteria: </strong>
        {discharge.criteria}
      </Typography>
    </>
  )
}

const OccupationalHealthcareEntry = ({
  employerName,
  sickLeave,
}: PropsOccupationalHealthcareEntry): JSX.Element => {
  if (!employerName && !sickLeave) return <></>

  if (!sickLeave) {
    return (
      <>
        <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
          <strong>employer name: </strong>
          {employerName}
        </Typography>
      </>
    )
  }

  return (
    <>
      <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
        <strong>employer name: </strong>
        {employerName}
      </Typography>
      <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
        <strong>sick leave date: </strong>
        <ul>
          <li>start - {sickLeave.startDate}</li>
          <li>end - {sickLeave.endDate}</li>
        </ul>
      </Typography>
    </>
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthIcon rating={entry.healthCheckRating} />
    case 'Hospital':
      return <HospitalEntry discharge={entry.discharge} />
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry
          employerName={entry.employerName}
          sickLeave={entry.sickLeave}
        />
      )
    default:
      // do the assert never bizness here
      break
  }
}

export default EntryDetails
