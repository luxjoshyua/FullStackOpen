// import { useState } from 'react'
import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material'

import { Diary } from '../../types'

interface Props {
  diaries: Diary[]
}

const DiaryListPage = ({ diaries }: Props) => {
  return (
    <div>
      <Box>
        <Typography align="center" variant="h6">
          Diary entries
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em', color: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Visibility</TableCell>
            <TableCell sx={{ color: 'white' }}>Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: Diary) => (
            <TableRow key={diary.id}>
              <TableCell sx={{ color: 'white' }}>{diary.date}</TableCell>
              <TableCell sx={{ color: 'white' }}>{diary.visibility}</TableCell>
              <TableCell sx={{ color: 'white' }}>{diary.weather}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button> */}
    </div>
  )
}

export default DiaryListPage
