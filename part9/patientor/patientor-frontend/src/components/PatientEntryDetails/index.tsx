import { Entry } from '../../types'
import { HealthIcon } from '../Miscellaneous'

const HospitalEntry = () => {
  return (
    <div>
      <p>wassup</p>
    </div>
  )
}

const OccupationalHealthcare = () => {
  return (
    <div>
      <p>wassssup!????!</p>
    </div>
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  // console.log(entry)
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthIcon rating={entry.healthCheckRating} />
    case 'Hospital':
      // discharge
      return <HospitalEntry />
    case 'OccupationalHealthcare':
      // sick leave
      return <OccupationalHealthcare />
    default:
      // do the assert never bizness here
      break
  }
}

export default EntryDetails
