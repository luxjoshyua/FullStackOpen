import { useMatch } from 'react-router-dom'
import { Box, Typography, Card, Stack, IconButton } from '@mui/material'
import GenderIcon from '../Gender'

import { Patient } from '../../types'

interface Props {
  patients: Patient[]
}

const PatientPage = ({ patients }: Props) => {
  const match = useMatch('/patients/:id')
  const patient = match ? patients.find((patient) => patient.id === match.params.id) : null
  if (!patient) return null

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
        }}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="column" spacing={0.2} alignItems="flex-start">
            <Typography color="text.primary" fontWeight="medium" fontSize={25}>
              {patient.name}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>ssn:</strong> {patient.ssn}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>occupation:</strong> {patient.occupation}
            </Typography>
            <Typography component="div" color="text.secondary" fontWeight="regular" fontSize={18}>
              <strong>gender:</strong> <GenderIcon gender={patient.gender} />
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton aria-label="fast forward" disabled size="small"></IconButton>
          </Stack>
        </Stack>
      </Card>
    </div>
  )
}

export default PatientPage
