import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material'

import { Patient } from '../../types'

interface Props {
  patients: Patient[]
}

const PatientPage = ({ patients }: Props) => {
  // console.log(patients)

  const match = useMatch('/patients/:id')
  const patient = match ? patients.find((patient) => patient.id === match.params.id) : null
  if (!patient) return null

  // console.log(patient)

  return (
    <div className="single-patient-view">
      <Box>
        <Typography align="center" variant="h6">
          Single Patient list
        </Typography>
      </Box>
    </div>
  )
}

export default PatientPage
